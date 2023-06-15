import {
    MainClient,
    PokemonAbility,
    PokemonSpecies,
    PokemonStat,
} from 'pokenode-ts';

export const POKEMON_MAX = 1011; // Highest ID to fetch
const DEFAULT_LIMIT = 48; // Limit results to 48 per page

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

export async function getPokemon(
    identifier: string | number
): Promise<Pokemon> {
    let pokemonSpeciesData;

    if (typeof identifier === 'string') {
        pokemonSpeciesData = await client.pokemon.getPokemonSpeciesByName(
            identifier
        );
    } else {
        pokemonSpeciesData = await client.pokemon.getPokemonSpeciesById(
            identifier
        );
    }

    const pokemonData = await client.pokemon.getPokemonById(
        pokemonSpeciesData.id
    );

    return {
        abilities: pokemonData.abilities,
        flavorText: pokemonSpeciesData.flavor_text_entries
            .filter((entry) => entry.language.name === 'en')[0]
            .flavor_text.split('')
            .join(' '),
        height: pokemonData.height,
        id: pokemonSpeciesData.id,
        name: pokemonSpeciesData.name,
        sprite: pokemonData.sprites.front_default,
        stats: pokemonData.stats,
        types: pokemonData.types.map((typeData) => typeData.type.name),
        weight: pokemonData.weight,
    };
}
