let rnadomNumber = (parseInt(Math.random() *100 + 1));

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p')

let prevGuest = [];
let numGuess = 1;

let playGame = true;

if(playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    // guess if its a valid number
    if(isNaN(guess)) {
        alert('Please enter a valid number')
    } else if(guess < 1) {
        alert('Please enter a number more than 1')
    } else if (guess > 100) {
        alert('Please enter a number less than 100')
    } else {
        prevGuest.push(guess)
        if(numGuess === 11){
            displayGuess(guess)
            displayMessage(`GAME OVER. Random was ${rnadomNumber}`)
            endGame()
        } else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    // print messgage if its correct or not
    if (guess === rnadomNumber) {
        displayMessage(`You guessed it right`)
        endGame()
    } else if (guess < rnadomNumber){
        displayMessage(`Number is TOO low`)
    } else if(guess > rnadomNumber) {
        displayMessage(`Number is TOO high`)
    }
}

function displayGuess(guess) {
    // clean the message, update the remaining and previous guess
    userInput.value = ""
    guessSlot.innerHTML += `${guess},   `
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`
}

function displayMessage(message) {
    // display the message and down the remainng guess 
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame() {
    // end the game
    userInput.value = ''
    userInput.setAttribute("disabled", "")
    p.classList.add("button")
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame() {
    // start a new game
   const newGameButton =  document.querySelector('#newGame')
   newGameButton.addEventListener('click', function(e){
    rnadomNumber = parseInt(Math.random() * 100 + 1);
    prevGuest = []   
    numGuess = 1
    guessSlot.innerHTML = ''
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('diabled')
    startOver.removeChild(p)

    playGame = true
   })
}
