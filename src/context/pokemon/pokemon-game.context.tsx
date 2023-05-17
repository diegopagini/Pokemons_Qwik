/** @format */
import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
	isPokemonVisible: boolean;
	pokemonId: number;
	showBackImage: boolean;
}

// The given ID must be unique in the entire application.
export const PokemonGameContext = createContextId<PokemonGameState>('pokmeon.game-context');
