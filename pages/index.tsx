import { GetStaticProps, NextPage } from 'next';
import { getPokemonPreviews, type PokemonPreview } from '../utils';
import Head from 'next/head';
import PokemonList from '../components/PokemonList';

interface HomeProps {
    pokemon: PokemonPreview[];
}

const Home: NextPage<HomeProps> = ({ pokemon }) => {
    return (
        <div>
            <Head>
                <title>Pokédex</title>
                <meta name="description" content="" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PokemonList pokemon={pokemon} />
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const pokemon = await getPokemonPreviews(); // Get the first 1-20 pokemon

    return {
        props: {
            pokemon,
        },
    };
};

export default Home;
