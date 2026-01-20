let currentScore = 0;
let highScore = 0;
let gameStartTime = 0;

const restartBtn = document.createElement("button");
restartBtn.textContent = "Continue";
restartBtn.style.position = "absolute";
restartBtn.style.left = "50%";
restartBtn.style.top = "420px";
restartBtn.style.transform = "translateX(-50%)";
restartBtn.style.zIndex = 999;
restartBtn.style.pointerEvents = "auto";
restartBtn.style.padding = "14px 30px";
restartBtn.style.fontSize = "18px";
restartBtn.style.fontFamily = "Orbitron, sans-serif";
restartBtn.style.fontWeight = "bold";
restartBtn.style.color = "#ffffff";
restartBtn.style.background = "#000000";
restartBtn.style.border = "2px solid #4da6ff";
restartBtn.style.borderRadius = "12px";
restartBtn.style.cursor = "pointer";
restartBtn.style.boxShadow = "0 0 15px rgba(77,166,255,0.6)";
restartBtn.style.display = "none";
document.body.appendChild(restartBtn);

restartBtn.addEventListener("click", () => {
    restartBtn.style.display = "none";
    isGameOver = false;
    gameRunning = true;

    asteroids.length = 0;
    explosions.length = 0;
    currentScore = 0;
    gameStartTime = Date.now();

    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 100;
    spaceship.vx = 0;
    spaceship.vy = 0;
    spaceship.alive = true;
    spaceship.exploding = false;

    lastTime = performance.now();
    location.reload();
});

function startGameTimer() {
    gameStartTime = Date.now();
    currentScore = 0;
}

function updateScore() {
    if (gameRunning && !isGameOver) {
        currentScore = Math.floor((Date.now() - gameStartTime) / 1000);
    }
}

function finalizeScore() {
    if (currentScore > highScore) {
        highScore = currentScore;
    }
}

function GameOver() {
    finalizeScore();

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStarfield();

    ctx.textAlign = "center";
    ctx.fillStyle = "#4da6ff";
    ctx.font = "bold 36px Orbitron";
    ctx.fillText("It's Endless, continue if you can!", canvas.width / 2, 100);

    ctx.fillStyle = "#ffaa00";
    ctx.font = "bold 24px Orbitron";
    ctx.fillText("No Escape from the Dark", canvas.width / 2, 140);

    //  score
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Orbitron";
    ctx.fillText("Survived: " + currentScore + "s | Score: " + score + "pts", canvas.width / 2, 200);

    var floatY = Math.sin(Date.now() / 500) * 6;
    drawSpaceship(canvas.width / 2, 280 + floatY, 1.2);

    restartBtn.style.display = "block";
}s
