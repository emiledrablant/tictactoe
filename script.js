
const gameboard = (function () {
    const board = [];
    const container = document.getElementById("container");

    /*const gameContainer = document.getElementById("game-container");*/
    const drawBoard = () => {
        const gameContainer = document.createElement("div");
        gameContainer.id = ("game-container");
        container.appendChild(gameContainer);

        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                let newCell = Cell();
                board[i].push(newCell);

                const gameDiv = document.createElement("div");
                gameDiv.classList.add("cell");
                gameDiv.textContent = newCell.getValue();
                newCell.setId(i, j);

                gameDiv.addEventListener("click", (e) => {
                    let coords = newCell.getId();
                    playMove(coords[0], coords[1]);
                    gameDiv.textContent = newCell.getValue();
                });

                gameContainer.appendChild(gameDiv);
            }
        }
    }

    /* Gives the entire board, made of Cell objects */
    const getBoard = () => board;

    const playMove = (coordX, coordY) => {
        let token = gameManager.getActivePlayer().token;
        if (board[coordX][coordY].getValue() === '_') {
            board[coordX][coordY].modifyCell(token);
            gameManager.increaseNumberOfMoves();
            checkWin();
            gameManager.changePlayerTurn();
        }
    }

    const checkWin = () => {
        const winningCombinations = [
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],
            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
            [[0,0], [1,1], [2,2]],
            [[0,2], [1,1], [2,0]]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const currentSymbol = board[a[0]][a[1]].getValue();
            if (currentSymbol !== "_") {
                if (board[b[0]][b[1]].getValue() === currentSymbol && board[c[0]][c[1]].getValue() === currentSymbol) {
                    container.removeChild(document.getElementById("game-container"));
                    drawBoard();
                    return console.log(`Victory! The winner is: ${gameManager.getPlayerName(currentSymbol)}`);
                }
            }
        }
        if (gameManager.getNumberOfMoves() >= 9) {
            return console.log("It's a tie.");
        } else {
            return console.log("No win yet. The game goes on.");
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
    let id = [];

    const getValue = () => value;
    const getId = () => id;

    const setId = (coordX, coordY) => {
        id = [coordX, coordY];
    }

    const modifyCell = (token) => {
        value = token;
    }

    return { getValue, getId, setId, modifyCell };
}

const gameManager = (function () {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    let activePlayer = player1;
    let numberOfMoves = 0;
    const getNumberOfMoves = () => numberOfMoves;
    const increaseNumberOfMoves = () => numberOfMoves += 1;

    const changePlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }
    const getActivePlayer = () => activePlayer;

    const getPlayerName = (symbol) => {
        return symbol === 'X' ? player1.name : player2.name;
    }

    return { changePlayerTurn, getActivePlayer, getPlayerName, increaseNumberOfMoves, getNumberOfMoves };
})();

gameboard.drawBoard();