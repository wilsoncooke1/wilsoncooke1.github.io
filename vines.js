const canvas = document.getElementById("vines");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Each vine is an array of {x, y, angle, speed}
let vines = [];

function createVine(x) {
  return {
    path: [{ x: x, y: height }],
    angle: (Math.random() - 0.5) * 0.6,
    speed: 0.5 + Math.random() * 0.5,
    life: 0
  };
}

// Initialize vines
for (let i = 0; i < 25; i++) {
  vines.push(createVine(Math.random() * width));
}

function draw() {
  ctx.fillStyle = 'rgba(0, 255, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#0077ff';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  for (let vine of vines) {
    let last = vine.path[vine.path.length - 1];

    // Grow the vine
    let newX = last.x + Math.sin(vine.angle + vine.life * 0.02) * 2;
    let newY = last.y - vine.speed;
    vine.path.push({ x: newX, y: newY });
    vine.life += 1;

    // Stop if off screen
    if (newY < -20) {
      vine.path = [ { x: Math.random() * width, y: height } ];
      vine.angle = (Math.random() - 0.5) * 0.6;
      vine.life = 0;
    }

    // Draw the vine
    ctx.beginPath();
    ctx.moveTo(vine.path[0].x, vine.path[0].y);
    for (let pt of vine.path) {
      ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

draw();
