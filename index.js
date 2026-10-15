const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let isGameActive = true;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game state and board UI
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    // Reset all boxes in the UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
        box.disabled = false;
        box.className = `box box${index + 1}`;
        box.setAttribute("aria-label", `Square ${index + 1}, empty`);
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Alternate turn between Player X and Player O
function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Evaluate board for win or tie condition
function checkGameOver() {
    let winner = null;
    let winningLine = null;

    // Check each winning combination
    for (const position of winningPositions) {
        const [a, b, c] = position;
        if (
            gameGrid[a] !== "" &&
            gameGrid[a] === gameGrid[b] &&
            gameGrid[b] === gameGrid[c]
        ) {
            winner = gameGrid[a];
            winningLine = position;
            break;
        }
    }

    // A winner is detected
    if (winner !== null) {
        isGameActive = false;
        gameInfo.innerText = `Winner Player - ${winner}`;

        // Highlight winning cells
        winningLine.forEach((index) => {
            boxes[index].classList.add("win");
        });

        // Disable all cells to prevent further moves
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
            box.disabled = true;
        });

        newGameBtn.classList.add("active");
        return true;
    }

    // Check if all squares are filled without a winner (Tie)
    const isBoardFull = gameGrid.every((box) => box !== "");
    if (isBoardFull) {
        isGameActive = false;
        gameInfo.innerText = "Game Tied !";

        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
            box.disabled = true;
        });

        newGameBtn.classList.add("active");
        return true;
    }

    return false;
}

// Handle move click or keyboard trigger
function handleClick(index) {
    if (!isGameActive || gameGrid[index] !== "") {
        return;
    }

    // Record move
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    boxes[index].disabled = true;
    boxes[index].setAttribute("aria-label", `Square ${index + 1}, ${currentPlayer}`);

    // Check game termination before swapping turn
    const isOver = checkGameOver();

    // If game continues, switch to next player
    if (!isOver) {
        swapTurn();
    }
}

// Attach event listeners
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });

    box.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick(index);
        }
    });
});

newGameBtn.addEventListener("click", initGame);

// Export for test suites (Node / Vitest / Jest)
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        initGame,
        swapTurn,
        checkGameOver,
        handleClick,
        winningPositions,
        getGameState: () => ({
            currentPlayer,
            gameGrid: [...gameGrid],
            isGameActive
        })
    };
}

// Auto-initialize when run in browser
if (typeof window !== "undefined") {
    initGame();
}