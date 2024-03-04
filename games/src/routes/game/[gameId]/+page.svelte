<script lang="ts">
	import type { PageData } from './$types';
	import { supabaseClient } from '$lib/supabase';
	import type { gameState, gameTyle } from '$interfaces';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	const updateGame = async () => {
		if (thisPlayer === null) return;
		const { error } = await supabaseClient
			.from('games')
			.upsert({ id: data.gameId, game: gameState });
	};

	export let data: PageData;
	let gameState = data.gameData.game as gameState;
	gameState.gameGrid.sort((a: gameTyle, b: gameTyle) => a.tileIndex - b.tileIndex);

	let thisPlayer: 'X' | 'O' | null = null;
	export let playername: string | null = null;

	supabaseClient.auth.getUser().then((user) => {
		if (user === null || user.error !== null) {
			playername = 'Guest';
		} else {
			playername = user.data.user.user_metadata.name;
		}

		if (browser) {
			if (gameState.playerX === null) {
				thisPlayer = 'X';
				gameState.playerX = playername;
				playername = gameState.playerX;

				updateGame();
			} else if (gameState.playerO === null) {
				thisPlayer = 'O';
				gameState.playerO = playername;
				playername = gameState.playerX;
				updateGame();
			} else {
				gameserver.unsubscribe();
				alert('Game is full');
				goto('/mainpage');
			}
		}
	});

	const gameserver = supabaseClient
		.channel('game')
		.on(
			'postgres_changes',
			{
				event: 'UPDATE',
				schema: 'public',
				table: 'games',
				filter: 'id=eq.' + data.gameId
			},
			(payload) => {
				gameState = payload.new.game;
				checkForWinner();
			}
		)
		.subscribe();

	const checkForWinner = () => {
		const possibleWins = [
			[0, 1, 2], // top row
			[3, 4, 5], // middle row
			[6, 7, 8], // bottom row
			[0, 3, 6], // left column
			[1, 4, 7], // middle column
			[2, 5, 8], // right column
			[0, 4, 8], // diagonal top left to bottom right
			[2, 4, 6] // diagonal top right to bottom left
		];

		let winner: 'X' | 'O' | 'Draw' | undefined = undefined;
		possibleWins.forEach((winningCombo) => {
			const tile1 = gameState.gameGrid[winningCombo[0]].tileState;
			const tile2 = gameState.gameGrid[winningCombo[1]].tileState;
			const tile3 = gameState.gameGrid[winningCombo[2]].tileState;

			if (tile1 === tile2 && tile2 === tile3 && tile1 !== '') {
				winner = tile1;
			}
		});

		let filledTiles = 0;
		gameState.gameGrid.forEach((tile) => {
			if (tile.tileState !== '') {
				filledTiles++;
			}
		});

		if (winner === undefined && filledTiles === 9) {
			winner = 'Draw';
		}

		if (winner === 'Draw' && browser) {
			alert('Draw');

			gameserver.unsubscribe();
		} else if (winner !== undefined && browser) {
			if (winner !== 'Draw' && winner === 'X') {
				disableAllButtons();
				alert(gameState.playerX + ' wins');

				gameserver.unsubscribe();
			} else {
				disableAllButtons();
				alert(gameState.playerO + ' wins');

				gameserver.unsubscribe();
			}
			gameserver.unsubscribe();
		}
	};

	const buttonClick = (buttonIndex: number) => {
		if (
			gameState.currentPlayer === thisPlayer &&
			gameState.gameGrid[buttonIndex].tileState === ''
		) {
			gameState.gameGrid[buttonIndex].tileState = gameState.currentPlayer;
			gameState.gameGrid[buttonIndex].isDisabled = true;
			if (gameState.currentPlayer === 'X') {
				gameState.currentPlayer = 'O';
			} else {
				gameState.currentPlayer = 'X';
			}

			updateGame();
			checkForWinner();
		}
	};

	const disableAllButtons = () => {
		gameState.gameGrid.forEach((tile) => {
			tile.isDisabled = true;
		});
	};

	const copySessionId = () => {
		navigator.clipboard.writeText(data.gameId as string);
	};
</script>

<main class="Container">
	<header class="Header">
		<section class="HeaderText">SomeHeaderText</section>
		<nav>
			<button class="HeaderButton" on:click={() => goto('/mainpage')}>Leave Game</button>
		</nav>
	</header>
	<div class="ContentContainer">
		<h2 class="TittleS">You are: {thisPlayer}</h2>
		{#if thisPlayer === 'X'}
			<h2 class="TittleS">Enemy: {gameState.playerO}</h2>
		{:else if thisPlayer === 'O'}
			<h2 class="TittleS">Enemy: {gameState.playerX}</h2>
		{/if}
		<h2 class="TittleS">Current Player: {gameState.currentPlayer}</h2>
		<div class="GameContainer">
			<!-- First row -->
			{#each gameState.gameGrid as item, index}
				<button
					class="GameGridButton"
					disabled={item.isDisabled}
					on:click={() => buttonClick(index)}
				>
					{item.tileState}
				</button>
			{/each}
		</div>
		<button class="Button" on:click={() => copySessionId()}>Copy Session Id</button>
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
		text-align: center;
		height: 2rem;
		width: 100%;
		font-size: 1.5rem;
		padding: 1rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	.TittleS {
		color: var(--primary-color);
		font-size: 3rem;
		margin: 0.5rem 0;
	}

	.GameContainer {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px;
		margin-top: 20px;
	}

	.GameGridButton {
		background-color: var(--primary-color);
		color: var(--background-color1);
		font-family: 'Passion One', sans-serif;

		font-size: 4rem;
		width: 6rem;
		height: 6rem;
		margin: 0;
		padding: 1rem;
		border: none;
		border-radius: 0.5rem;

		transition:
			background-color 0.5s,
			color 0.5s,
			transform 0.2s;
		cursor: pointer;
	}

	.GameGridButton:hover {
		background-color: var(--secondary-color);
		color: var(--background-color2);
		transform: scale(1.15);
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

	.Button:active {
		animation: clickAnimation 0.3s ease-in-out;
	}

	.GameGridButton:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	@keyframes clickAnimation {
		0% {
			background-color: var(--secondary-color);
		}
		50% {
			background-color: var(--background-color2);
		}
		100% {
			background-color: var(--secondary-color);
		}
	}
</style>
