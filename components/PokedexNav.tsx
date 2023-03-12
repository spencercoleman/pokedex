import { formatPokemonID, formatText, type Pokemon } from '../utils';
import { Box, Flex, LinkBox, SimpleGrid, Text } from '@chakra-ui/react';
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
		<SimpleGrid columns={2} py={2}>
			{prevPokemon ? (
				<LinkBox as={NextLink} href={`/${prevPokemon.name}`}>
					<Flex gap={1}>
						<Text color="GrayText" fontSize="sm">
							#{formatPokemonID(prevPokemon.id)}
						</Text>
						<Text fontSize="sm" as="b">
							{formatText(prevPokemon.name)}
						</Text>
					</Flex>
				</LinkBox>
			) : (
				<Box />
			)}
			{nextPokemon ? (
				<LinkBox as={NextLink} href={`/${nextPokemon.name}`}>
					<Flex flexDirection="row-reverse" gap={1}>
						<Text color="GrayText" fontSize="sm">
							#{formatPokemonID(nextPokemon.id)}
						</Text>
						<Text fontSize="sm" as="b">
							{formatText(nextPokemon.name)}
						</Text>
					</Flex>
				</LinkBox>
			) : (
				<Box />
			)}
		</SimpleGrid>
	);
}
