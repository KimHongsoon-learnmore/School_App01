// Canvas 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 게임 설정
const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 게임 상태
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
let gameLoop;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 100;

// UI 요소
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgainBtn');

// 초기 최고 점수 표시
highScoreElement.textContent = highScore;

// 키보드 입력 처리
let lastDirection = {dx: 0, dy: 0};

document.addEventListener('keydown', (e) => {
    if (!gameRunning || gamePaused) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (lastDirection.dy === 0) {
                dx = 0;
                dy = -1;
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (lastDirection.dy === 0) {
                dx = 0;
                dy = 1;
            }
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (lastDirection.dx === 0) {
                dx = -1;
                dy = 0;
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (lastDirection.dx === 0) {
                dx = 1;
                dy = 0;
            }
            e.preventDefault();
            break;
    }
});

// 버튼 이벤트
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
restartBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', () => {
    gameOverDiv.style.display = 'none';
    resetGame();
    startGame();
});

function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    restartBtn.style.display = 'inline-block';
    
    // 게임 루프는 시작하지만, dx와 dy가 0이면 뱀은 움직이지 않음
    gameLoop = setInterval(update, gameSpeed);
}

function togglePause() {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? '재개' : '일시정지';
}

function resetGame() {
    clearInterval(gameLoop);
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    lastDirection = {dx: 0, dy: 0};
    score = 0;
    gameRunning = false;
    gamePaused = false;
    scoreElement.textContent = score;
    generateFood();
    draw();
    
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    pauseBtn.textContent = '일시정지';
}

function generateFood() {
    let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * GRID_SIZE);
        food.y = Math.floor(Math.random() * GRID_SIZE);
        
        validPosition = !snake.some(segment => 
            segment.x === food.x && segment.y === food.y
        );
    }
}

function update() {
    if (gamePaused) return;
    
    // 아직 방향키를 누르지 않았으면 업데이트하지 않음
    if (dx === 0 && dy === 0) return;
    
    lastDirection = {dx, dy};
    
    // 새로운 머리 위치
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    
    // 벽 충돌 체크
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }
    
    // 자기 자신 충돌 체크
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    // 음식 먹기
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        generateFood();
        
        // 속도 증가
        if (score % 50 === 0 && gameSpeed > 50) {
            gameSpeed -= 5;
            clearInterval(gameLoop);
            gameLoop = setInterval(update, gameSpeed);
        }
    } else {
        snake.pop();
    }
    
    draw();
}

function draw() {
    // 배경 그리기
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // 격자 그리기
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }
    
    // 뱀 그리기
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#667eea' : '#764ba2';
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );
        
        // 뱀 머리 눈 그리기
        if (index === 0) {
            ctx.fillStyle = 'white';
            const eyeSize = 3;
            const eyeOffset = 5;
            
            if (dx === 1) { // 오른쪽
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (dx === -1) { // 왼쪽
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset - eyeSize, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (dy === 1) { // 아래
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset, eyeSize, eyeSize);
            } else if (dy === -1) { // 위
                ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset - eyeSize, eyeSize, eyeSize);
                ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset - eyeSize, eyeSize, eyeSize);
            }
        }
    });
    
    // 음식 그리기 (사과 모양)
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 사과 줄기
    ctx.fillStyle = '#228B22';
    ctx.fillRect(
        food.x * CELL_SIZE + CELL_SIZE / 2 - 1,
        food.y * CELL_SIZE + 2,
        2,
        5
    );
}

function gameOver() {
    clearInterval(gameLoop);
    gameRunning = false;
    
    finalScoreElement.textContent = score;
    gameOverDiv.style.display = 'block';
    
    pauseBtn.style.display = 'none';
    restartBtn.style.display = 'none';
}

// 초기 화면 그리기
draw();
