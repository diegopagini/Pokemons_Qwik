/** @format */
import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers';

import type { DocumentHead } from '@builder.io/qwik-city';
import type { SmallPokemon } from '~/interfaces';
export const usePokemonList = routeLoader$<SmallPokemon[]>(
	async ({ query, redirect, pathname }) => {
		/**
		 * `redirect` is a function inside the event used to redirect.
		 * `pathName` is the current location
		 */
		const offset = Number(query.get('offset') || '0');
		if (offset < 0 || isNaN(offset)) redirect(301, pathname);

		return await getSmallPokemons(offset);
	}
);

export default component$(() => {
	const pokemonResp = usePokemonList();
	const location = useLocation();

	const currentOffset = useComputed$<number>(() => {
		const offsetString = new URLSearchParams(location.url.search);
		return Number(offsetString.get('offset') || 0);
	});

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Offset: {currentOffset}</span>
				<span>Is loading: {location.isNavigating ? 'Yes' : 'No'}</span>{' '}
				{/** location.isNavigating to show spinners */}
			</div>

			<div class='mt-10'>
				<Link
					href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
					class='btn btn-primary mr-2'
				>
					Previous
				</Link>
				<Link
					href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
					class='btn btn-primary mr-2'
				>
					Next
				</Link>
			</div>

			<div class='grid grid-cols-6 mt-5'>
				{pokemonResp.value.map(({ name, id }) => (
					<div
						key={id}
						class='m-5 flex flex-col justify-center items-center'
					>
						<span class='capitalize'> {name}</span>
						<PokemonImage id={+id} />
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
