/** @format */
import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
	return (
		<>
			<h3>Auth</h3>
			<Slot />
		</>
	);
});
