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
