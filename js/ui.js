let score = 0;
let startTime = null;
let elapsedTime = 0;

function update(time) {
    if (!startTime) startTime = time;
    elapsedTime = ((time - startTime) / 1000).toFixed(1);
    score = Math.floor(elapsedTime * 10);
}

function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(isIntroActive());
    if (isIntroActive()) {
        drawIntro();
    } else {
        update(time);
        drawGameUI();
    }
}

function drawGameUI() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawStarfield();

    spaceship.draw(ctx);
    spawnAsteroids();
    move();
    updateAsteroids()
    spaceship.update(canvas);
    updateAsteroids();
    updateExplosions();
    ctx.fillStyle = "#4da6ff";
    ctx.font = "bold 24px Orbitron";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 20, 40);
    ctx.textAlign = "right";
    ctx.fillText("Time: " + elapsedTime + "s", canvas.width - 20, 40);
}
