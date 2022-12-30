import { type PokemonPreview } from '../utils';

interface PokemonListProps {
    pokemon: PokemonPreview[];
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
