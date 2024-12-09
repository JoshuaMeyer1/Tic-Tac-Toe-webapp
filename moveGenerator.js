//Functions involved in generating moves:

/**
* Takes a board and returns a random move
* @param board, 9 element array with x's and o's or null.
* @return move, a playable random move
*/
export function generateRandomMove(board) {
    const emptyCells = generateMoves(board);
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
    return null; // No moves available
}


/**
 * returns true/false if a player has won
 * @param board
 * @returns player has won
 */
export function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonals
        [2, 4, 6],
    ];
    return winningCombinations.some((combination) => {
        const [a, b, c] = combination;
        return (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
}

/**
 * checks for a draw
 * @param board
 * @return if game is drawn
 */
export function checkDraw(board) {
    const moves = generateMoves(board);
    if (moves.length === 0 && !checkWinner(board)) //if no moves then true.
        return true;
    return false;
    
}

/**
 * Returns if a player has won or if it is ongoing/drawn
 * @param board
 * @return 1 if x win, 0 if neither won, -1 if o win
 */
export function staticEval(board) {
    const winningCombinations = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonals
        [2, 4, 6],
    ];

    // check for a combination
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Return 1 for X, -1 for O
            return board[a] === "X" ? 1 : -1;
        }
    }

    // No winner found
    return 0;
}


/**
 * Returns minimax evaluation of a position
 * @param board
 * @param pieceToPlay (x or o)
 * @return 1 if x win, 0 if draw, -1 if o win
 */
function minimax(board, pieceToPlay) {

    const childBoards = generateChildBoards(board, pieceToPlay);
    const boardEval = staticEval(board);

    if (childBoards.length === 0 |
        boardEval === 1 |
        boardEval === -1) {
        return boardEval;
    }

    var value;
    if (pieceToPlay === 'X') {
        value = -2;
        for (let i = 0; i < childBoards.length; i++) {
            value = Math.max(value, minimax(childBoards[i], 'O'));
        }
        return value;
    } else {
        value = 2;
        for (let i = 0; i < childBoards.length; i++) {
            value = Math.min(value, minimax(childBoards[i], 'X'));
        }
        return value;
    }
}

/**
 * Returns the best move to play
 * @param board
 * @param pieceToPlay
 * @return bestMove
 */
export function getBestMove(board, pieceToPlay) {
    const moves = generateMoves(board);
    if (moves.length === 0)
        return null;

    let bestMove = moves[0];
    let bestEval = pieceToPlay === 'X' ? -1 : 1;
    for (let i = 0; i < moves.length; i++) {
        const newBoard = [...board]
        newBoard[moves[i]] = pieceToPlay;
        const evaluation = minimax(newBoard, pieceToPlay === 'X' ? 'O' : 'X');
        if (pieceToPlay === 'X') {
            if (evaluation >= bestEval) {
                bestEval = evaluation;
                bestMove = moves[i];
            }
        }
        if (pieceToPlay === 'O') {
            if (evaluation <= bestEval) {
                bestEval = evaluation;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}

/**
 * generates and returns an array of all child boards
 * @param board - The current board as an array of 9 elements.
 * @param pieceToPlay - The current piece to play, either "X" or "O".
 * @return An array of child boards after placing the current piece in each empty cell.
 */
function generateChildBoards(board, pieceToPlay) {
    const childBoards = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = pieceToPlay;
            childBoards.push(newBoard);
        }
    }

    return childBoards;
}


/**
 * @param board a 9 length array with X, O, and null
 * @return an array of the empty squares.
 */
function generateMoves(board) {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null)) //map empty to index and others to null
      .filter((index) => index !== null); //filter for indices
    return emptyCells;
}
