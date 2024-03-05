<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import type { gameState } from '$interfaces';

	export let user: any;
	const getUser = async () => {
		const { data, error } = await supabaseClient.auth.getUser();
		if (error) {
			user = null;
			return;
		}

		user = data;
	};
	getUser();

	const logoutUser = async () => {
		await supabaseClient.auth.signOut();
		getUser();
		goto('/');
	};

	const newOfflineGame = () => {
		goto('/game');
	};

	const newGame = async () => {
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
		};

		const { data, error } = await supabaseClient
			.from('games')
			.insert([{ game: newGame }])
			.select();

		if (error) {
			return;
		}

		goto(`/game/${data[0].id}`);
	};

	const joinGame = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const gameId = (event.currentTarget[0] as HTMLInputElement).value as null | string;
		if (gameId === null || gameId === '') {
			alert('Please enter a valid SessionId');
			return;
		}

		const { data, error } = await supabaseClient.from('games').select().eq('id', gameId);

		if (error) {
			alert('Game not found');
			return;
		}

		const game = data[0].game as gameState;
		if (game.playerO !== null && game.playerX !== null) {
			alert('Game is already full');
			return;
		}

		goto(`/game/${gameId}`);
	};

	const logout = async () => {
		await supabaseClient.auth.signOut();
		goto('/');
	};
</script>

<main class="Container">
	<header class="Header">
		{#if user}
			<section class="HeaderText">Welcome, {user.user.user_metadata.name}</section>
		{:else}
			<section class="HeaderText">Welcome, Guest</section>
		{/if}
		<nav>
			<button class="HeaderButton" on:click={() => newGame()}>New Game</button>
			{#if user}
				<button class="HeaderButton" on:click={() => logoutUser()}>Logout</button>
			{:else}
				<button class="HeaderButton" on:click={() => goto('/login')}>Login</button>
			{/if}
		</nav>
	</header>
	<div class="ContentContainer">
		<h1 class="Tittle">Tic Tac Toe <br /> Online</h1>
		<button class="Button" on:click={() => newGame()}>New Game</button>
		<button class="Button" on:click={() => newOfflineGame()}>New Offline game</button>
		<form action="?/joinGame" on:submit|preventDefault={joinGame}>
			<input class="SessionInput" type="text" placeholder="sessionsId" minlength="1" />
			<button class="Button SessionButton" type="submit">Join Game</button>
		</form>
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		height: 2rem;
		width: 100%;
		font-size: 1.5rem;
		padding: 1rem 0;
	}

	.HeaderText {
		color: var(--secondary-color);
		font-size: 1.5rem;
		padding: 0 1rem;
	}

	.HeaderButton {
		background-color: var(--secondary-color);
		color: var(--background-color1);

		height: 2rem;
		font-size: 1.1rem;
		margin: 0 1rem;
		padding: 0rem 1.5rem;
		border: none;
		border-radius: 0.3rem;

		transition: 0.5s;
		cursor: pointer;
	}

	.HeaderButton:hover {
		background-color: var(--primary-color);
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
	}

	.SessionButton {
		width: 7rem;
		margin: 1rem 0.25rem;
		padding: 1rem 0;
	}

	.SessionInput {
		width: 11.5rem;
		padding: 1rem 0.5rem;
		font-size: 1rem;
		margin: 0 0.25rem;
		border: none;
		border-radius: 0.3rem;
	}
</style>
