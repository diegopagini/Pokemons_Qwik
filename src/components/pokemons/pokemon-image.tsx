/** @format */
import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
	backImage?: boolean;
	id: string;
	isVisible?: boolean;
	size?: number;
}

export const PokemonImage = component$(
	({ id, size = 200, backImage = false, isVisible = true }: Props) => {
		const imageLoaded = useSignal<boolean>(false);

		/** useTask$ for secondary effects */
		useTask$(({ track }) => {
			/** to dispatch an effect when the a given value change */
			track(() => id);
			imageLoaded.value = false;
		});

		const imageUrl = useComputed$(() => {
			if (id === '') return '';

			return backImage
				? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
				: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
		});

		return (
			<div
				class='flex items-center justify-center'
				style={{
					width: `${size}px`,
					height: `${size}px`,
				}}
			>
				{/** To show the loading message */}
				{!imageLoaded.value && <span>Cargando...</span>}

				<img
					alt='Pokemon Sprite'
					src={imageUrl.value}
					height=''
					width=''
					style={{
						width: `${size}px`,
						height: `${size}px`,
					}}
					onLoad$={() => (imageLoaded.value = true)}
					class={[
						{
							hidden: !imageLoaded.value,
							'brightness-0': !isVisible,
						},
						'transition-all',
					]}
				/>
			</div>
		);
	}
);
