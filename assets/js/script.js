var searchHistory = [];

function getPokeCard(card) {
    // format the cards api url
    var apiUrl = "https://api.pokemontcg.io/v2/cards?pageSize=10&q=name:" + card;
    // make a get request to url
    fetch(apiUrl).then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var randomInt = Math.floor(Math.random() * data.count);
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
    
    var infoSearchTerm = $('#info-search-term');
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
        var pokemonTypes = pokeInfoResponse.types[0].type.name.slice(0,1).toUpperCase() + pokeInfoResponse.types[0].type.name.slice(1)
        console.log(pokemonTypes)
        type.innerHTML = `Type: ${pokemonTypes}`;
    } else if (pokeInfoResponse.types.length === 2) {
        var pokemonTypes1 = pokeInfoResponse.types[0].type.name.slice(0,1).toUpperCase() + pokeInfoResponse.types[0].type.name.slice(1)
        var pokemonTypes2 = pokeInfoResponse.types[1].type.name.slice(0,1).toUpperCase() + pokeInfoResponse.types[1].type.name.slice(1)
        type.innerHTML = `Type: ${[pokemonTypes1] + "-" + [pokemonTypes2]}`;
    };

    if (pokeInfoResponse.abilities.length === 1) {
        var abilityName = pokeInfoResponse.abilities[0].ability.name.slice(0,1).toUpperCase()+pokeInfoResponse.abilities[0].ability.name.slice(1)
        ability.innerHTML = `Abilities: ${abilityName}`;
    } else if (pokeInfoResponse.abilities.length === 2) {
        var abilityName1 = pokeInfoResponse.abilities[0].ability.name.slice(0,1).toUpperCase()+pokeInfoResponse.abilities[0].ability.name.slice(1)
        var abilityName2 = pokeInfoResponse.abilities[1].ability.name.slice(0,1).toUpperCase()+pokeInfoResponse.abilities[1].ability.name.slice(1)
        ability.innerHTML = `Abilities: ${[abilityName1] + ", " + [abilityName2]}`;
    } else if (pokeInfoResponse.abilities.length === 3) {
        var abilityName3 = pokeInfoResponse.abilities[0].ability.name.slice(0,1).toUpperCase()+pokeInfoResponse.abilities[0].ability.name.slice(1)
        var abilityName4 = pokeInfoResponse.abilities[1].ability.name.slice(0,1).toUpperCase()+pokeInfoResponse.abilities[1].ability.name.slice(1)
        var abilityName5 = pokeInfoResponse.abilities[2].ability.name.slice(0,1).toUpperCase()+pokeInfoResponse.abilities[2].ability.name.slice(1)
        ability.innerHTML = `Abilities: ${[abilityName3] + ", " + [abilityName4] + ", " + [abilityName5]}`;
    };

    stats.innerHTML = `Stats: ${""}`;
    hp.innerHTML = `HP: ${pokeInfoResponse.stats[0].base_stat}`;
    attack.innerHTML = `Attack: ${pokeInfoResponse.stats[1].base_stat}`;
    defense.innerHTML = `Defense: ${pokeInfoResponse.stats[2].base_stat}`;
    specialAttack.innerHTML = `Special Attack: ${pokeInfoResponse.stats[3].base_stat}`;
    specialDefense.innerHTML = `Special Defense: ${pokeInfoResponse.stats[4].base_stat}`;
    speed.innerHTML = `Speed: ${pokeInfoResponse.stats[5].base_stat}`;
    pokedexnum.innerHTML = `Pokedex #: ${pokeInfoResponse.id}`;
    var heightFormat = parseInt(pokeInfoResponse.height)/10 + " m";
    var weightFormat = parseInt(pokeInfoResponse.weight)/10 + " kg";
    height.innerHTML = `Height: ${heightFormat}`;
    weight.innerHTML = `Weight: ${weightFormat}`;
    
    [type, ability, stats, pokedexnum, height, weight].forEach(elem => {
        card.appendChild(elem);
    })
    
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
    // take user input (to lowercase to work with info API) and input it into getPokeCard and getPokeInfo
    var userInput = $('#search-pokemon').val().toString().toLowerCase();
    getPokeCard(userInput);
    getPokeInfo(userInput);
    getSearchHistory();
    createSavedSearch();
})

var displayCards = function(card, randomInt) {
    $("#image").attr("src", card.data[randomInt].images.small);
}


var getSearchHistory = function() {
    var history = localStorage.getItem("userSearch");    
    var userInput = $('#search-pokemon').val().toString().toLowerCase();
    if (!history) {
        searchHistory.push(userInput);
        localStorage.setItem("userSearch", searchHistory);
    } else {
    searchHistory = [history];
    searchHistory.push(userInput);
    localStorage.setItem("userSearch", searchHistory);
    }
}

var createSavedSearch = function(input) {
    var recentContainer = $('#saved-search');
    var recentBtn = document.createElement('button');
    recentBtn.classList.add('saved-btn');
    recentBtn.innerHTML = $('#search-pokemon').val().toString().toLowerCase();
    recentContainer.append(recentBtn);
}

$('#list-opacity').on('click', 'button', function(event) {
    var savedSearch = event.target.innerHTML;
    getPokeCard(savedSearch);
    getPokeInfo(savedSearch);
});