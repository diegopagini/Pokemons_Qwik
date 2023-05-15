/** @format */
import { component$ } from '@builder.io/qwik';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	return <h1>SSR</h1>;
});

export const head: DocumentHead = {
	title: 'SSR List',
	meta: [],
};
