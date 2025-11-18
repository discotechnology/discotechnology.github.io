//Event Listeners
document.querySelector("#pokeID").addEventListener("input", getPokemon);
document.querySelector("#impressMe").addEventListener("submit", function(event) {validateForm(event);});

//Initialization
var isValid = false;

//Handlers
async function getPokemon(){
    let mon = document.querySelector("#pokeID").value.toLowerCase();
    if(mon == "") {
        isValid = false;
        document.querySelector("#pokeImg").innerHTML = "";
        return;
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${mon}`;
    let response = await fetch(url);
    console.log(response);
    if(!response.ok) {
        isValid = false;
        document.querySelector("#pokeName").textContent = "I've never heard of that one...";
        document.querySelector("#pokeImg").innerHTML = "";
        return;
    }

    let data = await response.json();
    console.log(data);

    let pokeName = data.name;
    if(mon != pokeName) {
        isValid = false;
        document.querySelector("#pokeName").textContent = "Don't just pick a number. Put some effort in!";
        document.querySelector("#pokeImg").innerHTML = "";
        return;
    }

    document.querySelector("#pokeName").textContent = `#${data.id}. ${pokeName.toUpperCase()}`;
    document.querySelector("#pokeImg").innerHTML = `<img src="https://img.pokemondb.net/artwork/${pokeName}.jpg" alt="Pokemon Logo">`;
    isValid = true;

}

function validateForm(e) {
    if(!isValid) {
        document.querySelector("#pokeName").textContent = "You're just guessing. Nothing has been proved."
        e.preventDefault();
    }
}