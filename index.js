const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = menu.offsetWidth;
canvas.height = menu.offsetHeight;

let gameRunning = false;
let showIntro = true;
let introTimer = 0;
const introDuration = 3000;

const stars = [];
const STAR_COUNT = 120;

function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.8 + 0.3
        });
    }
}

startBtn.addEventListener("click", () => {
    menu.style.display = "none";
    canvas.style.display = "block";

    gameRunning = true;
    showIntro = true;
    introTimer = Date.now();

    initStars();
    gameLoop();
});

function gameLoop() {
    if (!gameRunning) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

function update() {
    if (showIntro && Date.now() - introTimer >= introDuration) {
        showIntro = false;
    }
}

function draw() {
    if (showIntro) {
        drawIntro();
    } else {
        drawGameUI();
    }
}

function drawIntro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0a0520";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStarfield();

    ctx.textAlign = "center";
    ctx.fillStyle = "#4da6ff";
    ctx.font = "bold 36px Orbitron";
    ctx.fillText("Survive the Cosmic Storm...", canvas.width / 2, 100);


    ctx.fillStyle = "#ffaa00";
    ctx.font = "bold 24px Orbitron";
    ctx.fillText("Dodge. React. Stay alive.", canvas.width / 2, 140);

    const floatY = Math.sin(Date.now() / 500) * 6;
    drawSpaceship(canvas.width / 2, 280 + floatY, 1.2);
}

function drawGameUI() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0a0520";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // drawStarfield();

    ctx.fillStyle = "#4da6ff";
    ctx.font = "bold 24px Orbitron";
    ctx.textAlign = "left";
    ctx.fillText("Score: 0", 20, 40);

    ctx.fillStyle = "#4da6ff";
    ctx.font = "bold 24px Orbitron";
    ctx.fillText("Time: 0", 1000, 40);
}

function drawStarfield() {
    ctx.fillStyle = "#fff5aa";

    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
}


function drawSpaceship(x, y, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.fillStyle = "#9CA3AF";
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(22, 30);
    ctx.lineTo(-22, 30);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#38BDF8";
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(8, 5);
    ctx.lineTo(-8, 5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#6B7280";
    ctx.fillRect(-32, 10, 12, 20);
    ctx.fillRect(20, 10, 12, 20);

    ctx.fillStyle = "#F97316";
    ctx.beginPath();
    ctx.moveTo(-8, 30);
    ctx.lineTo(0, 45 + Math.random() * 8);
    ctx.lineTo(8, 30);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}
