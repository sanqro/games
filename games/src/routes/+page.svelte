<script lang="ts">
	import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: any;

    supabaseClient.auth.getSession().then((session) => {
        data = session.data;
    });

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		goto("/login");
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<main>

	{#if data.session == null}
		<h1>Hi there!</h1>
		<div class="auth-buttons">
			<a href="/login" class="btn btn-primary">Login</a>
		</div>
	{:else}
	<form action="/logout" method="POST" use:enhance={submitLogout}>
		<button type="submit" class="btn btn-primary">Logout</button>
	</form>
	{/if}
</main>
