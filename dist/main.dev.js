"use strict";

var imgPokemon = document.querySelector(".imgPokemon");
var statsPokemon = document.querySelector('.statsPokemon');
var buttonSearch = document.getElementById('buttonSearch');
var buttonRandom = document.getElementById('buttonRandom');
var buttonRestart = document.getElementById('buttonRestart');
var buttonSum = document.getElementById('sum');
var buttonSubtraction = document.getElementById('subtraction');
buttonSearch.addEventListener('click', getPokemon);

function getPokemon() {
  var nameOrID = document.getElementById('nameOrID').value.toLowerCase();
  fetchPokemon(nameOrID);
  imgPokemon.removeChild();
  statsPokemon.removeChild();
}

buttonRandom.addEventListener('click', fetchRandomPokemon);
var arrayID = [];

function fetchRandomPokemon() {
  for (var i = 0; i < 898; i++) {
    arrayID.push(i);
  }

  var randomID = Math.floor(Math.random() * arrayID.length);
  var nameOrID = arrayID[randomID];
  fetchPokemon(nameOrID);
}

function fetchPokemon(nameOrID) {
  fetch("https://pokeapi.co/api/v2/pokemon/".concat(nameOrID, "/")).then(function (res) {
    if (res.status === 404) {
      alert('This pokemon is not available. Try another one!');
    } else {
      return res.json();
    }
  }).then(function (resJSON) {
    var allItems = [];
    var result = [];

    for (var pokemonInfo in resJSON) {
      result.push([pokemonInfo, resJSON[pokemonInfo]]);
    }

    var imgContainer = document.getElementById('img');
    imgContainer.src = result[14][1].front_default;
    var pokemonName = document.getElementById('name');
    pokemonName.innerText = "Name:".concat(result[10][1]);
    var pokemonID = document.getElementById('id');
    pokemonID.innerText = "ID:".concat(result[6][1]);
    var pokemonType = document.getElementById('type');
    pokemonType.innerText = "Type:".concat(result[16][1][0].type.name);
    imgPokemon.append(imgContainer);
    statsPokemon.append(pokemonName, pokemonID, pokemonType);
    pokemonIDSum = result[6][1];
    pokemonIDSum = pokemonIDSum + 1;
    buttonSum.addEventListener('click', function () {
      nameOrID = pokemonIDSum;
      fetchPokemon(nameOrID);
    });
    pokemonIDSubtraction = result[6][1];
    pokemonIDSubtraction = pokemonIDSubtraction - 1;
    buttonSubtraction.addEventListener('click', function () {
      nameOrID = pokemonIDSubtraction;
      fetchPokemon(nameOrID);
    });
  });
}