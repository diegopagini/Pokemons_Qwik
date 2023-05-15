<!-- @format -->

# Qwik City App ⚡️

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations and deployment

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations include: Cloudflare, Netlify or Express server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). During development, the `dev` command will server-side render (SSR) the output.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to locally preview a production build, and it should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. Additionally, the build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```

---

# Aplication

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
