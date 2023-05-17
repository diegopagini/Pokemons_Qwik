/** @format */
import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';
import { PokemonGameContext } from '~/context';

import styles from './styles.css?inline';

import type { PokemonGameState } from '~/context';

export default component$(() => {
	useStyles$(styles);

	// useStore because whe are using an object.
	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 6,
		isPokemonVisible: true,
		showBackImage: false,
	});

	// useContextProvider to use the Context
	useContextProvider(PokemonGameContext, pokemonGame);

	return (
		<>
			<Navbar />
			<main class='flex flex-col items-center justify-center'>
				<Slot />
			</main>
		</>
	);
});
