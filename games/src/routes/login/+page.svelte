<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import type { Provider } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let sessionData: any;

	supabaseClient.auth.getSession().then((session) => {
		sessionData = session.data;

		if (browser && sessionData.session !== null) {
			goto('/mainpage');
		}
	});

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

<main class="Container">
	<header class="Header">Tic Tac Toe Online</header>
	<div class="ContentContainer">
		<h1 class="Title">Login</h1>
		<form method="POST" use:enhance={submitSocialLogin}>
			<button type="submit" formaction="?/login&provider=github" class="btn btn-ghost Button">
				Login with GitHub
			</button>
		</form>
		<button class="Button" on:click={() => goto('/mainpage')}> Play as Guest </button>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap');

	:root {
		--background-color1: #0d1c34;
		--background-color2: #2a1d39;
		--primary-color: #3498db;
		--secondary-color: #ff5f56;
		--header-color: #0d141f;
	}

	:global(body) {
		font-family: 'Passion One', sans-serif;
		margin: 0;
		height: 100vh;
		font-size: 62.5%;
	}

	.Container {
		background: linear-gradient(180deg, var(--background-color1) 0%, var(--background-color2) 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
	}

	.Header {
		background-color: var(--header-color);
		color: var(--secondary-color);

		text-align: center;
		height: 2rem;
		width: 100%;
		font-size: 1.5rem;
		padding: 1rem 0;
	}

	.ContentContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex-grow: 1;
		text-align: center;
	}

	.Title {
		color: var(--primary-color);
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.Button {
		background-color: var(--primary-color);
		color: var(--background-color1);

		font-size: 1.1rem;
		min-width: 20rem;
		margin: 1rem 0;
		padding: 1rem 2rem;
		border: none;
		border-radius: 0.5rem;

		transition: 0.5s;
		cursor: pointer;
	}

	.Button:hover {
		background-color: var(--secondary-color);
		color: var(--background-color1);
	}
</style>
