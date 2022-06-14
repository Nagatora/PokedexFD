const imgPokemon = document.querySelector(".imgPokemon");
const statsPokemon = document.querySelector('.statsPokemon');
const buttonSearch = document.getElementById('buttonSearch');
const buttonRandom = document.getElementById('buttonRandom');
const buttonRestart = document.getElementById('buttonRestart');
const buttonSum = document.getElementById('sum');
const buttonSubtraction = document.getElementById('subtraction');

buttonSearch.addEventListener('click', getPokemon);
function getPokemon() {
    const nameOrID = document.getElementById('nameOrID').value.toLowerCase();
    fetchPokemon(nameOrID);
    imgPokemon.removeChild();
    statsPokemon.removeChild();
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
    const imgContainer = document.getElementById('img')
    imgContainer.src = result[14][1].front_default

    const pokemonName = document.getElementById('name');
    pokemonName.innerText = `Name:${result[10][1]}`

    const pokemonID = document.getElementById('id')
    pokemonID.innerText = `ID:${result[6][1]}`
    
    const pokemonType = document.getElementById('type')
    pokemonType.innerText = `Type:${result[16][1][0].type.name}`

    imgPokemon.append(imgContainer);
    statsPokemon.append(pokemonName, pokemonID, pokemonType);

    pokemonIDSum = result[6][1];
    pokemonIDSum = pokemonIDSum + 1;

    buttonSum.addEventListener('click', () =>{
        nameOrID = pokemonIDSum;
        fetchPokemon(nameOrID)
    })

    pokemonIDSubtraction = result [6][1];
    pokemonIDSubtraction = pokemonIDSubtraction - 1;
    
    buttonSubtraction.addEventListener('click', () =>{
        nameOrID = pokemonIDSubtraction;
        fetchPokemon(nameOrID)
    })
})}
