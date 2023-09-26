const renderPokemon = async () => {
  const response = await fetch("/pokemon");
  const data = await response.json();

  const mainContent = document.getElementById("main-content");

  if (data) {
    data.map((pokemon) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const topContainer = document.createElement("div");
      topContainer.classList.add("top-container");

      const bottomContainer = document.createElement("div");
      bottomContainer.classList.add("bottom-container");

      topContainer.style.backgroundImage = `url(${pokemon.image})`;

      const name = document.createElement("h3");
      name.textContent = pokemon.name;
      bottomContainer.appendChild(name);

      const pokemonType = document.createElement("p");
      pokemonType.textContent = "Type: " + pokemon.type;
      bottomContainer.appendChild(pokemonType);

      const pokemonDescription = document.createElement("p");
      pokemonDescription.textContent = "Description: " + pokemon.description;
      bottomContainer.appendChild(pokemonDescription);

      const link = document.createElement("a");
      link.textContent = "Read More >";
      link.setAttribute("role", "button");
      link.href = `/pokemon/${pokemon.id}`;
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);

      mainContent.appendChild(card);
    });
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Pokemon Indexed Yet";
    mainContent.appendChild(message);
  }
};

renderPokemon();

// const requestedUrl = window.location.href.split("/").pop();

// if (requestedUrl) {
//   window.location.href = "../404.html";
// } else {
// renderPokemon();
// }
