/** @format */
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
	const location = useLocation();
	const { id } = location.params;

	return (
		<>
			<span class='text-5xl'>Pokemon: {id}</span>
			<PokemonImage id={+id} />
		</>
	);
});
