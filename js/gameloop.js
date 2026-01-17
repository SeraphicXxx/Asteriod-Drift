var gameRunning = false;
const explosions = [];
const screenShake = new ScreenShake();
let lastTime = performance.now();

function gameLoop(time) {
    const deltaTime = time - lastTime;
    lastTime = time;
    if (!gameRunning) return;
    ctx.save();
    update(time) // from ui.js
    draw();   // from ui.js
    screenShake.update(deltaTime);
    screenShake.apply(ctx);
    spawnAsteroids();
    drawGameUI();
    move();
    updateAsteroids()
    spaceship.update(canvas);
    updateAsteroids();
    updateExplosions();
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
