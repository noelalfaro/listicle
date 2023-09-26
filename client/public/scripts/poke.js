const renderPoke = async () => {
  const requestedID = parseInt(window.location.href.split("/").pop());

  const response = await fetch("/pokemon");
  const data = await response.json();

  const pokeContent = document.getElementById("poke-content");

  let poke;

  poke = data.find((poke) => poke.id === requestedID);

  if (poke) {
    document.getElementById("image").src = poke.image;
    document.getElementById("name").textContent = poke.name;
    document.getElementById("description").textContent =
      "Description: " + poke.description;
    document.getElementById("type").textContent = "Type: " + poke.type;
    document.getElementById("region").textContent = "Region: " + poke.region;
    document.getElementById("weaknesses").textContent = poke.weaknesses;
    document.title = `Pokemon - ${poke.name}`;
  } else {
    const message = document.createElement("h2");
    message.textContent = "Pokemon Not Registered";
    pokeContent.appendChild(message);
  }
};

renderPoke();
