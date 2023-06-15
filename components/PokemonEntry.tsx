import {
    type Pokemon,
    formatText,
    formatPokemonID,
    typeColors,
} from '../utils';
import {
    Box,
    Card,
    CardBody,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Tag,
    Text,
} from '@chakra-ui/react';

interface PokemonEntryProps {
    pokemon: Pokemon;
}

export default function PokemonEntry({ pokemon }: PokemonEntryProps) {
    const getUniqueAbilityNames = () => {
        const pokemonAbilityNames: string[] = [];

        pokemon.abilities.forEach((entry) => {
            const abilityName = entry.ability.name;

            if (!pokemonAbilityNames.includes(abilityName))
                pokemonAbilityNames.push(abilityName);
        });

        return pokemonAbilityNames;
    };

    const uniqueAbilityNames = getUniqueAbilityNames();

    return (
        <SimpleGrid columns={[1, 2]} spacing={3}>
            <Card variant="unstyled">
                <CardBody>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="lg">{formatText(pokemon.name)}</Heading>
                        <Text fontSize="xl" color="GrayText" textAlign="right">
                            #{formatPokemonID(pokemon.id)}
                        </Text>
                    </Flex>

                    <Image
                        src={pokemon.sprite!}
                        alt={pokemon.name}
                        mx="auto"
                        my={5}
                    />

                    <Card variant="filled">
                        <CardBody>
                            <Text>{pokemon.flavorText}</Text>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>

            <Card variant="filled" size="sm">
                <CardBody>
                    <Stack gap={1}>
                        <Box gap={2}>
                            <Text as="b">Height:</Text>
                            <Text>{pokemon.height}</Text>
                        </Box>
                        <Box>
                            <Text as="b">Weight:</Text>
                            <Text>{pokemon.weight}</Text>
                        </Box>
                        <Box>
                            <Text as="b">Abilities:</Text>
                            <Flex gap={2}>
                                {uniqueAbilityNames.map((name, index) => {
                                    return (
                                        <Text key={name}>
                                            {formatText(name)}
                                            {index <
                                            uniqueAbilityNames.length - 1
                                                ? ','
                                                : ''}
                                        </Text>
                                    );
                                })}
                            </Flex>
                        </Box>
                        <Box>
                            <Text as="b">
                                Type{pokemon.types.length > 1 ? 's' : ''}:
                            </Text>
                            <Flex>
                                <SimpleGrid
                                    columns={2}
                                    spacing={2}
                                    marginTop={1}
                                >
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
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </SimpleGrid>
    );
}
