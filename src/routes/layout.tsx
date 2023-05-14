/** @format */
import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Footer from '~/components/starter/footer/footer';
import Header from '~/components/starter/header/header';

import styles from './styles.css?inline';

export const useServerTimeLoader = routeLoader$(() => {
	return {
		date: new Date().toISOString(),
	};
});

export default component$(() => {
	useStyles$(styles);
	return (
		<>
			<Header />
			<main>
				<Slot />
			</main>
			<Footer />
		</>
	);
});
