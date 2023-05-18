/** @format */
import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import type { PropFunction } from '@builder.io/qwik';

import ModalStyles from './modal.css?inline';

interface Props {
	closeFn: PropFunction<() => void>;
	persistent?: boolean;
	showModal: boolean;
	size?: 'sm' | 'md' | 'lg';
}

export const Modal = component$(
	({ showModal, closeFn, persistent = false, size = 'md' }: Props) => {
		useStylesScoped$(ModalStyles);

		return (
			<div
				id='modal-content'
				onClick$={(event) => {
					const elementID = (event.target as HTMLDivElement).id;
					if (elementID === 'modal-content' && !persistent) closeFn();
				}}
				role='alert'
				class={showModal ? 'modal-background' : 'hidden'}
			>
				<div class={['modal-content', `modal-${size}`]}>
					<div class='mt-3 text-center'>
						<h3 class='modal-title'>
							<Slot name='title' />{' '}
							{/** the name property is nedeed when we need more that one slot */}
						</h3>

						<div class='mt-2 px-7 py-3'>
							<div class='modal-content-text'>
								<Slot name='content' />{' '}
								{/** Slot is like ng-content in Angular. To show some content inside */}
							</div>
						</div>

						{/* Botton */}
						<div class='items-center px-4 py-3'>
							<button
								onClick$={closeFn}
								id='ok-btn'
								class='modal-button'
							>
								Cerrar
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
);
