/** @format */
import { component$ } from '@builder.io/qwik';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	return (
		<>
			<span class='text-5xl'>Hola Mundo</span>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
