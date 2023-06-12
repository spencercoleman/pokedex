import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Flex, Input } from '@chakra-ui/react';

export default function PokemonSearch() {
    const router = useRouter();
    const [pokemonInput, setPokemonInput] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (pokemonInput.length) {
            router.push(pokemonInput.toLowerCase());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex gap={3}>
                <Input
                    type="text"
                    mb={3}
                    placeholder="Search Pokémon name..."
                    value={pokemonInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPokemonInput(e.target.value)
                    }
                />
                <Button type="submit" colorScheme="red">
                    Search
                </Button>
            </Flex>
        </form>
    );
}
