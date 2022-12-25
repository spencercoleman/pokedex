type PokemonBasic = {
	id: number;
	name: string;
	sprite: string;
	types: string[];
};

interface PokemonListProps {
	pokemon: PokemonBasic[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
	return (
		<ul>
			{pokemon.map((pokemon) => (
				<li key={pokemon.id}>{pokemon.name}</li>
			))}
		</ul>
	);
}
