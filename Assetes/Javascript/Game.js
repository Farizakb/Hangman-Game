var Words =[
    "youTube",
    "instagram",
    "facebook",
    "whatsapp",
    "twitter",
    "linkedln",
    "telegram",
];


let answer = " ";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;



function randomword(){
    answer = Words[Math.floor(Math.random() * Words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}


function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
  
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }


function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './Assetes/Images/h-m ' + mistakes + '.jpg';
}



function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won! You rescue the Hangman. Congratulations';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    
    document.getElementById('keyboard').innerHTML = 'You Lost! Hangman is died. Go to cry';
  }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
  }
  
  function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = "./Assetes/Images/h-m 0.jpg"

  randomword();
  guessedWord();
  updateMistakes();
  generateButtons();
}



guessedWord()
generateButtons();  
randomword();

