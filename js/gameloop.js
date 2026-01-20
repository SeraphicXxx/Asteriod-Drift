var gameRunning = false;
const explosions = [];
const screenShake = new ScreenShake();
let lastTime = performance.now();

function gameLoop(time) {
    const deltaTime = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    screenShake.update(deltaTime);
    screenShake.apply(ctx);

    if (isGameOver) {
        GameOver();
        updateExplosions();
        ctx.restore();
        requestAnimationFrame(gameLoop);
        return;
    }

    if (gameRunning) {
        updateScore(); 
        draw(time);
        spawnAsteroids();
        updateAsteroids();
        updateExplosions();
    }

    ctx.restore();
    requestAnimationFrame(gameLoop);
}

function updateExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].update();
        explosions[i].draw(ctx);

        if (explosions[i].done) {
            explosions.splice(i, 1);
        }
    }
}
