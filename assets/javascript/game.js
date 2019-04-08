/***************************************
 *  Star Wars Word Guess - Characters
 *  Author: Sean Bryan
 *  Date: 2019-04-06
 ***************************************/

//DOM Variables
let startInstructions = document.getElementById('start-instruct');
let wordJumbotron = document.getElementById('word-jumbotron');
let wordField = document.getElementById('word-field');
let input = document.getElementById('input');
let inputCharacter = document.getElementById('input-character');
let incorrectGuess = document.getElementById('incorrect-guess');
let attemptDetail = document.getElementById('attempt-detail');
var numberOfGuesses = document.getElementById('number-of-guesses');
let youFail = document.getElementById('you-fail');
let youWin = document.getElementById('you-win');

//Game Variables
let gameStarted = false;
var characterName = [];
var hiddenName = [];
var incorrectGuesses = [];
var wins = 0;
var losses = 0;
var guessCtr = 5;

gameReset();

document.onkeyup = function (event) {
    if (gameStarted) {
        var letter = event.key.toUpperCase();
        inputCharacter.innerHTML = letter;
        if (findLetterMatch(letter)) {
            wordField.innerHTML = hiddenName.join(" ");
        }
        else {
            incorrectGuesses.push(letter);
            incorrectGuess.innerHTML = incorrectGuesses.join();
            numberOfGuesses.innerHTML = parseInt(guessCtr--);
        }
        console.log(event.key);
        if (guessCtr === 0) {
            gameReset();
            displayElement(youFail, true);
        }
    }
    else {
        startGame();
        console.log("starting");
    }
}

function startGame() {
    gameStarted = true;
    displayElement(startInstructions, false);
    displayElement(input, true);
    displayElement(attemptDetail, true);

    getCharacterName();
    wordField.innerHTML = hiddenName.join(" ");
    // displayElement(wordField, true);
    displayElement(wordJumbotron, true);
}

function gameReset() {
    displayElement(wordJumbotron, false);
    displayElement(input, false);
    displayElement(attemptDetail, false);
    displayElement(youFail, false);
    displayElement(youWin, false);
    gameStarted = false;
    characterName = [];
    hiddenName = [];
    incorrectGuesses = [];
    guessCtr = 6;
}

function getCharacterName() {
    //TODO: Either use array or call API
    characterName = "SKYWALKER".split('');
    for (var i = 0; i < characterName.length; i++) {
        // hiddenName.push("<u>" + characterName[i] + "</u>");
        hiddenName.push(" <u>x</u> ");
    }
    console.log("Size of Array: " + hiddenName.length)
}

function findLetterMatch(letter) {
    var isLetterFound = false;
    for (var i = 0; i < characterName.length; i++) {
        if (letter === characterName[i]) {
            hiddenName[i] = letter;
            isLetterFound = true;
        }
    }
    return isLetterFound;
}

function displayElement(element, showElement) {
    if (showElement) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}