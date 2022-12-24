import { Pokemon, PokemonClient } from 'pokenode-ts';

const client = new PokemonClient();
const POKEMON_LIMIT = 20;

export async function getPokemon(
	offset: number = 1,
	limit: number = POKEMON_LIMIT
) {
	const pokemonPromises: Promise<Pokemon>[] = [];

	for (let i = offset; i < offset + limit; i++) {
		pokemonPromises.push(client.getPokemonById(i));
	}

	const pokemonData = await Promise.all(pokemonPromises);
	return pokemonData;
}
