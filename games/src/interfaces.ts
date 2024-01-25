export type gameState = {
    playerX: string;
    playerO: string;
    currentPlayer: 'X' | 'O' | ''; // '' means game is over
    gameGrid: gameTyle[];
};

export type gameTyle = {
    tileIndex: number;
    tileState: 'X' | 'O' | '';
};