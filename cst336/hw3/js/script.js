//Event Listeners
document.querySelector("#submitButton").addEventListener("click", getPokemon);

//Initialization


//Handlers
async function getPokemon(){
    let mon = document.querySelector("#pokeID").value.toLowerCase();
    if(!pokeValidate(mon)) {
        return;
    }

    let url = `https://pokeapi.co/api/v2/pokemon/${mon}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    let pokeName = data.name;
    document.querySelector("#pokeName").textContent = pokeName.toUpperCase();
    document.querySelector("#pokeImg").innerHTML = `<img src="https://img.pokemondb.net/artwork/${pokeName}.jpg" alt="Pokemon Logo">`;

}

function pokeValidate(mon) {
    return true;
}