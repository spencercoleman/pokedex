import { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { getPokemon } from '../utils';
import Head from 'next/head';

export default function Home({
	initialPokemon,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const OFFSET_INCREMENT = 20;
	const [offset, setOffset] = useState(OFFSET_INCREMENT + 1); // Add 1 to handle the initial pokemon starting at ID 1
	const [pokemon, setPokemon] = useState(initialPokemon);

	const handleFetchPokemon = async () => {
		const newPokemon = await getPokemon(offset, OFFSET_INCREMENT);
		setPokemon([...pokemon, ...newPokemon]);
		setOffset(offset + OFFSET_INCREMENT);
	};

	return (
		<>
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
				<div></div>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const initialPokemon = await getPokemon(); // Get the first 1-20 pokemon

	return {
		props: {
			initialPokemon,
		},
	};
}
