let countdown = 5; // Initial countdown value
let countdownInterval; // Interval ID for countdown

function startCountdown() {
  countdownInterval = setInterval(function () {
    countdown--; // Decrement countdown
    document.getElementById("timer").textContent = countdown; // Update countdown display
  }, 1000); // Update countdown every second
}

// Show the modal and start the countdown
$("#giveUpModal").on("show.bs.modal", function () {
  startCountdown();
});
$("#giveUpModal").on("hide.bs.modal", function (e) {
  if (countdown > 0) {
    e.preventDefault();
  }
});
// Clear the countdown interval when the modal is closed
$("#giveUpModal").on("hidden.bs.modal", function () {
  clearInterval(countdownInterval);
  countdown = 5; // Reset countdown value for next time
  document.getElementById("timer").textContent = countdown; // Reset countdown display
});

document.getElementById("backButton").addEventListener("click", function () {
  // Redirect to index.html
  setTimeout(function () {
    // Redirect to index.html
    window.location.href = "index.html";
  }, 1000);
});
document
  .getElementById("settingsButton")
  .addEventListener("click", function () {
    // Show the modal
    $("#infoModal").modal("show");
  });
document
  .getElementById("settingsButton")
  .addEventListener("click", function () {
    const clickSound = document.getElementById("click");
    clickSound.play();
  });

document.getElementById("giveUpButton").addEventListener("click", function () {
  const clickSound = document.getElementById("click");
  clickSound.play();
});
document
  .getElementById("nextGuessButton")
  .addEventListener("click", function () {
    const clickSound = document.getElementById("click");
    clickSound.play();
  });
document.getElementById("secretButton").addEventListener("click", function () {
  const clickSound = document.getElementById("click");
  clickSound.play();
});
document.getElementById("backButton").addEventListener("click", function () {
  const clickSound = document.getElementById("click");
  clickSound.play();
});

let minNumber, maxNumber;
let remainingGuesses = 3; // Default to 3 chances for easy
let score = 0;
let guessedCorrectly = false;
let initialRemainingGuesses;
document.getElementById("guessField").disabled = true;
function setDifficulty() {
  const difficulty = document.getElementById("difficulty").value;
  switch (difficulty) {
    case "easy":
      minNumber = 1;
      maxNumber = 20;
      remainingGuesses = 5;
      guessField.disabled = false;
      break;
    case "medium":
      minNumber = 1;
      maxNumber = 50;
      remainingGuesses = 5;
      guessField.disabled = false;
      break;
    case "hard":
      minNumber = 1;
      maxNumber = 100;
      remainingGuesses = 5;
      guessField.disabled = false;
      break;
    default:
      minNumber = 1;
      maxNumber = 100;
      remainingGuesses = 0;
      break;
  }
  document.getElementById("remainingGuesses").textContent = remainingGuesses; // Update remaining guesses display
  initialRemainingGuesses = remainingGuesses;
  resetGame();

  // Disable the select element after a difficulty has been selected
  document.getElementById("difficulty").addEventListener("change", function () {
    // Once a difficulty is selected, mute the select element
    document.getElementById("difficulty").disabled = true;
    setDifficulty();
  });
}

// Reset the game when difficulty changes
function resetGame() {
  randomNumber =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  console.log(randomNumber);
  guessField.value = "";

  message.textContent = "";
  message.style.color = "";
  document.getElementById("score").textContent = score;
  guessedCorrectly = false;
  document.getElementById("nextGuessButton").style.display = "none";

  // Show all buttons except the "Start Again" button
  document.getElementById("submitGuessButton").style.display = "inline-block";
  document.getElementById("giveUpButton").style.display = "inline-block";
  document.getElementById("secretButton").style.display = "inline-block";
  document.getElementById("startAgainButton").style.display = "none";

  message.style.display = "none";
  document.getElementById("difficulty").addEventListener("change", function () {
    // Once a difficulty is selected, mute the select element
    document.getElementById("difficulty").disabled = false;
    setDifficulty();
  });
}

let randomNumber;
const guessField = document.getElementById("guessField");
const message = document.getElementById("message");
const congratsMessage = document.getElementById("congratulation");

const backgroundMusic = document.getElementById("backgroundMusic");
const highlowMusic = document.getElementById("higlowhMusic");
const wonMusic = document.getElementById("wonMusic");
let originalBackgroundVolume = (backgroundMusic.volume = 0.159);
const congratulations = document.getElementById("congratulations");
const crowdcheer = document.getElementById("crowdcheer");
const empty = document.getElementById("empty");

function lowerBackgroundVolume() {
  backgroundMusic.volume = 0.1; // Lower the volume to 20%
}

function resetBackgroundVolume() {
  backgroundMusic.volume = originalBackgroundVolume; // Reset volume to original
}

highlowMusic.addEventListener("play", lowerBackgroundVolume);
highlowMusic.addEventListener("ended", resetBackgroundVolume);
wonMusic.addEventListener("play", lowerBackgroundVolume);
wonMusic.addEventListener("ended", resetBackgroundVolume);
congratulations.addEventListener("play", lowerBackgroundVolume);
congratulations.addEventListener("ended", resetBackgroundVolume);
crowdcheer.addEventListener("play", lowerBackgroundVolume);
crowdcheer.addEventListener("ended", resetBackgroundVolume);
empty.addEventListener("play", lowerBackgroundVolume);
empty.addEventListener("ended", resetBackgroundVolume);

function checkGuess() {
  const userGuess = parseInt(guessField.value);

  // Check if the input field is empty or the input is not a number
  if (isNaN(userGuess) || userGuess === "") {
    message.style.display = "block";
    message.textContent = "Please enter a valid number.";
    message.style.color = "red";
    empty.play();
    return; // Exit the function early if the input is invalid
  }

  if (userGuess === randomNumber) {
    message.style.display = "block";
    message.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
    message.style.color = "green";
    guessField.disabled = true;
    score++;
    document.getElementById("score").textContent = score;
    wonMusic.play();

    // Hide buttons
    document.getElementById("submitGuessButton").style.display = "none";
    document.getElementById("giveUpButton").style.display = "none";
    document.getElementById("secretButton").style.display = "none";

    // Show "Next Guess" button
    document.getElementById("nextGuessButton").style.display = "inline-block";

    if (score === 5) {
      congratsMessage.style.display = "block";
      document.getElementById("startAgainButton").style.display =
        "inline-block";
      document.getElementById("nextGuessButton").style.display = "none";
      document.getElementById("selectdif").style.display = "inline-block";

      congratulations.play();
      crowdcheer.play();
    }
  } else if (userGuess < randomNumber) {
    highlowMusic.play();
    message.style.display = "block";
    message.textContent = "Too low! Try a higher number.";
    message.style.color = "blue";
    decrementRemainingGuesses();
  } else {
    highlowMusic.play();
    message.style.display = "block";
    message.textContent = "Too high! Try a lower number.";
    message.style.color = "red";
    decrementRemainingGuesses();
  }
}

function decrementRemainingGuesses() {
  if (remainingGuesses > 0) {
    remainingGuesses--;
  }
  if (remainingGuesses === 0) {
    message.style.display = "block";
    message.textContent = `You've used all your guesses! The number was ${randomNumber}. Game over!`;
    message.style.color = "red";
    guessField.disabled = true;
    document.getElementById("submitGuessButton").style.display = "none";
    document.getElementById("giveUpButton").style.display = "none";
    document.getElementById("secretButton").style.display = "none";
    document.getElementById("startAgainButton").style.display = "inline-block";
    score = 0; // Reset score only when the game is over
  } else {
    message.style.display = "block";

    // Do not reset the score here
  }
  document.getElementById("score").textContent = score;
  document.getElementById("remainingGuesses").textContent = remainingGuesses; // Update remaining guesses display
  guessedCorrectly = false;
  document.getElementById("nextGuessButton").style.display = "none";
}

function giveUp() {
  // Show the give up message in the modal
  const randomNumber =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  const giveUpMessage = `The number was ${randomNumber}. Better luck next time!`;
  document.getElementById("giveUpMessage").textContent = giveUpMessage;
  $("#giveUpModal").modal("show");
  message.style.display = "none";
  congratsMessage.style.display = "none";
  empty.play();
  guessField.disabled = true;

  // Set the score to 0
  score = 0;
  remainingGuesses = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("remainingGuesses").textContent = remainingGuesses;
  document.getElementById("difficulty").disabled = false;
  setDifficulty();
  resetGame();
  setTimeout(function () {
    // Redirect to index.html
    window.location.href = "indexgamedash.html";
  }, 5000);
}

function restartGame() {
  resetGame();
}

function startAgain() {
  setDifficulty(); // Reset the game difficulty
  remainingGuesses = initialRemainingGuesses; // Reset remaining guesses
  message.style.display = "none";
  congratsMessage.style.display = "none";
  document.getElementById("difficulty").disabled = true;
  document.getElementById("selectdif").style.display = "none";
  score = 0;
  remainingGuesses = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("remainingGuesses").textContent = remainingGuesses;
  resetGame();
  setDifficulty();
  const clickSound = document.getElementById("click");
  clickSound.play();
  document.getElementById("crowdcheer").pause();
  document.getElementById("crowdcheer").currentTime = 0;
}
function selectdif() {
  const clickSound = document.getElementById("click");
  clickSound.play();
  document.getElementById("crowdcheer").pause();
  document.getElementById("crowdcheer").currentTime = 0;
  setDifficulty(); // Reset the game difficulty
  remainingGuesses = initialRemainingGuesses; // Reset remaining guesses
  guessField.disabled = true;
  difficulty.disabled = false;
  document.getElementById("selectdif").style.display = "none";
  document.getElementById("message").style.display = "none";
  // document.getElementById("congratsMessage").style.display = "none";
  document.getElementById("congratulation").style.display = "none";
  resetGame();
  score = 0;
  remainingGuesses = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("remainingGuesses").textContent = remainingGuesses;
  setTimeout(function () {
    // Redirect to index.html
    window.location.href = "indexgamedash.html";
  }, 900);
}

function nextGuess() {
  guessField.disabled = false;
  resetGame();
}

function revealSecret() {
  alert(`The secret number is ${randomNumber}`);
}

// Set default difficulty
setDifficulty();

// Add event listener to difficulty select
document.getElementById("difficulty").addEventListener("change", setDifficulty);
