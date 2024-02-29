export type gameState = {
    playerX: string | null;
    playerO: string | null;
    currentPlayer: 'X' | 'O' | ''; // '' means game is over
    gameGrid: gameTyle[];
};

export type gameTyle = {
    tileIndex: number;
    tileState: 'X' | 'O' | '';
};