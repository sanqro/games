import type { Actions } from './$types';
import type { gameState } from '$interfaces';
import { supabaseClient } from '$lib/supabase';

export const actions = {
	default: async () => {
		return;
	},
  createGame: async () => {
    const newGame: gameState = {
      playerX: null,
      playerO: null,
      currentPlayer: 'X',
      gameGrid: [
        {
          tileIndex: 1,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 0,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 6,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 2,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 3,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 4,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 5,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 7,
          tileState: '',
					isDisabled: false
        },
        {
          tileIndex: 8,
          tileState: '',
					isDisabled: false
        }
      ]
    }

    
    const { data, error } = await supabaseClient
      .from('games')
      .insert([newGame])
      .select()


    return { data, error };
  },
  joinGame: async (event) => {
    return event;
  },
} satisfies Actions;
