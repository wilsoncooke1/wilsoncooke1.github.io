const canvas = document.getElementById("vines");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function lerpColor(color1, color2, t) {
  // Linearly interpolate between two colors
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

let vines = [];

function createVine(x) {
  return {
    path: [{ x: x, y: height }],
    angle: (Math.random() - 0.5) * 0.6,
    speed: 0.5 + Math.random() * 0.5,
    life: 0,
    colorShift: Math.random() // Controls where this vine is on the blue→green spectrum
  };
}

for (let i = 0; i < 30; i++) {
  vines.push(createVine(Math.random() * width));
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  for (let vine of vines) {
    let last = vine.path[vine.path.length - 1];

    // Grow
    let newX = last.x + Math.sin(vine.angle + vine.life * 0.02) * 2;
    let newY = last.y - vine.speed;
    vine.path.push({ x: newX, y: newY });
    vine.life += 1;

    if (newY < -20) {
      vine.path = [{ x: Math.random() * width, y: height }];
      vine.angle = (Math.random() - 0.5) * 0.6;
      vine.life = 0;
      vine.colorShift = Math.random();
    }

    // Color gradient along path
    ctx.beginPath();
    for (let i = 0; i < vine.path.length - 1; i++) {
      const a = vine.path[i];
      const b = vine.path[i + 1];
      let t = i / vine.path.length;
      ctx.strokeStyle = lerpColor('#0077ff', '#00ff77', (vine.colorShift + t) % 1);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  requestAnimationFrame(draw);
}

draw();
