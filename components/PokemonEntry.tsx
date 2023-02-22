import { type Pokemon, formatText, formatPokemonID } from '../utils';

interface PokemonEntryProps {
    pokemon: Pokemon;
}

export default function PokemonEntry({ pokemon }: PokemonEntryProps) {
    return (
        <div>
            <h1>{formatText(pokemon.name)}</h1>
            <p>#{formatPokemonID(pokemon.id)}</p>
        </div>
    );
}
