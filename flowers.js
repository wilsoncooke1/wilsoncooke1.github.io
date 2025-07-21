const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let flowers = [];

function randomFlower() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    radius: 4 + Math.random() * 6,
    speed: 0.3 + Math.random() * 0.5,
    angle: Math.random() * 2 * Math.PI,
    angleSpeed: 0.005 + Math.random() * 0.01
  };
}

for (let i = 0; i < 100; i++) {
  flowers.push(randomFlower());
}

function drawFlower(flower) {
  ctx.save();
  ctx.translate(flower.x, flower.y);
  ctx.rotate(flower.angle);
  ctx.fillStyle = "#fef08a"; // soft yellow

  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.rotate((Math.PI * 2) / 5);
    ctx.ellipse(0, flower.radius, flower.radius, flower.radius / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let flower of flowers) {
    flower.y += flower.speed;
    flower.angle += flower.angleSpeed;

    if (flower.y > canvas.height + 20) {
      Object.assign(flower, randomFlower());
      flower.y = -20;
    }

    drawFlower(flower);
  }

  requestAnimationFrame(animate);
}

animate();
