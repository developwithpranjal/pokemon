let pok = document.querySelector(".pmBox");
let loadbtn = document.querySelector(".loadMore");
let url = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";

// let count = 0;
// let limit = 20;
let finalarr = [];
async function pokemon() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    // count += limit;
    DisplayDetails(data);
  } catch (error) {
    console.log(error);
  }
}
pokemon();
// loadbtn.addEventListener("click",()=>{
//     DisplayDetails()
// })
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
      div.append(image, name);
      pok.append(div);
    } catch (error) {}
  });
}
