/** @format */
import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {
	useStylesScoped$(styles);

	const formState = useStore({
		email: '',
		password: '',
		formPosted: false,
	});

	const emailError = useComputed$(() => {
		if (formState.email.includes('@')) return '';
		return 'not-valid';
	});

	const passwordError = useComputed$(() => {
		if (formState.password.length >= 6) return '';
		return 'not-valid';
	});

	const isFormValid = useComputed$(() => {
		if (emailError.value === 'not-valid' || passwordError.value == 'not-valid') return false;

		return true;
	});

	const onSubmit = $(() => {
		formState.formPosted = true;
		const { email, password } = formState;

		console.log(isFormValid.value);
		console.log({ email, password });
	});

	return (
		<form
			class='login-form'
			onSubmit$={onSubmit}
			preventdefault:submit
		>
			<div class='relative'>
				<input
					onInput$={(event) => (formState.email = (event.target as HTMLInputElement).value)}
					value={formState.email}
					name='email'
					type='text'
					placeholder='Email address'
					class={formState.formPosted ? emailError.value : ''}
				/>
				<label for='email'>Email Address</label>
			</div>
			<div class='relative'>
				<input
					onInput$={(event) => (formState.password = (event.target as HTMLInputElement).value)}
					value={formState.password}
					name='password'
					type='password'
					placeholder='Password'
					class={formState.formPosted ? passwordError.value : ''}
				/>
				<label for='password'>Password</label>
			</div>
			<div class='relative'>
				<button
					type='submit'
					disabled={!isFormValid.value}
				>
					Ingresar
				</button>
			</div>

			<code>{JSON.stringify(formState, undefined, 2)}</code>
		</form>
	);
});
