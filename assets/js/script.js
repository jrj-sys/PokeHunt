var pokeFormEl = document.querySelector('#poke-form')

var getPokeCard = function(pokeCard) {
    // format the cards api url
    var apiUrl = "https://api.pokemontcg.io/v2/cards/<id>";
  
    // make a get request to url
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    displayRepos(data, pokeCard);
                });
            } else {
            alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to pokemontcg");
        });
};