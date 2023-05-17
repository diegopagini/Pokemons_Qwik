/** @format */
import { $, component$, useContext } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	/** useContext  */
	const pokemonGame = useContext(PokemonGameContext);

	const nav = useNavigate();

	const changePokemonId = $((value: number) => {
		// Because this function is going to be called in a lazy load way it needs to be serialized with `$()`
		if (pokemonGame.pokemonId + value <= 0) return;
		pokemonGame.pokemonId += value;
	});

	const toggleImage = $(() => {
		pokemonGame.showBackImage = !pokemonGame.showBackImage;
	});

	const goToPokemon = $(() => {
		nav(`/pokemon/${pokemonGame.pokemonId}`);
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-9xl'>{pokemonGame.pokemonId}</span>
			{/** Qwik knows when is a singal and there is no need to `call it` like pokemonId() */}

			<div onClick$={() => goToPokemon()}>
				<PokemonImage
					id={pokemonGame.pokemonId}
					backImage={pokemonGame.showBackImage}
					isVisible={pokemonGame.isPokemonVisible}
				/>
			</div>

			<div class='mr-2'>
				<button
					onClick$={() => changePokemonId(-1)}
					class='btn btn-primary mr-2'
				>
					Anterior
				</button>
				<button
					onClick$={() => changePokemonId(+1)}
					class='btn btn-primary mr-2'
				>
					Siguiente
				</button>

				<button
					onClick$={() => toggleImage()}
					class='btn btn-primary mr-2'
				>
					Voltear
				</button>

				<button
					onClick$={() => (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)}
					class='btn btn-primary'
				>
					Revelar
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
