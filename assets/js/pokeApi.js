const PokeAPI = {}

function pokemonSecondaryType(detalhesPokemon) {
    try {
        return detalhesPokemon.types[1].type.name
    }
    catch {
        return "N/A"
    }
}

function convertDetailsApiToPokemon(detalhesPokemon) {
    const pokemon = new Pokemon()

    pokemon.pokemonNumber = detalhesPokemon.id;
    pokemon.name = detalhesPokemon.name;
    pokemon.primaryType = detalhesPokemon.types[0].type.name;
    pokemon.secondaryType = pokemonSecondaryType(detalhesPokemon)
    pokemon.photo = detalhesPokemon.sprites.other.dream_world.front_default;

    return pokemon
}

PokeAPI.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertDetailsApiToPokemon)
}

PokeAPI.getPokemons = (offset = 0, limit = 20) => {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => pokemons.map(PokeAPI.getPokemonDetail))
        .then(requestAtributes => Promise.all(requestAtributes))
        .then(pokemonAtributes => pokemonAtributes)
}
