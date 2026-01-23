let wrapper = document.querySelector(".wrapper");
let loadbtn = document.querySelector(".loadMore");
let input = document.querySelector("input");
let select = document.querySelector("select");
let limit = 20;
let offset = 0;
let allPokemon = [];
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

function RenderPokemon(details) {
  let div = document.createElement("div");
  div.classList.add("pokemonDetails");

  let name = document.createElement("h1");
  name.classList.add("name");
  name.innerHTML = details.name;

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
       <p>Type: ${details.types[0].type.name}`;

  let both = document.createElement("div");
  both.classList.add("both");

  front.append(image, name);
  both.append(front, back);
  div.append(both);
  wrapper.append(div);
}

async function DisplayDetails(data) {
  try {
    let promises = data.results.map((item) =>
      fetch(item.url).then((response) => response.json()),
    );
    let allpromises = await Promise.all(promises);

    allPokemon.push(...allpromises);
    allpromises.forEach(RenderPokemon);
    // RenderPokemon(allpromises);
    console.log(allpromises);
  } catch (error) {
    console.log(error);
  }
}
input.addEventListener("keyup", (e) => {
  wrapper.innerHTML = "";

  let filtered = allPokemon.filter((poke) =>
    poke.name.includes(e.target.value.toLowerCase()),
  );

  if (filtered.length > 0) {
    filtered.forEach(RenderPokemon);
  } else {
    wrapper.innerHTML = `<p class ="error"> Error :No Pokemon Found</p> `;
  }
});

select.addEventListener("change", (e) => {
  let value = e.target.value.toLowerCase();
  wrapper.innerHTML = "";
  let filteredpokemon = allPokemon.filter((pok) => {
    let byType = pok.types.some((t) => t.type.name.includes(value));

    return byType;
  });

  filteredpokemon.forEach(RenderPokemon);
});
