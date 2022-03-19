// function to push user input (card) in to getPokeCard
$('#search-btn').on('click', function(event) {
    event.preventDefault();
    var userInput = $('#search-pokemon').val();
    getPokeCard(userInput);
    getPokeInfo(userInput);
})

function getPokeCard(card) {
    // format the cards api url
    var apiUrl = "https://api.pokemontcg.io/v2/cards?pageSize=10&q=name:" + card;
    // make a get request to url
    fetch(apiUrl).then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var randomInt = Math.floor(Math.random() * 10);
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
function getPokeInfo(input) {
    // format the PokeAPI URL to () endpoint
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + input;
    // make a request to URL
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to PokeAPI");
    });
};


var displayCards = function(card, randomInt) {
    $("#image").attr("src", card.data[randomInt].images.small);
}