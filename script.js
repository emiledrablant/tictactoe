
const gameboard = (function () {
    const board = [];
    
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    /* Gives the entire board, made of Cell objects */
    const getBoard = () => board;

    /* Draw the actual board with only the value for each cell */
    const drawBoard = () => {
        const boardWithCells = board.map(row => row.map(cell => cell.getValue()));
        return console.log(boardWithCells);
    }

    const playMove = (coordX, coordY) => {
        let token = gameManager.getActivePlayer().token;
        board[coordX][coordY].modifyCell(token);
    }

    const checkWin = () => {
        const winningCombinations = [
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            [[0,0], [1,0], [2,0]]
        ];
        console.log(winningCombinations.length);
        for (combination of winningCombinations) {
            const [a, b, c] = combination;
            const currentSymbol = board[a[0]][a[1]].getValue();
            console.log(combination.length);
            if (currentSymbol !== "_") {
                if (board[b[0]][b[1]].getValue() === currentSymbol && board[c[0]][c[1]].getValue() === currentSymbol) {
                    return console.log(`Victory! Current symbol: ${currentSymbol}`);
                }
            } else {
                return console.log("Nope!");
            }
        }
    }

    return { getBoard, drawBoard, playMove, checkWin };
})();

function createPlayer (name, token) {
    let score = 0;

    const getScore = () => score;
    const setScore = () => ++score;

    return { name, token, getScore, setScore };
}

function Cell() {
    let value = "_";

    const getValue = () => value;

    const modifyCell = (token) => {
        value = token;
    }

    return { getValue, modifyCell };
}

const gameManager = (function () {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    let activePlayer = player1;

    const changePlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    const getActivePlayer = () => activePlayer;

    return { changePlayerTurn, getActivePlayer };
})();

gameboard.drawBoard();
gameboard.playMove(2, 1);
gameManager.changePlayerTurn();
gameboard.playMove(1, 2);
gameManager.changePlayerTurn();
gameboard.playMove(2, 2);
gameboard.playMove(2,0);
gameboard.drawBoard();
gameboard.checkWin();