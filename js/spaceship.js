const spaceshipIdleImg = new Image();
spaceshipIdleImg.src = "./assets/spacesprite-idle.png";

const spaceshipMovingImg = new Image();
spaceshipMovingImg.src = "./assets/spacesprite-moving.png";

function drawSpaceship(x, y, scale = 1, rotation = 0, moving = false) {
    const img = moving ? spaceshipMovingImg : spaceshipIdleImg;
    if (!img.complete) return;

    const width = img.width * scale;
    const height = img.height * scale;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation - Math.PI / 2);

    ctx.drawImage(
        img,
        -width / 2,
        -height / 2,
        width,
        height
    );

    ctx.restore();
}
