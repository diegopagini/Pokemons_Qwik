/** @format */
import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

import type { Signal } from '@builder.io/qwik';
/**
 * routeLoader$ is going to be executed from the server side. Is used to prevent navigation with incorrect params.
 */
export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);
	if (isNaN(id)) redirect(301, '/');
	if (id <= 0 || id > 1000) redirect(301, '/');

	return id;
});

export default component$(() => {
	const pokemonId: Signal<number> = usePokemonId();

	const pokemonGame = useContext(PokemonGameContext);

	return (
		<>
			<span class='text-5xl'>Pokemon: {pokemonId}</span>
			<PokemonImage
				id={pokemonId.value}
				isVisible={pokemonGame.isPokemonVisible}
				backImage={pokemonGame.showBackImage}
			/>
		</>
	);
});
