import { GetServerSideProps, NextPage } from 'next';
import { getPokemon, POKEMON_MAX, type Pokemon } from '../utils';
import { ParsedUrlQuery } from 'querystring';
import PokedexNav from '../components/PokedexNav';
import PokemonEntry from '../components/PokemonEntry';
import BackButton from '../components/BackButton';
import { Flex, Heading } from '@chakra-ui/react';

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
        <>
            <nav>
                <Flex justify="space-between">
                    <Heading>Pokédex</Heading>
                    <BackButton />
                </Flex>
            </nav>
            <PokedexNav prevPokemon={prevPokemon} nextPokemon={nextPokemon} />
            <main>
                <PokemonEntry pokemon={pokemon} />
            </main>
        </>
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
            pokemon.id + 1 < POKEMON_MAX
                ? await getPokemon(pokemon.id + 1)
                : null;

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
