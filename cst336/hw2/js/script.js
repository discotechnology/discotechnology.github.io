let correctPoints = 10;
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();

document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz(){
    console.log("Grading quiz…");
    document.querySelector("#validationFeedback").textContent = "";
    if (!isFormValid()) {
        return;
    }

    // Answers
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector('input[name="q4"]:checked').value;

    // Question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }


    // Question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }

    // Question 3
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }

    // Question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }

    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);

}

function isFormValid() {
    let isValid = true;
    if (document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFeedback").textContent = "Answer Q1. ";
    }
    if (document.querySelector("#q2").value == "") {
        isValid = false;
        document.querySelector("#validationFeedback").textContent += "Answer Q2. ";
    }
    if (document.querySelector('input[name="q4"]:checked') == null) {
        isValid = false;
        document.querySelector("#validationFeedback").textContent += "Answer Q3. ";
    }
    return isValid;
}

function displayQ4Choices() {
    let choices = ["Maine", "Delaware", "Rhode Island", "Maryland"];
    choices = _.shuffle(choices);
    for (let i = 0; i < choices.length; i++) {
        document.querySelector("#q4Choices").innerHTML +=
            `<input type="radio" name="q4" value="${choices[i]}"> <label for="${choices[i]}"> ${choices[i]}</label> `;
    }
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).textContent = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Correct'>";
    score += correctPoints;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).textContent = "Incorrect.";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='Incorrect'>";
}
