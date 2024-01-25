<script lang="ts">
	import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import type { Provider } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	const signInWithProvider = async (provider: Provider) => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: provider
		});
	};

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'github':
				await signInWithProvider('github');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<main>
	<h1>Login</h1>
	<form method="POST" use:enhance={submitSocialLogin}>
		<button formaction="?/login&provider=github" class="btn btn-ghost">github</button>
	</form>
</main>
