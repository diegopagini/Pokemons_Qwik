/** @format */
import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';

export const usePokemonGame = () => {
	const pokemonGame = useContext(PokemonGameContext);

	const changePokemonId = $((value: number) => {
		if (pokemonGame.pokemonId + value <= 0) return;
		pokemonGame.pokemonId += value;
	});

	const toggleImage = $(() => {
		pokemonGame.showBackImage = !pokemonGame.showBackImage;
	});

	const toggleVisible = $(() => {
		pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
	});

	return {
		isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
		nextPokemon: $(() => changePokemonId(+1)), // Needs to be serialized because the scope is changed by doing (+1)
		pokemonId: useComputed$(() => pokemonGame.pokemonId),
		previousPokemon: $(() => changePokemonId(-1)), // Needs to be serialized because the scope is changed by doing (-1)
		showBackImage: useComputed$(() => pokemonGame.showBackImage),
		toggleImage,
		toggleVisible,
	};
};
