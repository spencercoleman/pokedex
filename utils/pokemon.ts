import { Pokemon, PokemonClient } from 'pokenode-ts';

const POKEMON_MAX = 906; // Higher ID to fetch
const DEFAULT_LIMIT = 20; // Limit results to 20 per page

const client = new PokemonClient();

type PokemonBasic = {
	id: number;
	name: string;
	sprite: string | null;
	types: string[];
};

export async function getPokemon(
	offset: number = 1,
	limit: number = DEFAULT_LIMIT
): Promise<PokemonBasic[]> {
	const pokemonPromises: Promise<Pokemon>[] = [];

	for (let i = offset; i < Math.min(offset + limit, POKEMON_MAX); i++) {
		pokemonPromises.push(client.getPokemonById(i));
	}

	const pokemonData = await Promise.all(pokemonPromises);

	const pokemon = pokemonData.map((pokemon) => ({
		id: pokemon.id,
		name: pokemon.name,
		sprite: pokemon.sprites.front_default,
		types: pokemon.types.map((typeData) => typeData.type.name),
	}));

	return pokemon;
}

export async function getPokemonByName(
	name: string
): Promise<Pokemon | undefined> {
	const pokemonData = await client.getPokemonByName(name);
	return pokemonData;
}
