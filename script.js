let wrapper = document.querySelector(".wrapper");
let loadbtn = document.querySelector(".loadMore");
let limit = 20;
let offset = 0;

async function pokemon() {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    let data = await response.json();
    console.log(data.results);

    DisplayDetails(data);
  } catch (error) {
    console.log(error);
  }
}
pokemon();
loadbtn.addEventListener("click", () => {
  offset += 20;
  pokemon();
});
async function DisplayDetails(data) {
  data.results.forEach(async (item) => {
    try {
      let result = await fetch(item.url);
      let details = await result.json();
      console.log(details);

      let div = document.createElement("div");
      div.classList.add("pokemonDetails");

      let name = document.createElement("h1");
      name.classList.add("name");
      name.innerHTML = item.name;

      let image = document.createElement("img");
      image.classList.add("images");
      image.src = details.sprites.other.dream_world.front_default;

      let front = document.createElement("div");
      front.classList.add("front");

      let back = document.createElement("div");
      back.classList.add("back");
      back.innerHTML = `
      <p>Weight: ${details.weight}Kg</p>
       <p>Height: ${details.height}ft</p>
       <p>Moves: ${details.moves[0].move.name}</p>
       <p>Abilities: ${details.abilities[0].ability.name}
       <p>Type: ${details.types[0].type.name}
       `;

      let both = document.createElement("div");
      both.classList.add("both");

      front.append(image, name);
      both.append(front, back);
      div.append(both);
      wrapper.append(div);
    } catch (error) {console.log(error);
    }
  });
}

