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

### routeLoader

```tsx
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
	const pokemonId = usePokemonId();

	return (
		<>
			<span class='text-5xl'>Pokemon: {pokemonId}</span>
			<PokemonImage id={pokemonId.value} />
		</>
	);
});
```

### routerLoader with query

```tsx
/** @format */
import { component$, useComputed$ } from '@builder.io/qwik';
import { DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';

import type { BasicPokemon, PokemonListReponse } from '~/interfaces/pokemon-list.response';

export const usePokemonList = routeLoader$<BasicPokemon[]>(
	async ({ query, redirect, pathname }) => {
		/**
		 * `redirect` is a function inside the event used to redirect.
		 * `pathName` is the current location
		 */
		const offset = Number(query.get('offset') || '0');
		if (offset < 0 || isNaN(offset)) redirect(301, pathname);

		const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
		const data = (await resp.json()) as PokemonListReponse;
		return data.results;
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
```

### useVisibleTask$ [https://qwik.builder.io/docs/components/tasks/#usevisibletask]

```tsx
export default component$(() => {
	const pokemonState = useStore<PokemonState>({
		currentPage: 0,
		pokemons: [],
	});

	// Only runs in the client.
	useVisibleTask$(async ({ track }) => {
		// This is executed when the component is created.
		const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
		pokemonState.pokemons = pokemons;

		// With `track` useVisibleTask is going to be called each time the given parameter (pokemonState.currentPage) change
		track(() => pokemonState.currentPage);
	});

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Current page: {pokemonState.currentPage}</span>
				<span>Is loading: </span>
			</div>

			<div class='mt-10'>
				<button
					onClick$={() => pokemonState.currentPage--}
					class='btn btn-primary mr-2'
				>
					Previous
				</button>
				<button
					onClick$={() => pokemonState.currentPage++}
					class='btn btn-primary mr-2'
				>
					Next
				</button>
			</div>

			<div class='grid grid-cols-6 mt-5'>
				{pokemonState.pokemons.map(({ name, id }) => (
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
```

### useTask$ [https://qwik.builder.io/docs/components/tasks/#usetask]

```tsx
// This runs in the server and in the client.
useTask$(async ({ track }) => {
	// This is executed when the component is created.
	const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
	pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

	// With `track` useVisibleTask is going to be called each time the given parameter (pokemonState.currentPage) change
	track(() => pokemonState.currentPage);
});
```

### infiniteScroll with useOnDocument

```tsx
const pokemonState = useStore<PokemonState>({
	currentPage: 0,
	isLoading: false,
	pokemons: [],
});

// This runs in the server and in the client.
useTask$(async ({ track }) => {
	// This is executed when the component is created.
	const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
	pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
	pokemonState.isLoading = false;

	// With `track` useVisibleTask is going to be called each time the given parameter (pokemonState.currentPage) change
	track(() => pokemonState.currentPage);
});

// To create listenners
useOnDocument(
	'scroll',
	$(() => {
		const maxScroll = document.body.scrollHeight;
		const currentScroll = window.scrollY + window.innerHeight;

		if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
			pokemonState.isLoading = true;
			pokemonState.currentPage++;
		}
	})
);
```

## ContextApi [https://qwik.builder.io/docs/components/context/#context]

### context

```tsx
/** @format */
import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
	pokemonId: number;
	showBackImage: boolean;
	isPokemonVisible: boolean;
}

// The given ID must be unique in the entire application.
export const PokemonGameContext = createContextId<PokemonGameState>('pokmeon.game-context');
```

### layout.tsx

```tsx
export default component$(() => {
	useStyles$(styles);

	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 4,
		isPokemonVisible: true,
		showBackImage: false,
	});

	useContextProvider(PokemonGameContext, pokemonGame);

	return (
		<>
			<Navbar />
			<main class='flex flex-col items-center justify-center'>
				<Slot />
			</main>
		</>
	);
});
```

### useContext

```tsx
export default component$(() => {
	/** useContext  */
	const pokemonGame = useContext(PokemonGameContext);

	const nav = useNavigate();

	const changePokemonId = $((value: number) => {
		// Because this function is going to be called in a lazy load way it needs to be serialized with `$()`
		if (pokemonGame.pokemonId + value <= 0) return;
		pokemonGame.pokemonId += value;
	});

	const toggleImage = $(() => {
		pokemonGame.showBackImage = !pokemonGame.showBackImage;
	});

	const goToPokemon = $(() => {
		nav(`/pokemon/${pokemonGame.pokemonId}`);
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-9xl'>{pokemonGame.pokemonId}</span>
			{/** Qwik knows when is a singal and there is no need to `call it` like pokemonId() */}

			<div onClick$={() => goToPokemon()}>
				<PokemonImage
					id={pokemonGame.pokemonId}
					backImage={pokemonGame.showBackImage}
					isVisible={pokemonGame.isPokemonVisible}
				/>
			</div>

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
					class='btn btn-primary mr-2'
				>
					Voltear
				</button>

				<button
					onClick$={() => (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)}
					class='btn btn-primary'
				>
					Revelar
				</button>
			</div>
		</>
	);
});
```

### Provider

```tsx
export const PokemonProvider = component$(() => {
	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 6,
		isPokemonVisible: true,
		showBackImage: false,
	});

	const pokemonList = useStore<PokemonListState>({
		currentPage: 1,
		isLoading: false,
		pokemons: [],
	});

	useContextProvider(PokemonGameContext, pokemonGame);
	useContextProvider(PokemonListContext, pokemonList);

	return <Slot />; /** Slot is like children
   to use it like this:
   <PokemonProvider>
      <div>...</div>
   </PokemonProvider>
  */
});
```
