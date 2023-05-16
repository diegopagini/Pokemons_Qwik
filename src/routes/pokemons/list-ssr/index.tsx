/** @format */
import { component$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';

import type { BasicPokemon, PokemonListReponse } from '~/interfaces/pokemon-list.response';

export const usePokemonList = routeLoader$<BasicPokemon[]>(async () => {
	const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`);
	const data = (await resp.json()) as PokemonListReponse;
	return data.results;
});

export default component$(() => {
	const pokemonResp = usePokemonList();

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Current offset: xxxx</span>
				<span>Is loading: xxxx</span>
			</div>

			<div class='mt-10'>
				<Link class='btn btn-primary mr-2'>Previous</Link>
				<Link class='btn btn-primary mr-2'>Next</Link>
			</div>

			<div class='grid grid-cols-6 mt-5'>
				{pokemonResp.value.map(({ name }) => (
					<div
						key={name}
						class='m-5 flex flex-col justify-center items-center'
					>
						<span class='capitalize'> {name}</span>
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'SSR List',
	meta: [],
};
