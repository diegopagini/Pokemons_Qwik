/** @format */

import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
	return (
		<>
			<h3>Dashboard</h3>
			<Slot />
		</>
	);
});
