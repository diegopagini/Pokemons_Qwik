/** @format */
import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
	return (
		<div class='flex flex-col justify-center items-center mt-10'>
			<Slot />
			<Link
				class='mt-10'
				href='/'
			>
				Home
			</Link>
		</div>
	);
});
