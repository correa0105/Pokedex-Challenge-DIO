const pokemonList = document.querySelector("#pokemonList")
const loadPokemons = document.querySelector("#loadPokemons");
const loadMorePokemons = document.querySelector("#loadMorePokemons")
const amountPokemons = document.querySelector("#amountPokemons");
const checkboxFirstGeneration = document.querySelector("#checkboxFirstGeneration");

const color = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

function pokemonToLi(pokemon) {
    return `
    <li>
        <span class="idPokemon">#${pokemon.pokemonNumber}</span>
        ${pokemon.name}
        <div class="downCardContainer">
            <div class="pokemonAtributes">
                <span class="primaryAtribute">${pokemon.primaryType}</span>
                <span class="secondaryAtribute">${pokemon.secondaryType}</span>
            </div>
            <img src="${pokemon.photo}" alt="Foto do Pokenon ${pokemon.name}">
        </div>
    </li>
    `
}

function setFirstGeneration() {
    if(checkboxFirstGeneration.checked) return 151;
    return amountPokemons
}

loadPokemons.addEventListener("click", () => {
    PokeAPI.getPokemons(0, setFirstGeneration())
    .then((pokemons) => {
        const htmlPokemon = pokemons.map((pokemon) => pokemonToLi(pokemon)).join("")
        pokemonList.innerHTML = htmlPokemon

        const li = document.querySelectorAll("li")
        li.forEach(value => {
            const primaryColor = value.children[1].children[0].children[0].innerHTML
            value.style.background = color[primaryColor]

            const secondaryBackground = value.children[1].children[0].children[1];
            const secondaryColor = value.children[1].children[0].children[1].innerHTML
            secondaryBackground.style.background = color[secondaryColor]
        })
})
})

loadMorePokemons.addEventListener("click", () => {
    const amountPokemonSpawned = document.querySelectorAll("li");

    PokeAPI.getPokemons(amountPokemonSpawned.length, 10)
    .then((pokemons) => {
        const htmlPokemon = pokemons.map((pokemon) => pokemonToLi(pokemon)).join("")
        pokemonList.innerHTML += htmlPokemon

        const li = document.querySelectorAll("li")
        li.forEach(value => {
            const primaryColor = value.children[1].children[0].children[0].innerHTML
            value.style.background = color[primaryColor]

            const secondaryBackground = value.children[1].children[0].children[1];
            const secondaryColor = value.children[1].children[0].children[1].innerHTML
            secondaryBackground.style.background = color[secondaryColor]
        })
})
})


