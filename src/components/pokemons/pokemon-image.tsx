/** @format */
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
	backImage: boolean;
	id: number;
	isVisible: boolean;
	size?: number;
}

export const PokemonImage = component$(
	({ id, size = 200, backImage = false, isVisible = false }: Props) => {
		const imageLoaded = useSignal<boolean>(false);

		/** useTask$ for secondary effects */
		useTask$(({ track }) => {
			/** to dispatch an effect when the a given value change */
			track(() => id);
			imageLoaded.value = false;
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
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
						backImage ? 'back/' : ''
					}${id}.png`}
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
