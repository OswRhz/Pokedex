fetch("Data/pokemones.json")
  .then((response) => response.json())
  .then((data) => render(data));

// <div class="card" style="width: 18rem;">
//      <img src="..." class="card-img-top" alt="...">
//      <div class="card-body">
//          <h5 class="card-title">Card title</h5>
//          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//      </div>
// </div>

var favorites = [];

if(localStorage.getItem("favoritesMemory")){
  favorites= JSON.parse(localStorage.getItem("favoritesMemory"));
}

const render = (pokemones) => {
  printCards.innerHTML = ""
  pokemones.forEach((pokemon) => {
    let cardContainer = document.createElement("div");
    let card = document.createElement("div");
    let img = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let heart = document.createElement("i");
      
    img.setAttribute("src", pokemon.ThumbnailImage);
    cardTitle.innerText = (pokemon.number + (" ") + pokemon.name);
    cardContainer.classList.add("col-lg-2", "col-sm-4", "pb-3");
    card.classList.add("card", "bg-secondary");
    img.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title", "text-light", "text-center", "mb-0");
    heart.classList.add("bi", "bi-heart");
    heart.setAttribute("data-name", pokemon.name)
    heart.setAttribute("id", "fav")
    card.setAttribute("id", pokemon.number);

    printCards.appendChild(cardContainer);
    cardContainer.appendChild(card);
    card.appendChild(heart);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);

    heart.addEventListener("click", (e) => {
      let pokeNameFav = e.target.dataset.name;
      let pokeArray = [];
  
      if(favorites.length > 0){            
        pokeArray = favorites.filter((favorite) => {
          return favorite.name === pokeNameFav;
        });
      }
  
      if(pokeArray.length <= 0){
        //Si ya existe en el arreglo
        favorites.push(pokemon);
        let pokeFavs = JSON.stringify(favorites);
        localStorage.setItem("favoritesMemory", pokeFavs);
    }
    else{
        alert(`${pokeNameFav} ya estaba en la lista`);
    }
    });
  })
};