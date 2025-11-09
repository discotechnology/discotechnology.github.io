let correctPoints = 20;

document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz(){
    console.log("Grading quiz…");
    document.querySelector("#validationFeedback").textContent = "";
    if (!isFormValid()) {
        return;
    }

    let score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;

    // Question 1
    if (q1Response == "sacramento") {
        document.querySelector("#q1Feedback").textContent = "Correct!";
        document.querySelector("#q1Feedback").className = "bg-success text-white";
        document.querySelector("#markImg1").innerHTML = "<img src='img/checkmark.png' alt='Correct'>";
        score += correctPoints;
    }
    else {
        document.querySelector("#q1Feedback").textContent = "Incorrect.";
        document.querySelector("#q1Feedback").className = "bg-warning text-white";
        document.querySelector("#markImg1").innerHTML = "<img src='img/xmark.png' alt='Incorrect'>";
    }


    // Question 2
    if (q2Response == "mo") {
        document.querySelector("#q2Feedback").textContent = "Correct!";
        document.querySelector("#q2Feedback").className = "bg-success text-white";
        document.querySelector("#markImg2").innerHTML = "<img src='img/checkmark.png' alt='Correct'>";
        score += correctPoints;
    }
    else {
        document.querySelector("#q2Feedback").textContent = "Incorrect.";
        document.querySelector("#q2Feedback").className = "bg-warning text-white";
        document.querySelector("#markImg2").innerHTML = "<img src='img/xmark.png' alt='Incorrect'>";
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
