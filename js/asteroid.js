class Asteroid {
    constructor(canvas) {
        const spawnEdge = Math.floor(Math.random() * 3);

        if (spawnEdge === 0) {
            this.x = Math.random() * canvas.width;
            this.y = -50;
        } else if (spawnEdge === 1) {
            this.x = -50;
            this.y = Math.random() * canvas.height;
        } else {

            this.x = canvas.width + 50;
            this.y = Math.random() * canvas.height;
        }

        this.radius = Math.random() * 20 + 20;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;

        this.active = true;
    }

    update() {
        if (!this.active) return;

        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
    }

    draw(ctx) {
        if (!this.active) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = "#6B7280";
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    isOffScreen(canvas) {
        return (
            this.x < -100 ||
            this.x > canvas.width + 100 ||
            this.y < -100 ||
            this.y > canvas.height + 100
        );
    }
}
