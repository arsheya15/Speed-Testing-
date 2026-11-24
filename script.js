
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const inputText = document.getElementById("inputText");
const sampleText = document.getElementById("sampleText");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const result = document.getElementById("result");

// Variables
let timeLeft = 60;
let timer;
let started = false;

// Start Test
startBtn.addEventListener("click", function() {

    if (started) return;

    started = true;
    inputText.disabled = false;
    inputText.value = "";
    inputText.focus();

    result.textContent = "Good luck! Keep typing ♡";

    timer = setInterval(function() {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        calculateResults();

        if (timeLeft <= 0) {
            endTest();
        }

    }, 1000);

});

// Typing Event
inputText.addEventListener("input", function() {

    calculateResults();

    if (inputText.value.length >= sampleText.textContent.trim().length) {
        endTest();
    }

});

// Calculate Results
function calculateResults() {

    const typed = inputText.value;
    const original = sampleText.textContent.trim();

    let correct = 0;
    let mistakes = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === original[i]) {
            correct++;
        } else {
            mistakes++;
        }

    }

    const timeUsed = 60 - timeLeft;
    const minutes = timeUsed / 60;

    const wpm = minutes > 0
        ? Math.round((correct / 5) / minutes)
        : 0;

    const accuracy = typed.length > 0
        ? Math.round((correct / typed.length) * 100)
        : 100;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy + "%";

}

// End Test
function endTest() {

    clearInterval(timer);

    started = false;
    inputText.disabled = true;

    calculateResults();

    result.innerHTML =
        "♡ Test Completed! ♡<br>" +
        "Typing Speed: " + wpmDisplay.textContent + " WPM<br>" +
        "Accuracy: " + accuracyDisplay.textContent;

}

// Restart Test
restartBtn.addEventListener("click", function() {

    clearInterval(timer);

    timeLeft = 60;
    started = false;

    timerDisplay.textContent = "60";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    inputText.value = "";
    inputText.disabled = true;

    result.textContent = "";

});