var menu = document.getElementById("menu");
var startBtn = document.getElementById("startBtn");
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
const asteroids = [];
canvas.width = menu.offsetWidth;
canvas.height = menu.offsetHeight;
let spawnTimer = 0;

startBtn.addEventListener("click", function() {
    menu.style.display = "none";
    canvas.style.display = "block";

    initStars();
    startIntro();

    gameRunning = true;
    isGameOver = false;

    spawnTimer = 0;
    asteroids.length = 0;
    explosions.length = 0;

    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
});



function spawnAsteroids() {
  spawnTimer++;
  if (spawnTimer > 60) {
    asteroids.push(new Asteroid(canvas));
    spawnTimer = 0;
  }
}

function updateAsteroids() {
    asteroids.forEach((asteroid, index) => {
        asteroid.update();
        asteroid.draw(ctx);

        if (asteroid.isOffScreen(canvas)) {
            asteroids.splice(index, 1);
        }

        // Collision
        if (spaceship.checkCollision(asteroid)) {
            asteroid.active = false;
        }
    });
}
