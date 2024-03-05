<script lang="ts">
	import { goto } from '$app/navigation';
	import type { gameState, gameTyle } from '$interfaces';

	let player: 'X' | 'O' = 'X';

	const newGameState = () => {
		return {
			playerX: 'Player 1',
			playerO: 'Player 2',
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
	};

	// mock GameState
	let gameState: gameState = newGameState() as gameState;

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
		if (gameState.gameGrid[buttonIndex].tileState === '') {
			gameState.gameGrid[buttonIndex].tileState = gameState.currentPlayer;
			gameState.gameGrid[buttonIndex].isDisabled = true;
			if (gameState.currentPlayer === 'X') {
				gameState.currentPlayer = 'O';
			} else {
				gameState.currentPlayer = 'X';
			}

			const winner = checkForWinner();
			if (winner !== undefined) {
				disableAllButtons();
				alert(`Winner is ${winner}`);
			}
		}
	};

	const newOfflineGame = () => {
		player = 'X';
		gameState = newGameState() as gameState;
	};

	const disableAllButtons = () => {
		gameState.gameGrid.forEach((tile) => {
			tile.isDisabled = true;
		});
	};
</script>

<main class="Container">
	<header class="Header">
		<section class="HeaderText">Tic Tac Toe Offline</section>
		<nav>
			<button class="HeaderButton" on:click={() => newOfflineGame()}>New Offline Game</button>
			<button class="HeaderButton" on:click={() => goto('/mainpage')}>Leave</button>
		</nav>
	</header>
	<div class="ContentContainer">
		<h2 class="TittleS">Current Player: {gameState.currentPlayer}</h2>
		<div class="GameContainer">
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
		cursor: pointer;
		transition:
			background-color 0.5s,
			color 0.5s,
			transform 0.2s;
	}

	.GameGridButton:hover {
		background-color: var(--secondary-color);
		color: var(--background-color2);
		transform: scale(1.15);
	}

	.GameGridButton:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
