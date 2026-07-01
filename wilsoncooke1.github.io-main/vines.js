const canvas = document.getElementById("vines");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function lerpColor(color1, color2, t) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 255;
  const g1 = (c1 >> 8) & 255;
  const b1 = c1 & 255;

  const r2 = (c2 >> 16) & 255;
  const g2 = (c2 >> 8) & 255;
  const b2 = c2 & 255;

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

// Vine settings
const MAX_PATH_LENGTH = 50;
const VINE_COUNT = 30;

let vines = [];

function createVine(x) {
  let angle = (Math.random() - 0.5) * 0.6;
  let speed = 1 + Math.random() * 0.5;

  let path = [];
  let start = { x: x, y: height };
  path.push(start);

  return {
    path,
    angle,
    speed,
    colorShift: Math.random(),
  };
}

for (let i = 0; i < VINE_COUNT; i++) {
  vines.push(createVine(Math.random() * width));
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  for (let vine of vines) {
    let last = vine.path[vine.path.length - 1];

    // More erratic angle changes
    vine.angle += (Math.random() - 0.5) * 0.2;

    let newX = last.x + Math.sin(vine.angle) * 2;
    let newY = last.y - vine.speed;

    vine.path.push({ x: newX, y: newY });

    if (vine.path.length > MAX_PATH_LENGTH) {
      vine.path.shift();
    }

    // If off screen, reset
    if (newY < -20 || newX < 0 || newX > width) {
      let index = vines.indexOf(vine);
      vines[index] = createVine(Math.random() * width);
      continue;
    }

    // Draw segments with gradient
    for (let i = 0; i < vine.path.length - 1; i++) {
      const a = vine.path[i];
      const b = vine.path[i + 1];
      const t = (vine.colorShift + i / vine.path.length) % 1;
      ctx.strokeStyle = lerpColor('#0077ff', '#00ff77', t);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  requestAnimationFrame(draw);
}

draw();
