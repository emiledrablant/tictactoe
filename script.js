
const gameboard = (function () {
    const board = [];
    
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    /* A modifier plus tard. */
    const getBoard = () => console.log(board);

    const drawBoard = () => {
        const boardWithCells = "x";
        return boardWithCells;
    }

    return { getBoard, drawBoard };
})();

function createPlayer (name, token) {
    let score = 0;

    const getScore = () => score;
    const setScore = () => ++score;

    return { name, token, getScore, setScore };
}

function Cell() {
    value = "_";

    const getValue = () => value;

    const modifyCell = (token) => {
        value = token;
    }

    return { getValue, modifyCell };
}

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");

gameboard.getBoard();