/** @format */
import { component$, Slot, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { PokemonGameContext, PokemonListContext } from '..';

import type { PokemonGameState, PokemonListState } from '..';

export const PokemonProvider = component$(() => {
	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 6,
		isPokemonVisible: true,
		showBackImage: false,
	});

	const pokemonList = useStore<PokemonListState>({
		currentPage: 1,
		isLoading: false,
		pokemons: [],
	});

	useContextProvider(PokemonGameContext, pokemonGame);
	useContextProvider(PokemonListContext, pokemonList);

	/** useVisibleTask To run tasks only on the client side */
	useVisibleTask$(() => {
		// Without any "track" this is going to be called only one time.
		if (localStorage.getItem('pokemon-game')) {
			const {
				isPokemonVisible = true,
				pokemonId = 6,
				showBackImage = false,
			} = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

			pokemonGame.isPokemonVisible = isPokemonVisible;
			pokemonGame.pokemonId = pokemonId;
			pokemonGame.showBackImage = showBackImage;
		}
	});

	useVisibleTask$(({ track }) => {
		// To track every property in the pokemonGame storage.
		track(() => [pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);

		localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
	});

	return <Slot />;
	/** Slot is like children
	 * to use it like this:
	 * <PokemonProvider>
	 *    <div>...</div>
	 * </PokemonProvider>
	 */
});
