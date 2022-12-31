import {
    MainClient,
    PokemonAbility,
    PokemonSpecies,
    PokemonStat,
} from 'pokenode-ts';

const POKEMON_MAX = 905; // Highest ID to fetch
const DEFAULT_LIMIT = 20; // Limit results to 20 per page

const client = new MainClient();

export interface PokemonPreview {
    id: number;
    name: string;
    sprite: string | null;
    types: string[];
}

export interface Pokemon extends PokemonPreview {
    abilities: PokemonAbility[];
    flavorText: string;
    height: number;
    stats: PokemonStat[];
    weight: number;
}

export async function getPokemonPreviews(
    offset: number = 1,
    limit: number = DEFAULT_LIMIT
): Promise<PokemonPreview[]> {
    const pokemonSpeciesPromises: Promise<PokemonSpecies>[] = [];

    for (let i = offset; i < Math.min(offset + limit, POKEMON_MAX); i++) {
        pokemonSpeciesPromises.push(client.pokemon.getPokemonSpeciesById(i));
    }

    const pokemonSpeciesData = await Promise.all(pokemonSpeciesPromises);

    const pokemonDataPromises = pokemonSpeciesData.map(
        async (pokemonSpecies) => {
            const pokemon = await client.pokemon.getPokemonById(
                pokemonSpecies.id
            );

            return {
                id: pokemonSpecies.id,
                name: pokemonSpecies.name,
                sprite: pokemon.sprites.front_default,
                types: pokemon.types.map((typeData) => typeData.type.name),
            };
        }
    );

    const pokemonPreviews = await Promise.all(pokemonDataPromises);

    return pokemonPreviews;
}

export async function getPokemon(name: string): Promise<Pokemon> {
    const pokemonSpeciesData = await client.pokemon.getPokemonSpeciesByName(
        name
    );
    const pokemonData = await client.pokemon.getPokemonById(
        pokemonSpeciesData.id
    );

    return {
        abilities: pokemonData.abilities,
        flavorText: pokemonSpeciesData.flavor_text_entries[6].flavor_text,
        height: pokemonData.height,
        id: pokemonSpeciesData.id,
        name: pokemonSpeciesData.name,
        sprite: pokemonData.sprites.front_default,
        stats: pokemonData.stats,
        types: pokemonData.types.map((typeData) => typeData.type.name),
        weight: pokemonData.weight,
    };
}
