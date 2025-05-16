# 🌌 Spacemen Word Guess Game

Hi! This is a fun word guessing game I made called **Spacemen**. The goal is to guess the word before you run out of tries!

![Banner](images/ga-banner.png)
---

## 🎮 How It Works

- The game will choose a random word related to space.
- You need to guess the word by click on the letters.
- If you guess wrong letter, it counts as a mistake. You only get 6 chances!
- If you guess all the letters before hitting 6 wrong guesses, you win!
- There's a **Reset Game** button if you want to play again.

---

## 📁 Files in This Project

Here’s what’s included:

*   index.html
*   app.js
*   css/
    *   style.css
*   images/
    *   ga-banner.png
*   README.md


---

## How to Use It

1. Download or clone the project.
2. Open the `index.html` file in your browser.
3. Play the game by clicking on letters to guess!

---

## Methods Used in This Project

- HTML
- CSS
- JavaScript

---

## index.html file

```javascript 
 <!DOCTYPE html> <html lang="en"> 
 <head> <meta charset="UTF-8" /> 
 <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Spacemen Word Guess Game</title> 
 <script src="app.js" defer></script> 
 <link rel="stylesheet" href="./css/style.css" /> 
 </head> <body> <img src="images/ga-banner.png" alt="Spacemen Banner" class="banner-image" /> 
 <h1>Spacemen ... Guess Game</h1> 
 <p class="intro-text">Guess the word that related to space!</p> 
 <div id="word"></div> 
 <div class="wrong-guesses"> 
 <p>Wrong Guesses: 
 <span id="wrong-count">0</span> / 6</p> 
 </div> 
 <div id="letters"></div> 
 <p id="message"></p> 
 <button id="reset-button">Reset Game</button> 
 </body> 
 </html> 
 ```

## Javascript - Game Logic

## 🛠️ Code Overview

### JavaScript (Game Logic)

_**Guessing Words and Game Variables**_

```javascript
const words = ["planet", "galaxy", "astronaut", "nebula", "satellite"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctGuesses = [];
let wrongGuesses = 0;
const maxWrong = 6;
```
_**Define Sound Efect**_

```javascript
const winnerSound = new Audio('sounds/winner.mp3');
const loserSound = new Audio('sounds/bad-luck.mp3');
```
_**Define DOM Elements**_

```javascript
// DOM Elements
const wordDisplay = document.getElementById("word");
const lettersDiv = document.getElementById("letters");
const wrongCount = document.getElementById("wrong-count");
const message = document.getElementById("message");
document.getElementById("reset-button").addEventListener("click", resetGame);
```
_**Display Alphabet Buttons**_

```javascript
const alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet.split("").forEach(letter => {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.onclick = () => handleGuess(letter, btn);
  lettersDiv.appendChild(btn);
});
```
_**Reset The Game**_

```javascript
function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  wrongGuesses = 0;
  wrongCount.textContent = wrongGuesses;
  message.textContent = "";
  winnerSound.pause();
  loserSound.pause();
  document.querySelectorAll("#letters button").forEach(btn => btn.disabled = false);
  updateWordDisplay();
}
```

_**Display Word**_

```javascript
function updateWordDisplay() {
  const display = selectedWord.split("").map(letter =>
    correctGuesses.includes(letter) ? letter : "_"
  ).join(" ");
  wordDisplay.textContent = display;
}
```

_**Handle Guess**_

```javascript
function handleGuess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    correctGuesses.push(letter);
    updateWordDisplay();
    checkWin();
  } else {
    wrongGuesses++;
    wrongCount.textContent = wrongGuesses;
    checkLose();
  }
}
```
_**Winning Condition**_

```javascript
function checkWin() {
  const wordComplete = selectedWord.split("").every(letter => correctGuesses.includes(letter));
  if (wordComplete) {
    message.textContent = "Congratulation! You did it.";
    winnerSound.play();
    disableAllButtons();
  }
}
```
_**Losing Condition**_

```javascript
function checkLose() {
  if (wrongGuesses >= maxWrong) {
    message.textContent = `Game Over - You lost! The word was --- ${selectedWord}`;
    loserSound.play();
    disableAllButtons();
  }
}
```

_**Disable Buttons**_

```javascript
function disableAllButtons() {
  document.querySelectorAll("#letters button").forEach(btn => btn.disabled = true);
}
```

_**Start the Game**_

`updateWordDisplay();`


## 📸 Screenshot

> (You can add a screenshot here if you want to show what the game looks like.)

---

Hope you enjoy playing it! 🚀
