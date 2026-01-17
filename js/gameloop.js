var gameRunning = false;
const explosions = [];
const screenShake = new ScreenShake();
let lastTime = performance.now();

function gameLoop(time) {
  if (!gameRunning) return;
    const deltaTime = time - lastTime;
    lastTime = time;
    ctx.save();
    draw(time);   // from ui.js
    screenShake.update(deltaTime);
    screenShake.apply(ctx);
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
