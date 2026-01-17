const explosionSprite = new Image();
explosionSprite.src = "./assets/spacesprite-die.png";


class Spaceship {
      constructor(x, y) {
      this.x = x;
      this.y = y;

      this.scale = 1;
      this.rotation = 0;
      this.turnSpeed = 0.15;

      this.vx = 0;
      this.vy = 0;
      this.acceleration = 0.4;
      this.friction = 0.96;
      this.TERMINAL_VELOCITY = 6;

      this.alive = true;
      this.exploding = false;

      this.hitboxRadius = 22;

      this.controls = {
          up: false,
          down: false,
          left: false,
          right: false
      };
    }

    handleInput() {
        if (this.controls.left) this.vx -= this.acceleration;
        if (this.controls.right) this.vx += this.acceleration;
        if (this.controls.up) this.vy -= this.acceleration;
        if (this.controls.down) this.vy += this.acceleration;
    }

    updateRotation() {
        if (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05) {
            const targetAngle = Math.atan2(this.vy, this.vx) + Math.PI / 2;
            let delta = targetAngle - this.rotation;
            delta = Math.atan2(Math.sin(delta), Math.cos(delta));
            this.rotation += delta * this.turnSpeed;
        }
    }

    applyPhysics() {
        this.vx = Math.max(
            -this.TERMINAL_VELOCITY,
            Math.min(this.TERMINAL_VELOCITY, this.vx)
        );
        this.vy = Math.max(
            -this.TERMINAL_VELOCITY,
            Math.min(this.TERMINAL_VELOCITY, this.vy)
        );

        this.vx *= this.friction;
        this.vy *= this.friction;
    }

        update(canvas) {
            if (!this.alive || this.exploding) return;

            this.handleInput();
            this.applyPhysics();
            this.updateRotation();

            this.x += this.vx;
            this.y += this.vy;

            this.x = Math.max(30, Math.min(canvas.width - 30, this.x));
            this.y = Math.max(30, Math.min(canvas.height - 30, this.y));
        }

        draw(ctx) {
            if (!this.alive || this.exploding) return;
            const isMoving =
                Math.abs(this.vx) > 0.1 || Math.abs(this.vy) > 0.1;

            drawSpaceship(
                this.x,
                this.y,
                this.scale,
                this.rotation,
                isMoving
            );
        }

        checkCollision(asteroid) {
            if (!this.alive) return false;

            const dx = this.x - asteroid.x;
            const dy = this.y - asteroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.hitboxRadius + asteroid.radius) {
                this.destroy();
                return true;
            }
            return false;
        }

          destroy() {
              if (this.exploding) return;

              this.exploding = true;
              this.alive = false;

              explosions.push(new Explosion(this.x, this.y, this.scale));
              screenShake.start(14, 350);

              console.log("Game Over");
          }
        }

function move(){
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" || e.key === "w") spaceship.controls.up = true;
    if (e.key === "ArrowDown" || e.key === "s") spaceship.controls.down = true;
    if (e.key === "ArrowLeft" || e.key === "a") spaceship.controls.left = true;
    if (e.key === "ArrowRight" || e.key === "d") spaceship.controls.right = true;
});

window.addEventListener("keyup", e => {
    if (e.key === "ArrowUp" || e.key === "w") spaceship.controls.up = false;
    if (e.key === "ArrowDown" || e.key === "s") spaceship.controls.down = false;
    if (e.key === "ArrowLeft" || e.key === "a") spaceship.controls.left = false;
    if (e.key === "ArrowRight" || e.key === "d") spaceship.controls.right = false;
});
}

const spaceship = new Spaceship(
  canvas.width / 2,
  canvas.height - 100
);

class Explosion {
    constructor(x, y, scale = 1) {
        this.x = x;
        this.y = y;

        this.SPRITE_WIDTH = 100;
        this.SPRITE_HEIGHT = 70;
        this.TOTAL_FRAMES = 7;
        this.FRAME_SPEED = 2;

        this.currentFrame = 0;
        this.frameCounter = 0;
        this.done = false;

        const BASE_SHIP_SIZE = 80;
        this.scale = (BASE_SHIP_SIZE / this.SPRITE_WIDTH) * scale * 1.3;
    }

    update() {
        this.frameCounter++;
        if (this.frameCounter >= this.FRAME_SPEED) {
            this.currentFrame++;
            this.frameCounter = 0;
        }

        if (this.currentFrame >= this.TOTAL_FRAMES) {
            this.done = true;
        }
    }

    draw(ctx) {
        if (this.done) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.drawImage(
            explosionSprite,
            this.currentFrame * this.SPRITE_WIDTH,
            0,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            -this.SPRITE_WIDTH * this.scale / 2,
            -this.SPRITE_HEIGHT * this.scale / 2,
            this.SPRITE_WIDTH * this.scale,
            this.SPRITE_HEIGHT * this.scale
        );

        ctx.restore();
    }
}

class ScreenShake {
    constructor() {
        this.intensity = 0;
        this.duration = 0;
        this.timer = 0;
    }

    start(intensity = 8, duration = 300) {
        this.intensity = intensity;
        this.duration = duration;
        this.timer = duration;
    }

    update(deltaTime) {
        if (this.timer > 0) {
            this.timer -= deltaTime;
            if (this.timer < 0) this.timer = 0;
        }
    }

    apply(ctx) {
        if (this.timer <= 0) return;

        const progress = this.timer / this.duration;
        const currentIntensity = this.intensity * progress;

        const offsetX = (Math.random() * 2 - 1) * currentIntensity;
        const offsetY = (Math.random() * 2 - 1) * currentIntensity;

        ctx.translate(offsetX, offsetY);
    }
}
