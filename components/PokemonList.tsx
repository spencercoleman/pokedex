import {
    type PokemonPreview,
    formatPokemonID,
    formatText,
    typeColors,
} from '../utils';
import {
    Card,
    CardBody,
    CardFooter,
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
        <SimpleGrid columns={[2, 3, 4]} spacing={2}>
            {pokemon.map((pokemon) => (
                <LinkBox
                    as={NextLink}
                    href={`/${pokemon.name}`}
                    key={pokemon.id}
                >
                    <Card variant="filled" size="sm">
                        <CardBody>
                            <Image
                                src={pokemon.sprite!}
                                alt={pokemon.name}
                                mx="auto"
                            />
                            <Stack spacing={2}>
                                <Text>#{formatPokemonID(pokemon.id)}</Text>
                                <Heading size="sm">
                                    {formatText(pokemon.name)}
                                </Heading>
                            </Stack>
                        </CardBody>
                        <CardFooter>
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
                        </CardFooter>
                    </Card>
                </LinkBox>
            ))}
        </SimpleGrid>
    );
}
