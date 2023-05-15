<!-- @format -->

# Qwik City App ⚡️

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

## DocumentHead

```tsx
/**
 * Meta tags for each page.
 */
export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
```

## index.tsx

```tsx
/** @format */
import { $, component$, useSignal } from '@builder.io/qwik';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	const pokemonId = useSignal<number>(1); // For primitives: booleans, strings, numbers, etc... For objects or arrays `useStore()`
	const showBackImage = useSignal<boolean>(false);

	const changePokemonId = $((value: number) => {
		// Because this function is going to be called in a lazy load way it needs to be serialized with `$()`
		if (pokemonId.value + value <= 0) return;
		pokemonId.value += value;
	});

	const toggleImage = $(() => {
		showBackImage.value = !showBackImage.value;
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-9xl'>{pokemonId}</span>
			{/** Qwik knows when is a singal and there is no need to `call it` like pokemonId() */}

			<PokemonImage
				id={pokemonId.value}
				backImage={showBackImage.value}
			/>

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
					class='btn btn-primary'
				>
					Voltear
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
```

## pokemon-image.tsx

```tsx
/** @format */
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
	backImage: boolean;
	id: number;
	size?: number;
}

export const PokemonImage = component$(({ id, size = 200, backImage = false }: Props) => {
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
				class={{
					hidden: !imageLoaded.value,
				}}
			/>
		</div>
	);
});
```

## Routes

[https://qwik.builder.io/docs/advanced/routing/]

```
routes/
	└── pokemons/
			└──list-client
	    		└──index.tsx
			└──list-ssr
					└──index.tsx
	└── pokemon/
			└──[id] /** dynamic route */
					└──index.tsx
```

## Link

```tsx
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import { QwikLogo } from '../../icons/qwik';
import styles from './navbar.module.css';

export default component$(() => {
	return (
		<header class={styles.header}>
			<div class={['container', styles.wrapper]}>
				<div class={styles.logo}>
					<Link href='/'>
						<QwikLogo height={50} />
					</Link>
				</div>

				<ul>
					<li>
						<Link href='/pokemons/list-ssr/'>SSR-List</Link>
					</li>
					<li>
						<Link href='/pokemons/list-client/'>Client-List</Link>
					</li>
				</ul>
			</div>
		</header>
	);
});
```

### Link

```tsx
<Link href={`/pokemons/${pokemonId.value}/`}>
	<PokemonImage
		id={pokemonId.value}
		backImage={showBackImage.value}
		isVisible={isVisible.value}
	/>
</Link>
```

### useNavigate

```tsx
const nav = useNavigate();
const goToPokemon = $(() => {
	nav(`/pokemons/${pokemonId.value}`);
});

<div onClick$={() => goToPokemon()}>
	<PokemonImage
		id={pokemonId.value}
		backImage={showBackImage.value}
		isVisible={isVisible.value}
	/>
</div>;
```

### useLocation

```tsx
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
```
