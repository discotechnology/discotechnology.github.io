let correctPoints = 10;
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ5Choices();
displayQ8Choices();

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
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q8Response = document.querySelector('input[name="q8"]:checked').value;

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

    //Question 5
    if (document.querySelector("#Alaska").checked &&
        document.querySelector("#Hawaii").checked &&
        !document.querySelector("#Arizona").checked &&
        !document.querySelector("#Vermont").checked) {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }

    //Question 6
    if (q6Response == "whitney") {
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }

    // Question 7
    if (q7Response == "philadelphia") {
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }

    // Question 8
    if (q8Response == "Texas") {
        rightAnswer(8);
    }
    else {
        wrongAnswer(8);
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
        document.querySelector("#validationFeedback").textContent += "Answer Q4. ";
    }
    if (document.querySelector("#q6").value == "") {
        isValid = false;
        document.querySelector("#validationFeedback").textContent += "Answer Q6. ";
    }
    if (document.querySelector("#q7").value == "") {
        isValid = false;
        document.querySelector("#validationFeedback").textContent += "Answer Q7. ";
    }
    if (document.querySelector('input[name="q8"]:checked') == null) {
        isValid = false;
        document.querySelector("#validationFeedback").textContent += "Answer Q8. ";
    }
    return isValid;
}

function displayQ4Choices() {
    let choices = ["Maine", "Delaware", "Rhode Island", "Maryland"];
    choices = _.shuffle(choices);
    for (let i = 0; i < choices.length; i++) {
        document.querySelector("#q4Choices").innerHTML +=
            `<div class="bg-info rounded bg-opacity-75"><input type="radio" name="q4" value="${choices[i]}"> <label for="${choices[i]}"> ${choices[i]}</label></div>`;
    }
}

function displayQ5Choices() {
    let choices = ["Hawaii", "Alaska", "Vermont", "Arizona"];
    choices = _.shuffle(choices);
    for (let i = 0; i < choices.length; i++) {
        document.querySelector("#q5Choices").innerHTML +=
            `<div class="bg-info rounded bg-opacity-75"><input type="checkbox" name="q5" id="${choices[i]}"> <label for="${choices[i]}"> ${choices[i]}</label></div>`;
    }
}

function displayQ8Choices() {
    let choices = ["Texas", "California", "Nevada", "Colorado"];
    choices = _.shuffle(choices);
    for (let i = 0; i < choices.length; i++) {
        document.querySelector("#q8Choices").innerHTML +=
            `<div class="bg-info rounded bg-opacity-75"><input type="radio" name="q8" value="${choices[i]}"> <label for="${choices[i]}"> ${choices[i]}</label></div>`;
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
