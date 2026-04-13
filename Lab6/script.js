let moves = 0;
let seconds = 0;
let timerInterval;
let gameActive = false;

let allLevels = [];
let currentLevel = null;

// Елементи DOM
const moveDisplay = document.getElementById('move-count');
const targetDisplay = document.getElementById('target-moves');
const timerDisplay = document.getElementById('timer');
const gridElement = document.getElementById('grid');

// 1. Завантаження даних
fetch('data/levels.json')
    .then(res => res.json())
    .then(data => {
        allLevels = data;
        startNewGame(); // Запуск першої гри
    });

// 2. Функція запуску НОВОЇ гри (гарантовано інший варіант)
function startNewGame() {
    let nextLevel;
    
    if (allLevels.length > 1) {
        // Шукаємо рівень, який не дорівнює поточному
        do {
            nextLevel = allLevels[Math.floor(Math.random() * allLevels.length)];
        } while (currentLevel && nextLevel.id === currentLevel.id);
    } else {
        nextLevel = allLevels[0];
    }

    currentLevel = nextLevel;
    resetState();
    loadLevel(currentLevel);
}

// 3. Функція скидання (той самий рівень заново)
function resetCurrentLevel() {
    if (!currentLevel) return;
    resetState();
    loadLevel(currentLevel);
}

// Очищення таймера та лічильників
function resetState() {
    clearInterval(timerInterval);
    moves = 0;
    seconds = 0;
    gameActive = false;
    moveDisplay.innerText = "0";
    timerDisplay.innerText = "0";
    gridElement.innerHTML = '';
}

// 4. Побудова поля
function loadLevel(level) {
    targetDisplay.innerText = level.target;
    
    level.grid.forEach((state, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        if (state === 1) cell.classList.add('is-on');
        
        cell.addEventListener('click', () => handleCellClick(index));
        gridElement.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (!gameActive) {
        gameActive = true;
        startTimer();
    }

    moves++;
    moveDisplay.innerText = moves;
    toggleCellAndNeighbors(index);
    checkWin();
}

function toggleCellAndNeighbors(index) {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const points = [[row,col], [row-1,col], [row+1,col], [row,col-1], [row,col+1]];

    points.forEach(([r, c]) => {
        if (r >= 0 && r < 5 && c >= 0 && c < 5) {
            const idx = r * 5 + c;
            const cell = document.querySelector(`[data-index="${idx}"]`);
            if (cell) cell.classList.toggle('is-on');
        }
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.innerText = seconds;
    }, 1000);
}

function checkWin() {
    const lightsOn = document.querySelectorAll('.cell.is-on').length;
    if (lightsOn === 0 && gameActive) {
        clearInterval(timerInterval);
        gameActive = false;
        
        const isPerfect = moves <= currentLevel.target;
        alert(isPerfect ? 
            `Excellent! You matched the target of ${currentLevel.target} moves!` : 
            `Solved in ${moves} moves. Try to beat the target of ${currentLevel.target}!`);
    }
}

// Події для кнопок
document.getElementById('new-game-btn').addEventListener('click', startNewGame);
document.getElementById('reset-btn').addEventListener('click', resetCurrentLevel);