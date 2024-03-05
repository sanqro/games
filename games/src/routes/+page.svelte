<script lang="ts">
	import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	export let data: any;

	supabaseClient.auth.getSession().then((session) => {
		data = session.data;

		if (browser && data.session !== null) {
			goto('/mainpage');
		}
	});

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();

		goto('/login');
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<main class="Container">
	{#if data.session == null}
		<div class="ContentContainer">
			<h1 class="Tittle">
				Tic Tac Toe <br />
				Online
			</h1>
			<section class="DisplayText">Play online or offline against your friends</section>
			<div class="auth-buttons">
				<button class="btn btn-primary Button" on:click={() => goto('/login')}>Go Play</button>
			</div>
		</div>
	{:else}
		<header class="Header">Tic Tac Toe Online</header>
		<div class="ContentContainer">
			<h1 class="Tittle">Something has gon wrong</h1>
		</div>
	{/if}
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;

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

	.Tittle {
		color: var(--primary-color);
		font-size: 4rem;
		margin-bottom: 20px;
	}

	.DisplayText {
		color: var(--secondary-color);
		font-size: 1.5rem;
		margin-bottom: 20px;
	}

	.Button {
		background-color: var(--primary-color);
		color: var(--background-color1);
		font-size: 1.1rem;
		width: 20rem;
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
