export type gameState = {
    playerX: string;
    playerO: string;
    currentPlayer: 'X' | 'O' | 'over';
    gameGrid: gameTyle[];
};

export type gameTyle = {
    tileIndex: number;
    tileState: 'X' | 'O' | '';
};