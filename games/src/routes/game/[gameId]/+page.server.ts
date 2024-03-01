import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async ({ params }) => {
	const { data, error } = await supabase.from('games').select().eq('id', params.gameId);

	if (error) {
		return { status: 500, error: error.message };
	}

	if (!data) {
		return { status: 404, error: 'Game not found' };
	}

	return { gameId: params.gameId, gameData: data[0]};
};