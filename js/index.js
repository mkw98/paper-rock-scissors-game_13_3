'use strict';

//Dla uporządkowania kodu, stwórz zmienną params zawierającą obiekt. 
//W tym obiekcie przechowuj wszystkie wartości, 
//które obecnie są zapisane w zmiennych globalnych, 
//np. liczbę rozgranych rund, wynik gracza i komputera, 
//liczbę wygranych rund która powoduje wygranie gry, 
//informację, czy gra została zakończona, itp.
//Dla przykładu, jeśli do tej pory zmienna w Twoim kodzie nazywała się roundsPlayed, 
//teraz będzie się nazywać params.roundsPlayed.

var params = {
  paper: document.getElementById('paper'),
  scissors: document.getElementById('scissors'),
  rock: document.getElementById('rock'),
  output: document.getElementById('output'),
  result: document.getElementById('result'),
  rounds: document.getElementById('rounds'),
  yourScore: document.getElementById('yourScore'),
  hisScore: document.getElementById('hisScore'),
  newGame: document.getElementById('newGame'),
  playerScore: 0,
  computerScore: 0,
  computerChoice: 0,
  roundsNumber: 0,
  progress: [],
  
  //playerWins: 0,
  //computerWins: 0,
  //maxRounds: 0,
  //completeRounds: 0,
  
};

//modal
(function(){ 

var showModal = function(event){
event.preventDefault();
document.querySelector('#modal-overlay').classList.add('show');
var modalId = event.target.getAttribute('href'); 

var modals = document.querySelectorAll('.modal');
var overlayId = "#modal-overlay";
for(var i = 0; i < modals.length; i++) {modals[i].classList.remove('show');
}
document.querySelector(modalId).classList.add('show');
document.querySelector(overlayId).classList.add('show');
};
	
	// kod dla wielu linków
	
	var modalLinks = document.querySelectorAll('.show-modal');
	
	for(var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click', showModal);
	}
	
	// Funkcja zamykająca modal, przywiązana do kliknięć na elemencie z klasą "close". 

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	// umożliwienie zamykania modala poprzez kliknięcie w overlay 
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
	// blokada propagacji kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
	
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
	
})(); 
    
function computerChoiceNumber() {
  var computerChoiceNumber = Math.floor(Math.random() * 3 + 1);
  if (computerChoiceNumber == 1) {
    params.computerChoice = "papier";
  } else if (computerChoiceNumber == 2) {
    params.computerChoice = "kamień";
  } else {
    params.computerChoice = "nożyce";
  }
};

function playerMove(playerChoice) {

  computerChoiceNumber();
  params.output.innerHTML = 'Wybrałeś '+playerChoice+'. Komputer wybrał '+params.computerChoice+'.';
  
  if (playerChoice == 'papier' && params.computerChoice == 'kamień' ||
      playerChoice == 'nożyce' && params.computerChoice == 'papier' ||
      playerChoice == 'kamień' && params.computerChoice == 'nożyce'
  ) {
    params.result.innerHTML = 'WYGRYWASZ';
    params.playerScore++;
    params.yourScore.innerHTML = 'Twój wynik: '+params.playerScore+'';
    params.roundsNumber--;
     } else if (playerChoice == 'papier' && params.computerChoice == 'nożyce' ||
      playerChoice == 'nożyce' && params.computerChoice == 'kamień' ||
      playerChoice == 'kamień' && params.computerChoice == 'papier') {
    
    params.result.innerHTML = 'PRZEGRYWASZ';
    params.computerScore++;
    params.hisScore.innerHTML = 'Wynik komputera: '+params.computerScore+'';
    params.roundsNumber--;
       
  } else {
    params.result.innerHTML = 'REMIS';  
    params.roundsNumber--;
  }

  if (params.roundsNumber == 0) 
    {if (params.computerScore > params.playerScore) {
        params.rounds.innerHTML = 'GAME OVER' +'<br>' + 'KOMPUTER WYGRAŁ';
        buttons.classList.add("hide");
        rounds.classList.add("important");
	document.querySelector("#modal-two").classList.add('show');
	document.querySelector("#modal-overlay").classList.add('show');
	    
    } else if (params.playerScore > params.computerScore) {
       params.rounds.innerHTML = 'GAME OVER' + '<br>' + 'KOMPUTER PRZEGRAŁ';
       buttons.classList.add("hide");
       rounds.classList.add("important");
       document.querySelector("#modal-three").classList.add('show');
       document.querySelector("#modal-overlay").classList.add('show');
	    
    } else if (params.playerScore === params.computerScore) {
      params.rounds.innerHTML = 'GAME OVER' + '<br>' + 'REMIS';
      buttons.classList.add("hide");
      rounds.classList.add("important");
      document.querySelector("#modal-one").classList.add('show');
      document.querySelector("#modal-overlay").classList.add('show');
    }
    } else {
    params.rounds.innerHTML = 'Liczba rund do końca gry: '+params.roundsNumber+'';
    };
    };

// zamiast osobnego przywiązania funkcji do każdego z guzików, 
//stwórz pętlę przechodzącą przez wszystkie elementy z klasą player-move.
//W pętli niech dla każdego guzika będzie przywiązana funkcja, 
//która wywołuje funkcję playerMove z odpowiednim argumentem. 
//Tym argumentem będzie wartość atrybutu data-move, pobranego za pomocą getAttribute.

paper.addEventListener('click', function() {
    playerMove('papier');
});

rock.addEventListener('click', function() {
  playerMove('kamień');
});

scissors.addEventListener('click', function() {
  playerMove('nożyce');
});


newGame.addEventListener("click", function() {
   
  params.result.innerHTML = " ";
  params.output.innerHTML = " ";
  params.yourScore.innerHTML = " Twój wynik: 0.";
  params.hisScore.innerHTML = " Wynik komputera: 0.";
  params.playerScore = 0;
  params.computerScore = 0;
  params.roundsNumber = window.prompt(
    "Ile rund chcesz rozegrać?");
  if (params.roundsNumber === null) {
    params.rounds.innerHTML = 'Kliknięto "anuluj". Rezygnujesz? Jeśli nie, kliknij "Nowa gra", aby ustalić, ile razy chcesz zagrać';
  } else if (isNaN(params.roundsNumber)) {
    params.rounds.innerHTML = 'Ile rund chcesz rozegrać? Wpisz tylko cyfry' + '<br><br>';
  } else if (params.roundsNumber === '') {
    rounds.innerHTML = 'Nic nie wpisano. Ile rund chcesz rozegrać?';
  } else if (params.roundsNumber < 1) {
    params.rounds.innerHTML = 'Wpisz liczbę większą od zera.';
  } else {
    params.rounds.innerHTML = 'Liczba rund: '+params.roundsNumber+'';
    buttons.classList.remove("hide");
    rounds.classList.remove("important");
  };
  }
  );


/*Etap 4 — modal z wynikiem gry
Czas na dodanie do Twojej gry pierwszego modala (tak, będzie ich więcej). Do tej pory po osiągnięciu przez gracza lub komputer zadanej liczby wygranych rund, gra kończyła się wyświetleniem na stronie komunikatu, który informował kto wygrał całą rozgrywkę.

Teraz chcemy, aby ten komunikat wyświetlał się w modalu. W tym celu dodaj do strony modal, podobnie jak w zadaniu dot. modala z tego modułu. Możesz użyć tego samego kodu JS, ponieważ będzie kilka różnych modali.

Po zakończeniu gry ten sam komunikat, który wcześniej był wyświetlany na stronie, ma teraz być wstawiany do modala, a modal ma zostać pokazany.

Etap 5 — tabela przebiegu gry
W modalu z wynikiem gry chcemy - oprócz komunikatu - wyświetlać tabelę z przebiegiem gry. Będzie to prosta tabelka z kolumnami:

numer rundy,
ruch gracza,
ruch komputera,
wynik rundy,
wynik gry po tej rundzie (np. "0-1" jeśli to pierwsza runda i wygrał komputer).
//W tym celu w obiekcie params dodaj pustą tablicę progress. 
W funkcji playerMove, która jest uruchamiana po każdym ruchu gracza, wstawiaj do tablicy params.progress nowy obiekt zawierający wszystkie dane niezbędne do późniejszego wypełnienia tabeli.

Po zakończeniu gry, na podstawie obiektów w tablicy params.progress wygeneruj tabelę i wstaw ją do modala razem z komunikatem o zwycięzcy gry.

Etap 6* — dla chętnych - modal nowej gry
Ostatni etap jest "z gwiazdką", ponieważ wymaga poszukania dodatkowych informacji w internecie.

Twoim zadaniem w tym etapie jest zmienić działanie guzika "New game". Obecnie wyświetla on prompt pytający o liczbę wygranych rund, która ma oznaczać wygraną grę.

Stwórz nowy modal, który ma być otwierany po kliknięciu guzika "New game" zamiast prompta. W tym modalu chcemy mieć:

pole tekstowe (<input type="text">) na imię gracza,
pole tekstowe (<input type="number">) na ilość wygranych rund, która oznacza wygranie gry,
guzik "Start".
Tylko po kliknięciu guzika "Start" ma rozpocząć się nowa gra. Wykorzystaj limit wygranych rund tak jak do tej pory, a dodatkowo użyj imienia gracza na swojej stronie (np. jeśli imię to John, to zamiast "You played ROCK" ma być "John played ROCK").

Do wykonania tego etapu musisz:

znaleźć w internecie informację, w jaki sposób pobierać wartość z pola tekstowego,
dodać osobną funkcję wykonywaną po kliknięciu guzika "Start".

*/
