/** @format */
import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';

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

	return <Slot />; /** Slot is like children
   to use it like this:
   <PokemonProvider>
      <div>...</div>
   </PokemonProvider>
  */
});
