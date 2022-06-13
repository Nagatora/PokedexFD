const imgPokemon = document.querySelector(".imgPokemon");
const statsPokemon = document.querySelector('.statsPokemon');
const buttonSearch = document.getElementById('buttonSearch');
const buttonRandom = document.getElementById('buttonRandom');
const buttonRestart = document.getElementById('buttonRestart');

buttonSearch.addEventListener('click', getPokemon);

function getPokemon() {
    const nameOrID = document.getElementById('nameOrID').value.toLowerCase();
    fetchPokemon(nameOrID);
}

buttonRandom.addEventListener('click', fetchRandomPokemon)
let arrayID = [];

function fetchRandomPokemon(){
    for (let i = 0; i < 898; i++){
        arrayID.push(i)
    }
    const randomID = Math.floor(Math.random() * arrayID.length);
    const nameOrID = arrayID[randomID]
    
    fetchPokemon(nameOrID)
}


function fetchPokemon(nameOrID){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrID}/`)
    .then((res) => {
        if (res.status === 404) {
            alert('This pokemon is not available. Try another one!')
        }   else{
            return res.json()
        }
    })
    .then(resJSON => {
        const allItems = []

        const result = []
    
    for(let pokemonInfo in resJSON){
        result.push([pokemonInfo, resJSON[pokemonInfo]])
    }
    console.table(result)

    const imgContainer = document.createElement('img')
    imgContainer.src = result[14][1].front_default

    const pokemonName = document.createElement('h4');
    pokemonName.innerText = `Name:${result[10][1]}`

    const pokemonID = document.createElement('h4')
    pokemonID.innerText = `ID:${result[6][1]}`

    const pokemonType = document.createElement('h4')
    pokemonType.innerText = `Type:${result[16][1][0].type.name}`

    imgPokemon.append(imgContainer);
    statsPokemon.append(pokemonName, pokemonID, pokemonType);

})}


