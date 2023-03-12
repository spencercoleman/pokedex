import { GetServerSideProps, NextPage } from 'next';
import { getPokemon, type Pokemon } from '../utils';
import { ParsedUrlQuery } from 'querystring';
import PokedexNav from '../components/PokedexNav';
import PokemonEntry from '../components/PokemonEntry';

interface PokemonDetailsProps {
	pokemon: Pokemon;
	prevPokemon: Pokemon | null;
	nextPokemon: Pokemon | null;
}

const PokemonPage: NextPage<PokemonDetailsProps> = ({
	pokemon,
	prevPokemon,
	nextPokemon,
}) => {
	return (
		<main>
			<PokemonEntry pokemon={pokemon} />
			<PokedexNav prevPokemon={prevPokemon} nextPokemon={nextPokemon} />
		</main>
	);
};

interface Params extends ParsedUrlQuery {
	pokemon: string;
}

export const getServerSideProps: GetServerSideProps<
	PokemonDetailsProps,
	Params
> = async ({ params }) => {
	try {
		const pokemon = await getPokemon(params!.pokemon);
		const prevPokemon =
			pokemon.id - 1 > 0 ? await getPokemon(pokemon.id - 1) : null;
		const nextPokemon =
			pokemon.id + 1 < 905 ? await getPokemon(pokemon.id + 1) : null;

		return {
			props: {
				pokemon,
				prevPokemon: prevPokemon,
				nextPokemon: nextPokemon,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default PokemonPage;
