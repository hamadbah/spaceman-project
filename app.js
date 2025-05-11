// List the Gussing words
const words = ["planet", "galaxy", "astronaut", "nebula", "satellite"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctGuesses = [];
let wrongGuesses = 0;
const maxWrong = 6;

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
    updateWordDisplay();
    checkWin();
  } else {
    wrongGuesses++;
    wrongCount.textContent = wrongGuesses;
    checkLose();
  }
}

// Initialize display
updateWordDisplay();