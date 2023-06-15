import { useState, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { getPokemonPreviews, type PokemonPreview } from '../utils';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import PokemonSearch from '../components/PokemonSearch';
import PokemonList from '../components/PokemonList';

interface HomeProps {
    initialPokemon: PokemonPreview[];
}

const Home: NextPage<HomeProps> = ({ initialPokemon }) => {
    const OFFSET_INCREMENT = 48;
    const [offset, setOffset] = useState(OFFSET_INCREMENT + 1); // Add 1 to handle the initial pokemon starting at ID 1
    const [pokemon, setPokemon] = useState(initialPokemon);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAdditionalPokemon = async () => {
        setIsLoading(true);

        const newPokemon = await getPokemonPreviews(offset, OFFSET_INCREMENT);

        setPokemon([...pokemon, ...newPokemon]);
        setOffset(offset + OFFSET_INCREMENT);
        setIsLoading(false);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoading
        ) {
            return;
        }

        fetchAdditionalPokemon();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    return (
        <div>
            <header>
                <Heading mb={3}>Pokédex</Heading>
            </header>
            <main>
                <PokemonSearch />
                <PokemonList pokemon={pokemon} />

                {isLoading && (
                    <Flex justifyContent="center" pt={3}>
                        <Spinner color="red.500" />
                    </Flex>
                )}
            </main>
        </div>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const initialPokemon = await getPokemonPreviews(1, 48); // Get the first 1-20 pokemon

    return {
        props: {
            initialPokemon,
        },
    };
};

export default Home;
