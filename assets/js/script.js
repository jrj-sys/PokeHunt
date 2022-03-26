var searchHistory = [];

var onRefresh = () => {
    var poke = localStorage.getItem('latestPoke');
    var userSearch = localStorage.getItem('userSearch');

    if (!poke || !userSearch) {
        return;
    }
    searchHistory = userSearch.split(',');
    console.log(searchHistory);
    getPokeInfo(poke);
    getPokeCard(poke);
    searchHistory.forEach(pokemon => createSavedSearch(pokemon));
}

function getPokeCard(input) {
    // format the cards api url
    var apiUrl = "https://api.pokemontcg.io/v2/cards?pageSize=10&q=name:" + input;
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
    var hp = document.createElement('h3');
    var attack = document.createElement('h3');
    var defense = document.createElement('h3');
    var specialAttack = document.createElement('h3');
    var specialDefense = document.createElement('h3');
    var speed = document.createElement('h3');
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
    
    [type, ability, hp, attack, defense, specialAttack, specialDefense, speed, pokedexnum, height, weight].forEach(elem => {
        card.appendChild(elem);
    })
    
};

var displayCards = function(card, randomInt) {
    $("#image").attr("src", card.data[randomInt].images.small);
}


var getSearchHistory = function(poke) {
    var history = localStorage.getItem("userSearch");    
    localStorage.setItem('latestPoke', poke);
    if (!history) {
        searchHistory.push(poke);
        localStorage.setItem("userSearch", searchHistory);
    } else {
        searchHistory = history.split(',');
        if (searchHistory.includes(poke)) {
            return;
        }
        searchHistory.push(poke);
        console.log(searchHistory);
        localStorage.setItem("userSearch", searchHistory);
    }
}

var createSavedSearch = (poke) => {
    var recentContainer =$('#saved-search');
    console.log(recentContainer);
    for (let child of recentContainer.children()) {
        console.log(child.innerHTML);
        if (child.innerHTML.includes(poke)) {
            return;
        }
    }
    
    var recentBtn = document.createElement('button');
    recentBtn.classList.add('saved-btn');
    recentBtn.innerHTML = poke;
    recentContainer.append(recentBtn);
}

var isLastSearched = (poke) => {
    var latestPokeName = localStorage.getItem('latestPoke');

    if (latestPokeName === poke) {
        return true;
    }
    return false;
}

var displayCurrentInfoAndCard = function(userInput) {
    
    // if user enters blank and clicks search button, returns to original page
    if (!userInput) {
        return;
    }
    // if user enters same search back to back returns to original page
    if (isLastSearched(userInput)) {
        return;
    };

    getSearchHistory(userInput);
    createSavedSearch(userInput);
    getPokeInfo(userInput);
    getPokeCard(userInput);
}

// function to push user input (card) in to getPokeCard
$('#search-btn').on('click', function(event) {
    event.preventDefault();
    // take user input (to lowercase to work with info API) and input it into getPokeCard and getPokeInfo
    var userInput = $('#search-pokemon').val().toString().toLowerCase();
    displayCurrentInfoAndCard(userInput);
});

$('#saved-search').on('click', function(event) {
    var savedSearch = event.target.innerHTML;
    getPokeCard(savedSearch);
    getPokeInfo(savedSearch);
    localStorage.setItem('latestPoke', savedSearch)
});

onRefresh();