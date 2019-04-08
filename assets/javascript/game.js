/***************************************
 *  Star Wars Word Guess - Characters
 *  Author: Sean Bryan
 *  Date: 2019-04-06
 ***************************************/

//DOM Variables
let startInstructions = document.getElementById('start-instruct');
let wordJumbotron = document.getElementById('word-jumbotron');
let guessJumbotron = document.getElementById('guess-jumbotron');
let wordField = document.getElementById('word-field');
let input = document.getElementById('input');
let inputCharacter = document.getElementById('input-character');
let incorrectGuess = document.getElementById('incorrect-guess');
let attemptDetail = document.getElementById('attempt-detail');
let playerFail = document.getElementById('player-fail');
let playerWin = document.getElementById('player-win');
var numberOfGuesses = document.getElementById('number-of-guesses');
var numberOfWins = document.getElementById('number-of-wins');
var numberOfLosses = document.getElementById('number-of-losses');

//Game Variables
let gameStarted = false;
var puzzleSolution = [];
var puzzleInput = [];
var incorrectGuesses = [];
var winCtr = 0;
var lossCtr = 0;
var guessCtr = 6;

resetGame();

/**
 * key recorder that either initiates a new game or collects puzzle input
 */
document.onkeyup = function (event) {
    if (gameStarted) {
        var character = event.key.toUpperCase();
        playGame(character);
    }
    else {
        startGame();
        console.log("starting");
    }
}

/**
 * Start the game
 */
function startGame() {
    gameStarted = true;
    displayElement(startInstructions, false);
    displayElement(input, true);
    displayElement(attemptDetail, true);
    displayElement(playerFail, false);
    displayElement(playerWin, false);

    createNewPuzzle();
    displayPuzzle();
    // wordField.innerHTML = puzzleInput.join(" ");
    // displayElement(wordField, true);
    displayElement(wordJumbotron, true);
    displayElement(guessJumbotron, true);
}

/**
 * Basic Game Flow
 * @param character 
 */
function playGame(character) {
    if (isAlphaNumeric(character)) {
        inputCharacter.innerHTML = character;
        if (findCharacterMatch(character)) {
            displayPuzzle();
            // wordField.innerHTML = puzzleInput.join(" ");
            if (isPuzzleSolved()) {
                resetGame();
                displayElement(playerWin, true);
                numberOfWins.innerHTML = ++winCtr;
            }
        }
        else {
            incorrectGuesses.push(character);
            incorrectGuess.innerHTML = incorrectGuesses.join();
            numberOfGuesses.innerHTML = --guessCtr;
        }
        console.log(event.key);
        if (guessCtr === 0) {
            resetGame();
            displayElement(playerFail, true);
            numberOfLosses.innerHTML = ++lossCtr;
        }
    }
}

/**
 * Reset the game
 */
function resetGame() {
    displayElement(wordJumbotron, false);
    displayElement(input, false);
    displayElement(attemptDetail, false);
    displayElement(playerFail, false);
    displayElement(playerWin, false);
    displayElement(guessJumbotron, false);
    gameStarted = false;
    puzzle = [];
    puzzleInput = [];
    incorrectGuesses = [];
    guessCtr = 6;
    incorrectGuess.innerHTML = incorrectGuesses.join();
    inputCharacter.innerHTML = "";
    numberOfGuesses.innerHTML = guessCtr;
}

/**
 * Create a new puzzle
 */
function createNewPuzzle() {
    generateRandomStarWarsCharacter();
    // puzzleSolution = "SKYWALKER".split('');
    for (var i = 0; i < puzzleSolution.length; i++) {
        if (puzzleSolution[i] === "-" || puzzleSolution[i] === " ") {
            puzzleInput.push(puzzleSolution[i]);
        }
        else {
            puzzleInput.push("<u>x</u>");
        }
    }
    console.log(puzzleInput);
}

/**
 * Display the formatted puzzle
 */
function displayPuzzle() {
    // wordField.innerHTML = puzzleInput.join(" ");
    var puzzleDisplay = "Error";
    for(var i = 0; i < puzzleInput.length; i++) {
        if (puzzleInput[i] !== " ") {
            if (i === 0) {
                puzzleDisplay = puzzleInput[i];
            }
            else {
                puzzleDisplay += " ";
                puzzleDisplay += (puzzleInput[i]);
                puzzleDisplay += " ";
                console.log(puzzleDisplay);
            }
        }
        else {
            puzzleDisplay += "<br>";
        }
    }

    wordField.innerHTML = puzzleDisplay;
}

/**
 * Determine if input character matches value of the puzzle solution
 * @param character 
 */
function findCharacterMatch(character) {
    var isFound = false;
    for (var i = 0; i < puzzleSolution.length; i++) {
        if (character === puzzleSolution[i]) {
            puzzleInput[i] = character;
            isFound = true;
        }
    }
    return isFound;
}

/**
 * Iterate each character of the puzzle input.  If they
 * match the puzzle solution then the puzzle is solved
 */
function isPuzzleSolved() {
    for (var i = 0; i < puzzleSolution.length; i++) {
        if (puzzleSolution[i] !== puzzleInput[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Toggles display on and off for elements 
 * @param element 
 * @param showElement 
 */
function displayElement(element, showElement) {
    if (showElement) {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}

/**
 * Determine if input character is alpha-numeric
 * @param character 
 */
function isAlphaNumeric(character) {
    if (!character.match(/^[0-9A-Z]+$/)) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * Call swapi API to get star wars character name
 */
function generateRandomStarWarsCharacter() {
    // var request = new XMLHttpRequest();
    // request.open('GET', 'https://swapi.co/api/people/1/', true);
    // request.onload = function () {
    //     var data = JSON.parse(this.response);
    //     starWarsCharacter = data.name;
    //     console.log("1" + starWarsCharacter);
    // }
    // request.send();

    //30 characters from original trilogy
    var starWarsCharacterList = ["Luke Skywalker", "C-3P0", "R2-D2",
        "Darth Vader", "Leia Organa", "Owen Lars", "Beru Lars", "R5-D4",
        "Biggs Darklighter", "Obi-Wan Kenobi", "Anakin Skywalker", "Wilhuff Tarkin",
        "Chewbacca", "Han Solo", "Greedo", "Jabba Desilijic Tiure", "Wedge Antilles",
        "Jek Tono Porkins", "Yoda", "Palpatine", "Boba Fett", "IG-88", "Bossk",
        "Lando Calrissian", "Lobot", "Ackbar", "Mon Mothma", "Arvel Crynyd",
        "Wicket Systri Warrick", "Nien Nunb"
    ];

    var thisCharacter = starWarsCharacterList[Math.floor(Math.random() * 30)].toUpperCase();
    // var thisCharacter = starWarsCharacterList[0].toUpperCase();
    puzzleSolution = thisCharacter.split('');
}