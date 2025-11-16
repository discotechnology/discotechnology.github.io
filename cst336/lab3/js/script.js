//Event Listeners

document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {validateForm(event);});


//Functions

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#county").innerHTML = "<option>Select a county:</option>";

    for(i of data) {
        document.querySelector("#county").innerHTML += `<option> ${i.county} </option>`
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;

    let response = await fetch(url);
    let data = await response.json();

    let validation = document.querySelector("#usernameValidation");

    if(data.available) {
        validation.textContent = " Username is available!";
        validation.style.color = "green";
    }
    else {
        validation.textContent = " Username is taken - choose another username.";
        validation.style.color = "red";
    }
}

function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#pwd").value;
    let confirm = document.querySelector("#pwdConfirm").value;

    document.querySelector("#passwordError").textContent = "";

    if(username == "") {
        document.querySelector("#usernameValidation").textContent = "Username required.";
        document.querySelector("#usernameValidation").style.color = "red";
        isValid = false;
    }

    if(password.length < 6) {
        document.querySelector("#passwordError").textContent += "Password must be at least 6 characters. "
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }

    if(password != confirm) {
        document.querySelector("#passwordError").textContent += "Passwords entered do not match."
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }

    if(!isValid) {
        e.preventDefault();
    }
    
}