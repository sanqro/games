<script lang="ts">
	import type { gameState, gameTyle } from '$interfaces';

	const player = 'X';

	// mock GameState
	let gameState: useState<gameState> = {
		playerX: 'Player 1',
		playerO: 'Player 2',
		currentPlayer: 'X',
		gameGrid: [
			{
				tileIndex: 1,
				tileState: ''
			},
			{
				tileIndex: 0,
				tileState: ''
			},
			{
				tileIndex: 6,
				tileState: ''
			},
			{
				tileIndex: 2,
				tileState: ''
			},
			{
				tileIndex: 3,
				tileState: ''
			},
			{
				tileIndex: 4,
				tileState: ''
			},
			{
				tileIndex: 5,
				tileState: ''
			},
			{
				tileIndex: 7,
				tileState: ''
			},
			{
				tileIndex: 8,
				tileState: ''
			}
		]
	};

	gameState.gameGrid.sort((a: gameTyle, b: gameTyle) => a.tileIndex - b.tileIndex);

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
		let filledTiles = 0;
		possibleWins.forEach((winningCombo) => {
			filledTiles++;
			const tile1 = gameState.gameGrid[winningCombo[0]].tileState;
			const tile2 = gameState.gameGrid[winningCombo[1]].tileState;
			const tile3 = gameState.gameGrid[winningCombo[2]].tileState;

			if (tile1 === tile2 && tile2 === tile3 && tile1 !== '') {
				winner = tile1;
			}
		});

		if (winner === undefined && filledTiles === 9) {
			winner = 'Draw';
		}

		return winner;
	};

	const buttonClick = (buttonIndex: number) => {
		if (gameState.currentPlayer === player || true) {
			gameState.gameGrid[buttonIndex].tileState = gameState.currentPlayer;
			if (gameState.currentPlayer === 'X') {
				gameState.currentPlayer = 'O';
			} else {
				gameState.currentPlayer = 'X';
			}

			const winner = checkForWinner();
			if (winner !== undefined) {
				alert(`Winner is ${winner}`);
			}
		}
	};
</script>

<div class="container">
	<h2>You are: {player}</h2>
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
	.constainer {
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
