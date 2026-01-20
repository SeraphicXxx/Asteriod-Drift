var showIntro = true;
var introTimer = 0;
var introDuration = 2000;
function startIntro() {
    showIntro = true;
    introTimer = Date.now();
}

function isIntroActive() {
    if (showIntro && Date.now() - introTimer >= introDuration) {
        showIntro = false;
        gameRunning = true;
        startGameTimer();
    }
    return showIntro;
}

function drawIntro() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStarfield(); // from stars.js
    console.log("1");
    ctx.textAlign = "center";
    ctx.fillStyle = "#4da6ff";
    ctx.font = "bold 36px Orbitron";
    ctx.fillText("Survive the Cosmic Storm...", canvas.width / 2, 100);

    ctx.fillStyle = "#ffaa00";
    ctx.font = "bold 24px Orbitron";
    ctx.fillText("Dodge. React. Stay alive.", canvas.width / 2, 140);

    var floatY = Math.sin(Date.now() / 500) * 6;
    drawSpaceship(canvas.width / 2, 280 + floatY, 1.2); // from spaceship.js
}
