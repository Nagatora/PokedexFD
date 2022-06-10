const btnBuscar = document.getElementById('btnBuscar')

function mostrarPokemon(pokemon){
    const imgPokemon = document.getElementsByClassName('imgPokemon');
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    imgPokemon.appendChild(sprite);
}

function fetchPokemon(nombreOrID){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOrID}/`)
    .then((res) => res.json())
    .then((pokemon) =>  {
        const imgPokemon = document.getElementsByClassName('imgPokemon');
        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.front_default
        imgPokemon.appendChild(sprite);

    });
}

btnBuscar.addEventListener('click', () =>{
    const nombreOrID = document.getElementById('nombreOrID').value;
    fetchPokemon(nombreOrID);
});