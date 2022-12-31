import { PokemonClient, PokemonSpecies } from 'pokenode-ts';

const POKEMON_MAX = 905; // Highest ID to fetch
const DEFAULT_LIMIT = 20; // Limit results to 20 per page

const client = new PokemonClient();

export type PokemonPreview = {
    id: number;
    name: string;
    sprite: string | null;
    types: string[];
};

export async function getPokemonPreviews(
    offset: number = 1,
    limit: number = DEFAULT_LIMIT
): Promise<PokemonPreview[]> {
    const pokemonSpeciesPromises: Promise<PokemonSpecies>[] = [];

    for (let i = offset; i < Math.min(offset + limit, POKEMON_MAX); i++) {
        pokemonSpeciesPromises.push(client.getPokemonSpeciesById(i));
    }

    const pokemonSpeciesData = await Promise.all(pokemonSpeciesPromises);

    const pokemonDataPromises = pokemonSpeciesData.map(
        async (pokemonSpecies) => {
            const pokemon = await client.getPokemonById(pokemonSpecies.id);

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

export async function getPokemonByName(name: string): Promise<PokemonSpecies> {
    const pokemonData = await client.getPokemonSpeciesByName(name);
    return pokemonData;
}
