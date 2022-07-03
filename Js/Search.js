const formPokemon = document.querySelector("#search")
const showAllPokemons = document.querySelector("#allPokemonsButton")
const pokemonType = document.querySelector("#types")
const fav = document.querySelector("#favButton")
const clear = document.querySelector("#clearFavorites")

fetch("Data/pokemones.json")
  .then((response) => response.json())
  .then(data => {
    allPokemons = data;
  });


formPokemon.addEventListener("keyup", (e) => {
    e.preventDefault();
    let inputPokemon = document.querySelector("#pokemonName").value;
    let filterByNmae = allPokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(inputPokemon.toLowerCase());
    })
    render(filterByNmae);
});

showAllPokemons.addEventListener("click", (e) => {
    e.preventDefault();
    render(allPokemons);
    document.querySelector("#pokemonName").value = ""
    document.querySelector("#types").value = "allPokemons"
})

pokemonType.addEventListener("change", (e) => {
    console.log(e.target.value);
    let type = e.target.value;
    if (type == "allPokemons"){
        render(allPokemons);
        return
    }
    let searchByType = allPokemons.filter((pokemon) => {
        return pokemon.type.includes(type);
    })
    render(searchByType);
})

fav.addEventListener("click", (e) => {
    if(favorites.length <= 0){
        printCards.innerHTML = ""
        let message = document.createElement("div");
        message.classList.add("h1", "text-center", "fw-bold", "mt-5", "text-danger");
        message.innerText = ("Agrega un Pokemon")
        printCards.appendChild(message);
    }
    else{
        render(favorites);
    }
})

clear.addEventListener("click", (e) => {
    localStorage.clear();
    favorites = [];
    render(allPokemons);
})