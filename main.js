const imgPokemon = document.getElementsByClassName('imgPokemon');
const statsPokemon = document.getElementsByClassName('statsPokemon');
const buttonSearch = document.getElementById('buttonSearch')


buttonSearch.addEventListener('click', getPokemon);

function getPokemon() {
    const nameOrID = document.getElementById('nameOrID').value.toLowerCase();
    fetchPokemon(nameOrID);
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

    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Name: ${result[10][1]} - ID${result[6][1]}`

    const pokemonType = document.createElement('h2')
    pokemonType.innerText = `Type: ${result[16][1][0].type.name}`

    imgPokemon.append(imgContainer)
    statsPokemon.append(pokemonName, pokemonType)
})
}

