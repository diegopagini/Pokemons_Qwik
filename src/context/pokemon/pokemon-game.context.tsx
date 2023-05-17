/** @format */
import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
	pokemonId: number;
	showBackImage: boolean;
	isPokemonVisible: boolean;
}

// The given ID must be unique in the entire application.
export const PokemonGameContext = createContextId<PokemonGameState>('pokmeon.game-context');
