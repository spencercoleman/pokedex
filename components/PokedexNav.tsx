import { formatPokemonID, formatText, type Pokemon } from '../utils';
import { Box, Card, Flex, LinkBox, SimpleGrid, Text } from '@chakra-ui/react';
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
                <LinkBox as={NextLink} href={`/${prevPokemon.name}`}>
                    <Card variant="filled" py={3} px={1}>
                        <Flex gap={1} alignItems="center">
                            <ChevronLeftIcon boxSize={6} />
                            <Text color="GrayText" fontSize="sm">
                                #{formatPokemonID(prevPokemon.id)}
                            </Text>
                            <Text fontSize="sm" as="b">
                                {formatText(prevPokemon.name)}
                            </Text>
                        </Flex>
                    </Card>
                </LinkBox>
            ) : (
                <Box />
            )}
            {nextPokemon ? (
                <LinkBox as={NextLink} href={`/${nextPokemon.name}`}>
                    <Card variant="filled" py={3} px={1}>
                        <Flex
                            flexDirection="row-reverse"
                            gap={1}
                            alignItems="center"
                        >
                            <ChevronRightIcon boxSize={6} />
                            <Text color="GrayText" fontSize="sm">
                                #{formatPokemonID(nextPokemon.id)}
                            </Text>
                            <Text fontSize="sm" as="b">
                                {formatText(nextPokemon.name)}
                            </Text>
                        </Flex>
                    </Card>
                </LinkBox>
            ) : (
                <Box />
            )}
        </SimpleGrid>
    );
}
