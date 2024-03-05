import type { PageServerLoad } from './$types';
import { supabaseClient } from '$lib/supabase';

export const load: PageServerLoad = async ({ params }) => {
	const { data, error } = await supabaseClient.from('games').select().eq('id', params.gameId);

	if (error) {
		return { status: 500, error: error.message, session: null };
	}

	if (!data) {
		return { status: 404, error: 'Game not found', session: null };
	}

	return { gameId: params.gameId, gameData: data[0], session: null };
};