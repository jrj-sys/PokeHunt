var infoContainerEl = document.querySelector('.poke-info');
var infoSearchTerm = document.querySelector('#info-search-term');

function getPokeCard(card) {
    // format the cards api url
    var apiUrl = "https://api.pokemontcg.io/v2/cards?pageSize=10&q=name:" + card;
    // make a get request to url
    fetch(apiUrl).then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var randomInt = Math.floor(Math.random() * 6);
                    displayCards(data, randomInt);
                });
            } else {
            alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to pokemontcg");
    });
};

// name, type, ability, base stats + name of stat, height & weight
// functions to get Pokemon info per endpoint because the PokeAPI does not let you search by name
var displayCards = function(card, randomInt) {
    $("#image").attr("src", card.data[randomInt].images.small);
}
var getPokeInfo = async (input) => {
    // format the PokeAPI URL to () endpoint
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + input;
    // make a request to URL
    var response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Error: " + response.statusText);
    }
    var pokeInfoResponse = await response.json();
    console.log(pokeInfoResponse);
    if (pokeInfoResponse.length === 0) return;
    
    
    var card = document.querySelector('.poke-info');
    while (card.firstChild) {
        card.removeChild(card.firstChild);
    }
    infoSearchTerm.textContent = input;

    var type = document.createElement('h3');
    var ability = document.createElement('h3');
    var stats = document.createElement('div');
    var hp = document.createElement('p');
    var attack = document.createElement('p');
    var defense = document.createElement('p');
    var specialAttack = document.createElement('p');
    var specialDefense = document.createElement('p');
    var speed = document.createElement('p');
    var pokedexnum = document.createElement('h3');
    var height = document.createElement('h3');
    var weight = document.createElement('h3');

    if (pokeInfoResponse.types.length === 1) {
        type.innerHTML = `Type: ${pokeInfoResponse.types[0].type.name}`;
    } else if (pokeInfoResponse.types.length === 2) {
        type.innerHTML = `Type: ${[pokeInfoResponse.types[0].type.name, pokeInfoResponse.types[1].type.name]}`;
    };

    if (pokeInfoResponse.abilities.length === 1) {
        ability.innerHTML = `Abilities: ${pokeInfoResponse.abilities[0].ability.name}`;
    } else if (pokeInfoResponse.abilities.length === 2) {
        ability.innerHTML = `Abilities: ${[pokeInfoResponse.abilities[0].ability.name, pokeInfoResponse.abilities[1].ability.name]}`;
    } else if (pokeInfoResponse.abilities.length === 3) {
        ability.innerHTML = `Abilities: ${[pokeInfoResponse.abilities[0].ability.name, pokeInfoResponse.abilities[1].ability.name, pokeInfoResponse.abilities[2].ability.name]}`;
    };

    stats.innerHTML = `Stats: ${""}`;
    hp.innerHTML = `HP: ${pokeInfoResponse.stats[0].base_stat}`;
    attack.innerHTML = `Attack: ${pokeInfoResponse.stats[1].base_stat}`;
    defense.innerHTML = `Defense: ${pokeInfoResponse.stats[2].base_stat}`;
    specialAttack.innerHTML = `Special Attack: ${pokeInfoResponse.stats[3].base_stat}`;
    specialDefense.innerHTML = `Special Defense: ${pokeInfoResponse.stats[4].base_stat}`;
    speed.innerHTML = `Speed: ${pokeInfoResponse.stats[5].base_stat}`;
    pokedexnum.innerHTML = `Pokedex #: ${pokeInfoResponse.id}`;
    height.innerHTML = `Height: ${pokeInfoResponse.height}`;
    weight.innerHTML = `Weight: ${pokeInfoResponse.weight}`;
    
    [type, ability, stats, pokedexnum, height, weight].forEach(elem => {
        card.appendChild(elem);
    })
    
    // [hp, attack, defense, specialAttack, specialDefense, speed].forEach(elem => {
    //     stats.appendChild(elem);
    // })
    stats.appendChild(hp);
    stats.appendChild(attack);
    stats.appendChild(defense);
    stats.appendChild(specialAttack);
    stats.appendChild(specialDefense);
    stats.appendChild(speed);

};

// function to push user input (card) in to getPokeCard
$('#search-btn').on('click', function(event) {
    event.preventDefault();
    var userInput = $('#search-pokemon').val();
    getPokeCard(userInput);
    getPokeInfo(userInput);
})

var displayCards = function(card, randomInt) {
    $("#image").attr("src", card.data[randomInt].images.small);
}
