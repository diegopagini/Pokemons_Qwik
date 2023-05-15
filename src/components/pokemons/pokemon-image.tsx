/** @format */
import { component$ } from '@builder.io/qwik';

interface Props {
	backImage: boolean;
	id: number;
	size?: number;
}

export const PokemonImage = component$(({ id, size = 200, backImage = false }: Props) => {
	return (
		<img
			alt='Pokemon Sprite'
			height='auto'
			src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
				backImage ? 'back/' : ''
			}${id}.png`}
			width='auto'
			style={{
				width: `${size}px`,
				height: `${size}px`,
			}}
		/>
	);
});
