/** @format */
import { $, component$, useSignal } from '@builder.io/qwik';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	const pokemonId = useSignal<number>(1); // For primitives: booleans, strings, numbers, etc... For objects or arrays `useStore()`

	const changePokemonId = $((value: number) => {
		// Because this function is going to be called in a lazy load way it needs to be serialized with `$()`
		if (pokemonId.value + value <= 0) return;

		pokemonId.value += value;
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-9xl'>{pokemonId}</span>
			{/** Qwik knows when is a singal and there is no need to `call it` like pokemonId() */}

			<img
				alt='Pokemon Sprite'
				height='200px'
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`} /** When the value
				of the signal is needed to use it in a string, we must use the value */
				width='200px'
			/>

			<div class='mr-2'>
				<button
					onClick$={() => changePokemonId(-1)}
					class='btn btn-primary mr-2'
				>
					Anterior
				</button>
				<button
					onClick$={() => changePokemonId(+1)}
					class='btn btn-primary'
				>
					Siguiente
				</button>
			</div>
		</>
	);
});

/**
 * Meta tags for each page.
 */
export const head: DocumentHead = {
	title: 'PokeQwik',
	meta: [
		{
			name: 'description',
			content: 'My first page made with Qwik',
		},
	],
};
