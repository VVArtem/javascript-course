const menu = document.getElementById('menu');
        const gameContainer = document.getElementById('game-container');
        const startBtn = document.getElementById('start-btn');
        const difficultySelect = document.getElementById('difficulty');
        const colorInput = document.getElementById('square-color');
        const scoreDisplay = document.getElementById('score');
        const timeDisplay = document.getElementById('time');
        const gameArea = document.getElementById('game-area');
        const target = document.getElementById('target');

        let score = 0;
        let timeLeft = 0;
        let maxTime = 0;
        let gameInterval;
        
        let isGameStarted = false; 

        let currentX, currentY, currentDiff;
        const squareSize = 40;

        startBtn.addEventListener('click', () => {

            menu.style.display = 'none';
            gameContainer.style.display = 'block';

            const areaHeight = gameArea.clientHeight;
            const areaWidth = gameArea.clientWidth;
            const smallerSide = areaHeight < areaWidth ? areaHeight : areaWidth;

            currentX = (areaWidth / 2) - (squareSize / 2);
            currentY = (areaHeight / 2) - (squareSize / 2);

            const difficulties = {
                easy: { time: 2.0, spread: smallerSide / 2 },
                middle: { time: 1.0, spread: smallerSide },
                hard: { time: 0.7, spread: smallerSide }
            };

            currentDiff = difficulties[difficultySelect.value];
            maxTime = currentDiff.time;
            timeLeft = maxTime;
            score = 0;            
            isGameStarted = false;

            scoreDisplay.textContent = score;
            timeDisplay.textContent = timeLeft.toFixed(1);

            target.style.width = squareSize + 'px';
            target.style.height = squareSize + 'px';
            target.style.backgroundColor = colorInput.value;
            
            spawnSquare();
        });

        function startGameTimer() {
            clearInterval(gameInterval);
            gameInterval = setInterval(() => {
                timeLeft -= 0.1;
                timeDisplay.textContent = timeLeft.toFixed(1);

                if (timeLeft <= 0) {
                    clearInterval(gameInterval);
                    alert(`Time is up! Your score: ${score}`);
                    gameContainer.style.display = 'none';
                    menu.style.display = 'block';
                    target.style.display = 'none';
                }
            }, 100);
        }

        function spawnSquare() {
            if (isGameStarted) {
                let offsetX = (Math.random() * currentDiff.spread * 2) - currentDiff.spread;
                let offsetY = (Math.random() * currentDiff.spread * 2) - currentDiff.spread;
                currentX += offsetX;
                currentY += offsetY;
            }

            const maxX = gameArea.clientWidth - squareSize;
            const maxY = gameArea.clientHeight - squareSize;

            if (currentX < 0) currentX = 0;
            if (currentX > maxX) currentX = maxX;
            if (currentY < 0) currentY = 0;
            if (currentY > maxY) currentY = maxY;

            target.style.left = currentX + 'px';
            target.style.top = currentY + 'px';
            target.style.display = 'block';
        }

        target.addEventListener('mousedown', () => {
            if (!isGameStarted) {
                isGameStarted = true;
                startGameTimer();
            }
            score++;
            scoreDisplay.textContent = score;
            timeLeft = maxTime;

            target.style.display = 'none';
            spawnSquare();
        });