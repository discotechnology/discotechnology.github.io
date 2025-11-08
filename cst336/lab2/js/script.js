//Global variables
let randomNumber;
let attempts = 0;

document.querySelector("#guessBtn").addEventListener("click", checkGuess);

initializeGame();

function initializeGame() {
    document.querySelector("#feedback").hidden = true;
    document.querySelector("#previousGuesses").textContent = "";

    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    document.querySelector("#guessBtn").disabled = false;
    attempts = 0;

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
    if (guess < 1 || guess > 100 || isNaN(guess)) {
        feedback.hidden = false;
        feedback.innerText = "Please enter a valid number between 1 and 100.";
        feedback.style.color = "red";
        return;
    }
    document.querySelector("#previousGuesses").textContent += guess + " ";
    attempts++;
    if (guess < randomNumber) {
        feedback.hidden = false;
        feedback.innerText = "Guess was low.";
        feedback.style.color = "blue";
    }
    else if (guess > randomNumber) {
        feedback.hidden = false;
        feedback.innerText = "Guess was high.";
        feedback.style.color = "blue";
    }
    
    if (guess == randomNumber) {
        feedback.hidden = false;
        feedback.innerText = `Congratulations! You guessed the number in ${attempts} attempts.`;
        feedback.style.color = "green";
        gameOver();
    }
    else if (attempts >= 7) {
        feedback.hidden = false;
        feedback.innerText = `Game Over! The correct number was ${randomNumber}.`;
        feedback.style.color = "red";
        gameOver();
    }

    function gameOver() {
        document.querySelector("#guessBtn").disabled = true;
        document.querySelector("#resetBtn").hidden = false;
        document.querySelector("#resetBtn").addEventListener("click", initializeGame);
    }
}
