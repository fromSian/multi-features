console.log("hiiii let me create a canvas");

const WIDTH = 600;
const HEIGHT = 600;
const GAP = 40;

const POINT_SIZE = 2;
const BUFFER = 30;

let circles = [];

let current = 0;
let times = 10;
let raf = null;

let ctx = null;

function point(x, y, radius = 1) {
  circles.push({
    x,
    y,
    radius,
  });
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = "rgb(205, 205, 205)";
  ctx.fill();
}

const animate = () => {
  if (current > times) {
    window.cancelAnimationFrame(raf);
    return;
  }

  draw(current);
  current = current + 1;

  raf = window.requestAnimationFrame(draw);
};

const draw = (align = 0) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  const x_loop = Array.from({ length: WIDTH / GAP - 1 });
  const y_loop = Array.from({ length: HEIGHT / GAP - 1 });
  circles = [];

  x_loop.forEach((_, xi) => {
    y_loop.forEach((_, yi) => {
      point(GAP + xi * GAP, GAP + yi * GAP, POINT_SIZE + align);
    });
  });
};

function isIntersect(point, circle, buffer = 0) {
  return (
    Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) <
    circle.radius + buffer
  );
}

const mousemove = (e) => {
  console.log(e);

  const { offsetX, offsetY } = e;

  circles.forEach((circle) => {
    if (isIntersect({ x: offsetX, y: offsetX }, circle, BUFFER)) {
      console.log("click on circle: ", circle.x, circle.y);
    }
  });
};

const initial = () => {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    // drawing code here
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    canvas.addEventListener("click", mousemove);
    draw();
    animate();
  } else {
    console.log("sorry, this environment not supported");
  }
};

import Particle from "./partical.js";

let particles = [];
const AMOUNT = 1;

const drawParticles = () => {
  draw();

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

};
let loopId = "";
const loop = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawParticles();
  loopId = requestAnimationFrame(loop);
};

const initialParticle = () => {
  try {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      // drawing code here
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      for (let i = 0; i < AMOUNT; i++) {
        particles.push(new Particle(ctx, WIDTH, HEIGHT));
      }
      loop();
    } else {
      console.log("sorry, this environment not supported");
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = initialParticle;
