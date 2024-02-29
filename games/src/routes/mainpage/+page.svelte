<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import type { gameState } from '$interfaces';

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

		const { data, error } = await supabase
			.from('games')
			.insert([{ game: newGame }])
			.select();

		if (error) {
			console.error(error);
		} else {
			goto(`/game/${data[0].id}`);
		}
	};
</script>

<div>
	<h1>Main Page</h1>
	<button on:click={() => newOfflineGame()}>New Offline game</button>
	<button on:click={() => newGame()}>New Game</button>
	<form action="?/joinGame">
		<input type="text" placeholder="SessionsId" />
		<button type="submit">Join Game</button>
	</form>
</div>
