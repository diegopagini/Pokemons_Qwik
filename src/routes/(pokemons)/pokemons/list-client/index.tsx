/** @format */
import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	const pokemonState = useContext(PokemonListContext);

	// This runs in the server and in the client.
	useTask$(async ({ track }) => {
		// This is executed when the component is created.
		const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
		pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
		pokemonState.isLoading = false;

		// With `track` useVisibleTask is going to be called each time the given parameter (pokemonState.currentPage) change
		track(() => pokemonState.currentPage);
	});

	// To create listenners
	useOnDocument(
		'scroll',
		$(() => {
			const maxScroll = document.body.scrollHeight;
			const currentScroll = window.scrollY + window.innerHeight;

			if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
				pokemonState.isLoading = true;
				pokemonState.currentPage++;
			}
		})
	);

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Current page: {pokemonState.currentPage}</span>
				<span>Is loading: {pokemonState.isLoading ? 'Yes' : 'No'}</span>
			</div>

			<div class='mt-10'>
				<button
					onClick$={() => pokemonState.currentPage++}
					class='btn btn-primary mr-2'
				>
					Next
				</button>
			</div>

			<div class='grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5'>
				{pokemonState.pokemons.map(({ name, id }) => (
					<div
						key={id}
						class='m-5 flex flex-col justify-center items-center'
					>
						<span class='capitalize'> {name}</span>
						<PokemonImage id={id} />
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Client List',
	meta: [],
};
