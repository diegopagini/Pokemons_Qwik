/** @format */
import { component$, useStore } from '@builder.io/qwik';

import type { SmallPokemon } from '~/interfaces';
import type { DocumentHead } from '@builder.io/qwik-city';

interface PokemonState {
	currentPage: number;
	pokemons: SmallPokemon[];
}

export default component$(() => {
	const pokemonState = useStore<PokemonState>({
		currentPage: 0,
		pokemons: [],
	});

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Current page: {pokemonState.currentPage}</span>
				<span>Is loading: </span>
			</div>

			<div class='mt-10'>
				<button
					onClick$={() => pokemonState.currentPage--}
					class='btn btn-primary mr-2'
				>
					Previous
				</button>
				<button
					onClick$={() => pokemonState.currentPage++}
					class='btn btn-primary mr-2'
				>
					Next
				</button>
			</div>

			<div class='grid grid-cols-6 mt-5'>
				{
					// pokemonState.pokemons.map(({ name, id }) => (
					// <div
					// 	key={id}
					// 	class='m-5 flex flex-col justify-center items-center'
					// >
					// 	<span class='capitalize'> {name}</span>
					// 	<PokemonImage id={+id} />
					// </div>
					// ))
				}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Client List',
	meta: [],
};
