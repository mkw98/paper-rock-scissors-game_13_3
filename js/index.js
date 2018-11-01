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


//ponizej funkcja,ktorej nie udalo mi sie uruchomic,wiec ostatecznie z niej zrezygnowalam, ale nadalnie wiem,dlaczego wlasciwie nie dzialala.

 //function hide() {
//       document.getElementsByClassName("gameButton").style.display = "none";
//    };
//