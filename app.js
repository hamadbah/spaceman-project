// List the Gussing words
const words = ["planet", "galaxy", "astronaut", "nebula", "satellite"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctGuesses = [];
let wrongGuesses = 0;
const maxWrong = 6;
// Define Sound Effect
const winnerSound = new Audio('sounds/winner.mp3');
const loserSound = new Audio('sounds/bad-luck.mp3');

// DOM elements
const wordDisplay = document.getElementById("word");
const lettersDiv = document.getElementById("letters");
const wrongCount = document.getElementById("wrong-count");
const message = document.getElementById("message");
document.getElementById("reset-button").addEventListener("click", resetGame);

// Display Letters on the buttons
const alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet.split("").forEach(letter => {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.onclick = () => handleGuess(letter, btn);
  lettersDiv.appendChild(btn);
});

// Reset The Game Button
function resetGame() {
  // Reset game state
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = [];
  wrongGuesses = 0;
  wrongCount.textContent = wrongGuesses;
  message.textContent = "";
  winnerSound.pause();
  loserSound.pause();

  // Enable and reset all letter buttons
  const buttons = document.querySelectorAll("#letters button");
  buttons.forEach(btn => {
    btn.disabled = false;
  });

  // Update the word display
  updateWordDisplay();
}

// Update the displayed word
function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map(letter => (correctGuesses.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;
}

// Handle a guess
function handleGuess(letter, button) {
  button.disabled = true;

  if (selectedWord.includes(letter)) {
    correctGuesses.push(letter);
    //  Get the letter selected
    updateWordDisplay();
    checkWin(); // To Check if winning
  } else {
    wrongGuesses++;
    wrongCount.textContent = wrongGuesses;
    checkLose(); // To Check if Losing
  }
}

// Check for winning condition
function checkWin() {
  // Check if all the Guessed Letter available and equal to the choosen word letters if it is returning true then it's a winning condition.
  const wordComplete = selectedWord.split("").every(letter => correctGuesses.includes(letter)); 
  if (wordComplete) {
    message.textContent = "Congratulation! You did it.";
    winnerSound.play();
    disableAllButtons();
  }
}

// Check for losing condition
function checkLose() {
  // This condition check the wrongGuesses is more the maxWrong allowed then marked as losing condition
  if (wrongGuesses >= maxWrong) {
    message.textContent = `Game Over - You lost! The word was --- ${selectedWord}`;
    loserSound.play();
    disableAllButtons();
  }
}

// Disable all letter buttons
function disableAllButtons() {
  const buttons = document.querySelectorAll("#letters button"); // Get all the buttons that used for the game as letters.
  buttons.forEach(btn => btn.disabled = true); // Arrow Function to Disable all the buttons
}

// Initialize display
updateWordDisplay();