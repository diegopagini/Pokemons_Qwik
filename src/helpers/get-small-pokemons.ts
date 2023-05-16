/** @format */
import type { PokemonListReponse, SmallPokemon } from '~/interfaces';

/**
 *
 * @param {number} offset
 * @param {number} limit
 * @returns `Promise<SmallPokemon[]>`
 */
export const getSmallPokemons = async (
	offset: number = 0,
	limit: number = 10
): Promise<SmallPokemon[]> => {
	const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
	const data = (await resp.json()) as PokemonListReponse;

	return data.results.map(({ url, name }) => {
		const segments = url.split('/');
		const id = segments.at(-2)!;

		return {
			id,
			name,
		};
	});
};
