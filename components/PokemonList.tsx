import {
    type PokemonPreview,
    formatPokemonID,
    formatText,
    typeColors,
} from '../utils';
import {
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    Image,
    LinkBox,
    SimpleGrid,
    Stack,
    Tag,
    Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface PokemonListProps {
    pokemon: PokemonPreview[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
    return (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
            {pokemon.map((pokemon) => (
                <LinkBox
                    as={NextLink}
                    href={`/${pokemon.name}`}
                    key={pokemon.id}
                >
                    <Card variant="filled" size="sm">
                        <CardBody>
                            <Flex justifyContent="space-between">
                                <Heading size="sm">
                                    {formatText(pokemon.name)}
                                </Heading>
                                <Text
                                    fontSize="xs"
                                    color="GrayText"
                                    textAlign="right"
                                >
                                    #{formatPokemonID(pokemon.id)}
                                </Text>
                            </Flex>

                            <Image
                                src={pokemon.sprite!}
                                alt={pokemon.name}
                                mx="auto"
                            />
                            <Flex>
                                <SimpleGrid columns={2} spacing={2}>
                                    {pokemon.types.map((type) => (
                                        <Tag
                                            key={type}
                                            bgColor={typeColors[type]}
                                            size="sm"
                                        >
                                            {formatText(type)}
                                        </Tag>
                                    ))}
                                </SimpleGrid>
                            </Flex>
                        </CardBody>
                    </Card>
                </LinkBox>
            ))}
        </SimpleGrid>
    );
}
