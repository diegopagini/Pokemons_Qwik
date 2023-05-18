/** @format */
import { $, component$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	const {
		isPokemonVisible,
		nextPokemon,
		pokemonId,
		previousPokemon,
		showBackImage,
		toggleImage,
		toggleVisible,
	} = usePokemonGame();

	const nav = useNavigate();

	const goToPokemon = $((id: number) => {
		nav(`/pokemon/${id}`);
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-9xl'>{pokemonId.value}</span>

			<div onClick$={() => goToPokemon(pokemonId.value)}>
				<PokemonImage
					id={pokemonId.value}
					backImage={showBackImage.value}
					isVisible={isPokemonVisible.value}
				/>
			</div>

			<div class='mr-2'>
				<button
					onClick$={previousPokemon}
					class='btn btn-primary mr-2'
				>
					Anterior
				</button>
				<button
					onClick$={nextPokemon}
					class='btn btn-primary mr-2'
				>
					Siguiente
				</button>

				<button
					onClick$={toggleImage}
					class='btn btn-primary mr-2'
				>
					Voltear
				</button>

				<button
					onClick$={toggleVisible}
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
