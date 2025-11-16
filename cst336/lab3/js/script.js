//Event Listeners

document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#pwd").addEventListener("focus",suggestPassword);
document.querySelector("#pwd").addEventListener("blur",removeSuggestPassword);
document.querySelector("#signupForm").addEventListener("submit", function(event) {validateForm(event);});


//Initialization
initializeStates();

//Functions
async function initializeStates() {
    let stateSelect = document.querySelector("#state");
    stateSelect.innerHTML = "<option>Choose one:</option>";

    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for(i in data) {
        stateSelect.innerHTML += `<option value="${data[i].usps}">${data[i].state}</option>`;
    }
}

async function displayCity() {
    document.querySelector("#zipError").textContent = "";
    document.querySelector("#city").textContent = "";
    document.querySelector("#latitude").textContent = "";
    document.querySelector("#longitude").textContent = "";

    let zipCode = document.querySelector("#zip").value;
    if(zipCode.length > 5) {
        document.querySelector("#zipError").textContent = " Zip code not found.";
        document.querySelector("#zipError").style.color = "red";
        return;
    }

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    //True if zip code not found
    if(!data) {
        document.querySelector("#zipError").textContent = " Zip code not found.";
        document.querySelector("#zipError").style.color = "red";
        return;
    }

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;
}

async function displayCounties() {
    let state = document.querySelector("#state").value.toLowerCase();
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#county").innerHTML = "<option>Select a county:</option>";

    for(i of data) {
        document.querySelector("#county").innerHTML += `<option> ${i.county} </option>`;
    }
}

async function suggestPassword() {
    let response = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");
    let data = await response.json();
    console.log(data);

    document.querySelector("#suggestedPwd").textContent = ` Suggested password: ${data.password}`;
}

async function removeSuggestPassword() {
    document.querySelector("#suggestedPwd").textContent = "";
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
        document.querySelector("#usernameValidation").textContent = " Username required.";
        document.querySelector("#usernameValidation").style.color = "red";
        isValid = false;
    }

    if(password.length < 6) {
        document.querySelector("#passwordError").textContent += " Password must be at least 6 characters. "
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