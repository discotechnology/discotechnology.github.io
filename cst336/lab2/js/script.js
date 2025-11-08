//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

document.querySelector("#guessBtn").addEventListener("click", checkGuess);

initializeGame();

function initializeGame() {
    document.querySelector("#feedback").hidden = true;
    document.querySelector("#previousGuesses").textContent = "Guesses so far: ";

    document.querySelector("#wins").textContent = `Wins: ${wins}`;
    document.querySelector("#losses").textContent = `Losses: ${losses}`;

    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    document.querySelector("#guessBtn").hidden = false;

    attempts = 0;
    document.querySelector("#remainingGuesses").textContent = `Attempts remaining: ${7 - attempts}`;
    document.querySelector("#remainingGuesses").hidden = false;

    //hiding the Reset button
    document.querySelector("#resetBtn").hidden = true;

    //adding focus to textbox
    document.querySelector("#playerGuess").value = "";
    document.querySelector("#playerGuess").focus();
}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    let feedback = document.querySelector("#feedback");
    feedback.hidden = true;
    console.log(`Player guessed: ${guess}`);
    document.querySelector("#playerGuess").value = "";
    document.querySelector("#playerGuess").focus();
    if (guess < 1 || guess > 100 || isNaN(guess)) {
        feedback.hidden = false;
        feedback.textContent = "Please enter a valid number between 1 and 100.";
        feedback.style.color = "red";
        return;
    }
    document.querySelector("#previousGuesses").textContent += guess + "   ";
    attempts++;
    document.querySelector("#remainingGuesses").textContent = `Attempts remaining: ${7 - attempts}`;
    if (guess < randomNumber) {
        feedback.hidden = false;
        feedback.innerText = "Guess was low.";
        feedback.style.color = "lightblue";
    }
    else if (guess > randomNumber) {
        feedback.hidden = false;
        feedback.textContent = "Guess was high.";
        feedback.style.color = "lightblue";
    }
    
    if (guess == randomNumber) {
        feedback.hidden = false;
        feedback.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
        feedback.style.color = "green";
        wins++;
        document.querySelector("#wins").textContent = `Wins: ${wins}`;
        gameOver();
    }
    else if (attempts >= 7) {
        feedback.hidden = false;
        feedback.textContent = `Game Over! The correct number was ${randomNumber}.`;
        feedback.style.color = "red";
        losses++;
        document.querySelector("#losses").textContent = `Losses: ${losses}`;
        gameOver();
    }

    function gameOver() {
        document.querySelector("#remainingGuesses").hidden = true;
        document.querySelector("#guessBtn").hidden = true;
        document.querySelector("#resetBtn").hidden = false;
        document.querySelector("#resetBtn").addEventListener("click", initializeGame);
    }
}
