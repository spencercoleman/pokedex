import { GetServerSideProps, NextPage } from 'next';
import { getPokemon, type Pokemon } from '../utils';
import { ParsedUrlQuery } from 'querystring';
import PokemonEntry from '../components/PokemonEntry';

interface PokemonDetailsProps {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<PokemonDetailsProps> = ({ pokemon }) => {
    return (
        <main>
            <PokemonEntry pokemon={pokemon} />
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

        return {
            props: {
                pokemon: pokemon,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default PokemonPage;
