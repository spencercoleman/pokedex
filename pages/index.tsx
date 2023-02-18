import { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { getPokemonPreviews, type PokemonPreview } from '../utils';
import PokemonList from '../components/PokemonList';

interface HomeProps {
    initialPokemon: PokemonPreview[];
}

const Home: NextPage<HomeProps> = ({ initialPokemon }) => {
    const OFFSET_INCREMENT = 20;
    const [offset, setOffset] = useState(OFFSET_INCREMENT + 1); // Add 1 to handle the initial pokemon starting at ID 1
    const [pokemon, setPokemon] = useState(initialPokemon);

    const fetchAdditionalPokemon = async () => {
        const newPokemon = await getPokemonPreviews(offset, OFFSET_INCREMENT);
        setPokemon([...pokemon, ...newPokemon]);
        setOffset(offset + OFFSET_INCREMENT);
    };

    return (
        <div>
            <main>
                <PokemonList pokemon={pokemon} />
                <button onClick={fetchAdditionalPokemon}>Load More</button>
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const initialPokemon = await getPokemonPreviews(); // Get the first 1-20 pokemon

    return {
        props: {
            initialPokemon,
        },
    };
};

export default Home;
