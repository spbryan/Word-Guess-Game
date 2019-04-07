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
let inputLetter = document.getElementById('input-letter');
let badLetter = document.getElementById('bad-letter');
let attemptDetail = document.getElementById('attempt-detail');

//Game Variables
let gameStarted = false;
var characterName = [];
var hiddenName = [];
var incorrectLetters = [];

// displayElement(wordField, false);
displayElement(wordJumbotron, false);
displayElement(input, false);
displayElement(attemptDetail, false);

document.onkeyup = function (event) {
    if (gameStarted) {
        var letter = event.key.toUpperCase();
        inputLetter.innerHTML = letter;
        if (findLetterMatch(letter)) {
            wordField.innerHTML = hiddenName.join(" ");
        }
        else {
            incorrectLetters.push(letter);
            badLetter.innerHTML = incorrectLetters.join();
        }
        console.log(event.key);
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

function getCharacterName() {
    //TODO: Either use array or call API
    characterName = "SKYWALKER".split('');
    for (var i = 0; i < characterName.length; i++)
    {
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