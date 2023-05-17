/** @format */
import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';
import { PokemonGameContext, PokemonListContext } from '~/context';

import styles from './styles.css?inline';

import type { PokemonGameState } from '~/context';
import type { PokemonListState } from '../context/pokemon/pokemon-list.context';

export default component$(() => {
	useStyles$(styles);

	// useStore because whe are using an object.
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

	// useContextProvider to use the Context
	useContextProvider(PokemonGameContext, pokemonGame);
	useContextProvider(PokemonListContext, pokemonList);

	return (
		<>
			<Navbar />
			<main class='flex flex-col items-center justify-center'>
				<Slot />
			</main>
		</>
	);
});
