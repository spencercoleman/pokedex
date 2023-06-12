import { formatPokemonID, formatText, type Pokemon } from '../utils';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

interface PokedexNavProps {
    prevPokemon: Pokemon | null;
    nextPokemon: Pokemon | null;
}

export default function PokedexNav({
    prevPokemon,
    nextPokemon,
}: PokedexNavProps) {
    return (
        <SimpleGrid columns={2} gap={3} my={3}>
            {prevPokemon ? (
                <NextLink href={`/${prevPokemon.name}`} passHref legacyBehavior>
                    <Button
                        size="lg"
                        px={2}
                        leftIcon={<ChevronLeftIcon boxSize={5} />}
                        justifyContent="flex-start"
                        fontSize="sm"
                        fontWeight="normal"
                        colorScheme="red"
                    >
                        <Text mr={1}>#{formatPokemonID(prevPokemon.id)}</Text>
                        <Text fontWeight="semibold">
                            {formatText(prevPokemon.name)}
                        </Text>
                    </Button>
                </NextLink>
            ) : (
                <Box />
            )}
            {nextPokemon ? (
                <NextLink href={`/${nextPokemon.name}`} passHref legacyBehavior>
                    <Button
                        size="lg"
                        px={2}
                        rightIcon={<ChevronRightIcon boxSize={5} />}
                        justifyContent="flex-end"
                        fontSize="sm"
                        fontWeight="normal"
                        colorScheme="red"
                    >
                        <Text mr={1}>#{formatPokemonID(nextPokemon.id)}</Text>
                        <Text fontWeight="semibold">
                            {formatText(nextPokemon.name)}
                        </Text>
                    </Button>
                </NextLink>
            ) : (
                <Box />
            )}
        </SimpleGrid>
    );
}
