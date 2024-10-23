
const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('.butn');
let currentPlayer = 'X'; 
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleBoxClick = (event, index) => {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    checkResult();
    switchPlayer();
};


const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};


const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        setTimeout(() => alert(`Player ${currentPlayer} wins!`), 10);
        gameActive = false;
        return;
    }


    if (!board.includes('')) {
        setTimeout(() => alert('The game is a tie!'), 10);
        gameActive = false;
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => box.innerText = '');
    gameActive = true;
    currentPlayer = 'X';
};

boxes.forEach((box, index) => {
    box.addEventListener('click', (event) => handleBoxClick(event, index));
});

resetButton.addEventListener('click', resetGame);
