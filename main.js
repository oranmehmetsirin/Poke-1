const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokemon_count = 151;

const bg_color = {
  grass: "#88dd66",
  fire: "#ff6633",
  water: "#3399ff",
  bug: "#aabb22",
  normal: "#aaaa99",
  flying: "#8866aa",
  poison: "#bb66aa",
  electric: "#ffdd44",
  ground: "#eecc66",
  fairy: "#ffaaee",
  psychic: "#ff66aa",
  fighting: "#cc6655",
  rock: "#ccbb77",
  dragon: "#7766ee",
  ice: "#66ccff",
};

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");

  pokemonNames.forEach((pokemonName) => {
    pokemonName.parentElement.parentElement.style.display = "block";

    if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.style.display = "none";
    }
  });
});

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  creatPokemonCard(data);
};
const creatPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");

  const pokemonType = pokemon.types[0].type.name;

  const pokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${pokemonBg}`;

  const pokemonDivInnerHTML = `
    
            <div class="image-container">
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" 
                    alt=""
                    />
            </div>
            <div class="poke-info">
                <span class="poke-id">#${pokemonId}</span>
                <h3 class="poke-name">${pokemon.name}</h3>
                <div class="small">
                    <small class="poke-exp">
                        <i class="fa-solid fa-flask"></i><span>${pokemon.base_experience} Exp</span>
                    </small>
                    <small class="poke-weight">
                        <i class="fa-solid fa-weight-scale"></i><span>${pokemon.weight} Kg</span>
                    </small>
                </div>
                <div class="poke-type">
                    <i class="fa-brands fa-uncharted"></i><span>${pokemonType}</span>
                </div>
            </div>

    `;
  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  poke_container.appendChild(pokemonDiv);
};
fetchPokemons();
