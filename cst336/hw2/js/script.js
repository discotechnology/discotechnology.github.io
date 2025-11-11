let correctPoints = 20;
var score = 0;

document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz(){
    console.log("Grading quiz…");
    document.querySelector("#validationFeedback").textContent = "";
    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;

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


    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

}

function isFormValid() {
    let isValid = true;
    if (document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFeedback").textContent = "Question 1 was not answered. ";
    }
    if (document.querySelector("#q2").value == "") {
        isValid = false;
        document.querySelector("#validationFeedback").textContent += "Question 2 was not answered. ";
    }
    return isValid;
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
