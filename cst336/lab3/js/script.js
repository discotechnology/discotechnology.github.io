//Event Listeners

document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);

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