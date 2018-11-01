'use strict';
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var rock = document.getElementById('rock');
var output = document.getElementById('output');
var result = document.getElementById('result');
var rounds = document.getElementById('rounds');
var yourScore = document.getElementById('yourScore');
var hisScore = document.getElementById('hisScore');
var newGame = document.getElementById('newGame');
var playerScore;
var computerScore;
var computerChoice;
var roundsNumber;
//Dla uporządkowania kodu, stwórz zmienną params zawierającą obiekt. 
//W tym obiekcie przechowuj wszystkie wartości, 
//które obecnie są zapisane w zmiennych globalnych, 
//np. liczbę rozgranych rund, wynik gracza i komputera, 
//liczbę wygranych rund która powoduje wygranie gry, 
//informację, czy gra została zakończona, itp.
//Dla przykładu, jeśli do tej pory zmienna w Twoim kodzie nazywała się roundsPlayed, 
//teraz będzie się nazywać params.roundsPlayed.

var params;
                      
function computerChoiceNumber() {
  var computerChoiceNumber = Math.floor(Math.random() * 3 + 1);
  if (computerChoiceNumber == 1) {
    computerChoice = "papier";
  } else if (computerChoiceNumber == 2) {
    computerChoice = "kamień";
  } else {
    computerChoice = "nożyce";
  }
};


function playerMove(playerChoice) {

  computerChoiceNumber();
  output.innerHTML = 'Wybrałeś '+playerChoice+'. Komputer wybrał '+computerChoice+'.';
  
  if (playerChoice == 'papier' && computerChoice == 'kamień' ||
      playerChoice == 'nożyce' && computerChoice == 'papier' ||
      playerChoice == 'kamień' && computerChoice == 'nożyce'
  ) {
    result.innerHTML = 'WYGRYWASZ';
    playerScore++;
    yourScore.innerHTML = 'Twój wynik: '+playerScore+'';
    roundsNumber--;
     } else if (playerChoice == 'papier' && computerChoice == 'nożyce' ||
      playerChoice == 'nożyce' && computerChoice == 'kamień' ||
      playerChoice == 'kamień' && computerChoice == 'papier') {
    
    result.innerHTML = 'PRZEGRYWASZ';
    computerScore++;
    hisScore.innerHTML = 'Wynik komputera: '+computerScore+'';
    roundsNumber--;
       
  } else {
    result.innerHTML = 'REMIS';  
    roundsNumber--;
  }

  if (roundsNumber == 0) 
    {if (computerScore > playerScore) {
        rounds.innerHTML = 'GAME OVER' +'<br>' + 'KOMPUTER WYGRAŁ';
        buttons.classList.add("hide");
        rounds.classList.add("important");
    } else if (playerScore > computerScore) {
       rounds.innerHTML = 'GAME OVER' + '<br>' + 'KOMPUTER PRZEGRAŁ';
       buttons.classList.add("hide");
       rounds.classList.add("important");
    } else if (playerScore === computerScore) {
      rounds.innerHTML = 'GAME OVER' + '<br>' + 'REMIS';
      buttons.classList.add("hide");
      rounds.classList.add("important");
    }
    } else {
    rounds.innerHTML = 'Liczba rund do końca gry: '+roundsNumber+'';
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
   
  result.innerHTML = " ";
  output.innerHTML = " ";
  yourScore.innerHTML = " Twój wynik: 0.";
  hisScore.innerHTML = " Wynik komputera: 0.";
  playerScore = 0;
  computerScore = 0;
  roundsNumber = window.prompt(
    "Ile rund chcesz rozegrać?");
  if (roundsNumber === null) {
    rounds.innerHTML = 'Kliknięto "anuluj". Rezygnujesz? Jeśli nie, kliknij "Nowa gra", aby ustalić, ile razy chcesz zagrać';
  } else if (isNaN(roundsNumber)) {
    rounds.innerHTML = 'Ile rund chcesz rozegrać? Wpisz tylko cyfry' + '<br><br>';
  } else if (roundsNumber === '') {
    rounds.innerHTML = 'Nic nie wpisano. Ile rund chcesz rozegrać?';
  } else if (roundsNumber < 1) {
    rounds.innerHTML = 'Wpisz liczbę większą od zera.';
  } else {
    rounds.innerHTML = 'Liczba rund: '+roundsNumber+'';
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