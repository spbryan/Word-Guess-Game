/***************************************
 *  Star Wars Word Guess - Characters
 *  Author: Sean Bryan
 *  Date: 2019-04-06
 ***************************************/

//DOM Variables
let startInstructions = document.getElementById('start-instruct');
let wordField = document.getElementById('word-field');
let letterInput = document.getElementById('letter-input');
let attemptDetail = document.getElementById('attempt-detail');

//Game Variables
let gameStarted = false;

displayElement(wordField, false);
displayElement(letterInput, false);
displayElement(attemptDetail, false);

document.onkeyup = function (event) {
    if (gameStarted) {
        console.log(event.key);
    }
    else {
        playGame();
        console.log("starting");
    }
}

function playGame() {
    gameStarted = true;
    createGameBoard();
    //TODO: 
}

function createGameBoard() {
    displayElement(startInstructions, false);
    displayElement(wordField, true);
    displayElement(letterInput, true);
    displayElement(attemptDetail, true);

    //TODO: Get Word
    //TODO: Set Underscores in word field
}

function displayElement(element, showElement) {
    if (showElement) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}