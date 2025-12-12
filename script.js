// 遊戲主變數
let board = Array(9).fill(null); // 棋盤狀態
let current = 'X'; // 當前玩家（玩家為X）
let active = true; // 控制遊戲是否進行中

function init() {   
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    board = Array(9).fill(null);
    active = true;
    current = 'X';
    document.getElementById('status').innerText = '玩家 (X) 先手';
    // 建立9個格子
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.onclick = () => playerMove(i);
        boardEl.appendChild(cell);
    }
}

function playerMove(i) {
    if (!active || board[i]) return;
    board[i] = 'X';
    updateBoard();
    if (checkWin('X')) {
        endGame('玩家 (X) 勝利！');
        return;
    }
    else if (isFull()) {
        endGame('平手！');
        return;
    }
    current = 'O';
    document.getElementById('status').innerText = '電腦思考中...';
    active = false;
    setTimeout(computerMove, 700); // 模擬電腦思考時間
}

// 電腦AI下棋邏輯
function computerMove() {
    const move = findBestMove(board, 'O');  // 使用最強 AI
    board[move] = 'O';
    updateBoard();

    if (checkWin('O')) return endGame('電腦 (O) 勝利！');
    if (isFull()) return endGame('平手！');

    current = 'X';
    active = true;
    document.getElementById('status').innerText = '輪到玩家 (X)';
}

function findBestMove(board, aiPlayer) {
    const humanPlayer = aiPlayer === 'O' ? 'X' : 'O';

    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = aiPlayer;
            let score = minimax(board, 0, false, aiPlayer, humanPlayer);
            board[i] = null;

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer) {
    if (checkWin(aiPlayer)) return 10 - depth;    // 越快贏越好
    if (checkWin(humanPlayer)) return depth - 10; // 越慢輸越好
    if (isFull()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = aiPlayer;
                let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
                board[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;

    } else {
        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = humanPlayer;
                let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
                board[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}


function findWinningMove(player) {
 const wins = [
 [0,1,2],[3,4,5],[6,7,8],
 [0,3,6],[1,4,7],[2,5,8],
 [0,4,8],[2,4,6]
 ];
 for (let [a,b,c] of wins) {
 const line = [board[a], board[b], board[c]];
 if (line.filter(v => v === player).length === 2 && line.includes(null))
 return [a,b,c][line.indexOf(null)];
 }

 return null;
}

function getRandomMove() {
    const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
}

function updateBoard() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < 9; i++) {
        cells[i].innerText = board[i] || '';
    }
}

// 判斷勝利
function checkWin(player) {
const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
    ];
    return wins.some(([a,b,c]) => board[a] === player && board[b] === player && board[c] === player);
}

// 判斷是否平手
function isFull() {
    return board.every(cell => cell !== null);
}

// 結束遊戲
function endGame(message) {
    document.getElementById('status').innerText = message;
    active = false;
}

// 重開一局
function resetGame() {
    init();
}

// 初始化
init();


