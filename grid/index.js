import Grid from "./grid.js";
import { RECT_SIZE } from "./constant.js";

let ctx;

const colors = ["#eee", "#cbf", "#ace", "#dae"];
let WIDTH;
let HEIGHT;

let grids = [];

const initial = () => {
  const canvas = document.getElementById("canvas");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  ctx = canvas.getContext("2d");

  const size = Math.ceil(WIDTH / 40);

  const x_loop = Array.from({ length: 40 });
  const y_loop = Array.from({ length: Math.floor(HEIGHT / size) });

  x_loop.forEach((_, xi) => {
    y_loop.forEach((_, yi) => {
      const x = xi * size;
      const y = yi * size;
      const grid = new Grid({ ctx, x, y, size });
      grids.push(grid);
      grid.draw();
    });
  });
};

const handleMouseOver = (e) => {
  const { offsetX, offsetY } = e;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  grids.forEach((grid) => {
    grid.changeColor({
      x: offsetX,
      y: offsetY,
    });
    grid.draw();
  });
};

const handleMouseOut = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  grids.forEach((grid) => {
    grid.opacity = 0
    grid.draw();
  });
};

window.addEventListener("mousemove", handleMouseOver);
window.addEventListener("mouseout", handleMouseOut);

window.onload = initial;
