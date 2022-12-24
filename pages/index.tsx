import { InferGetStaticPropsType } from 'next';
import { getPokemon } from '../utils';
import Head from 'next/head';

export default function Home({
	pokemon,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
	const pokemon = await getPokemon();

	return {
		props: {
			pokemon,
		},
	};
}
