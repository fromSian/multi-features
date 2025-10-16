import { getDistance, handleCollision } from "./common.js";

let ctx;
let dots;

let WIDTH;
let HEIGHT;

const colors = ["#eee", "#cbf", "#ace", "#dae"];

const drawPoint = (x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, true);

  ctx.fillStyle = color;
  ctx.fill();
};

const generateDots = () => {
  dots = [];
  Array.from({ length: 4 }).forEach((item, i) => {
    let x = Math.floor(Math.random() * WIDTH);
    let y = Math.floor(Math.random() * HEIGHT);
    let radius = Math.floor(Math.random() * 100);
    if (i !== 0) {
      for (let j = 0; j < dots.length; j++) {
        let d = dots[j];

        const distance = getDistance(d, { x, y });

        if (distance < d.radius + radius) {
          x = Math.floor(Math.random() * WIDTH);
          y = Math.floor(Math.random() * HEIGHT);
          j = -1;
        }
      }
    }

    const dot = {
      id: i,
      x,
      y,
      radius,
      mass: Math.floor(Math.random() * 20),
      color: colors[Math.floor(Math.random() * 4)],
      velocity: { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 },
      update() {
        if (this.x <= this.radius || this.x >= WIDTH - this.radius) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.y <= this.radius || this.y >= HEIGHT - this.radius) {
          this.velocity.y = -this.velocity.y;
        }

        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

        dots
          .filter((item) => item.id !== this.id)
          .forEach((d) => {
            handleCollision(this, d);
            // if (getDistance(this, d) <= d.radius + this.radius) {
            // }
          });
      },
    };
    drawPoint(dot.x, dot.y, dot.radius, dot.color);
    dots.push(dot);
  });
};

let animationId = null;
const loop = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  dots.forEach((dot) => {
    dot.update();
    drawPoint(dot.x, dot.y, dot.radius, dot.color);
  });
  animationId = requestAnimationFrame(loop);
};
const initial = () => {
  const canvas = document.getElementById("canvas");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  ctx = canvas.getContext("2d");
  generateDots();
  loop();
};

window.onload = initial;
