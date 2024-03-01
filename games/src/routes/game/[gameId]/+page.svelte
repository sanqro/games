<script lang="ts">
	import type { PageData } from './$types';
	import { supabase } from '$lib/supabaseClient';
	import type { gameState, gameTyle } from '$interfaces';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	const updateGame = async () => {
		const { error } = await supabase.from('games').upsert({ id: data.gameId, game: gameState });
	};

	export let data: PageData;
	let gameState = data.gameData.game as gameState;
	gameState.gameGrid.sort((a: gameTyle, b: gameTyle) => a.tileIndex - b.tileIndex);

	let thisPlayer: 'X' | 'O' | null = null;
	let playername: string | null = null;

	if (browser) {
		if (gameState.playerX === null) {
			thisPlayer = 'X';
			// Mock playername
			gameState.playerX = 'Player 1';
			playername = gameState.playerX;
			updateGame();
		} else if (gameState.playerO === null) {
			thisPlayer = 'O';
			// Mock playername
			gameState.playerO = 'Player 2';
			playername = gameState.playerX;
			updateGame();
		} else {
			alert('Game is full');
		}
	}

	const gameserver = supabase
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
				console.log(payload.new.game);
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

		return winner;
	};

	const buttonClick = (buttonIndex: number) => {
		if (
			gameState.currentPlayer === thisPlayer &&
			gameState.gameGrid[buttonIndex].tileState === ''
		) {
			gameState.gameGrid[buttonIndex].tileState = gameState.currentPlayer;
			if (gameState.currentPlayer === 'X') {
				gameState.currentPlayer = 'O';
			} else {
				gameState.currentPlayer = 'X';
			}

			updateGame();
			checkForWinner();
		}
	};
</script>

<div>
	<h1>Game</h1>
	<p>GameId: {data.gameId}</p>
</div>

<div class="container">
	<h2>You are: {thisPlayer}</h2>
	<h2>Current Player: {gameState.currentPlayer}</h2>
	<div class="gameContainer">
		<!-- First row -->
		{#each gameState.gameGrid as item, index}
			<button class="gameGridButton" on:click={() => buttonClick(index)}>
				{item.tileState}
			</button>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.gameContainer {
		display: grid;
		grid-template-columns: 100px 100px 100px;
		grid-template-rows: 100px 100px 100px;
	}

	.gameGridButton {
		width: 100px;
		height: 100px;
		border: 1px solid black;
		background-color: white;
	}
</style>
