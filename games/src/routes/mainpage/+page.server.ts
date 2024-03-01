import type { Actions } from './$types';
import type { gameState } from '$interfaces';
import { supabase } from '$lib/supabaseClient';

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
          tileState: ''
        },
        {
          tileIndex: 0,
          tileState: ''
        },
        {
          tileIndex: 6,
          tileState: ''
        },
        {
          tileIndex: 2,
          tileState: ''
        },
        {
          tileIndex: 3,
          tileState: ''
        },
        {
          tileIndex: 4,
          tileState: ''
        },
        {
          tileIndex: 5,
          tileState: ''
        },
        {
          tileIndex: 7,
          tileState: ''
        },
        {
          tileIndex: 8,
          tileState: ''
        }
      ]
    }

    
    const { data, error } = await supabase
      .from('games')
      .insert([newGame])
      .select()


    return { data, error };
  },
  joinGame: async (event) => {
    return event;
  },
} satisfies Actions;

/*const POST: RouteHandler = async (req, res) => {
  const { page } = req.params;

  const games = await getGames(page);

  res.json(games);
}*/