let ctx;

const colors = ["#eee", "#cbf", "#ace", "#dae"];
let WIDTH;
let HEIGHT;

let dots = [];

const drawPoint = (x, y, color) => {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI, true);

  ctx.fillStyle = color;
  ctx.fill();
};
const initial = () => {
  const canvas = document.getElementById("canvas");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  ctx = canvas.getContext("2d");

  dots = Array.from({ length: 50 }).map((item) => {
    const dot = {
      x: Math.floor(Math.random() * WIDTH),
      y: Math.floor(Math.random() * HEIGHT),
      color: colors[Math.floor(Math.random() * 4)],
    };

    drawPoint(dot.x, dot.y, dot.color);
    return dot;
  });
};

const drawLine = (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { offsetX, offsetY } = e;

  dots.forEach((dot) => {
    drawPoint(dot.x, dot.y, dot.color);

    const distance = Math.sqrt((offsetX - dot.x) ** 2 + (offsetY - dot.y) ** 2);

    if (distance < 200) {
      ctx.strokeStyle = dot.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  });
};

const clearLine = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    drawPoint(dot.x, dot.y, dot.color);
  });
};
window.addEventListener("mousemove", drawLine);
window.addEventListener("mouseout", clearLine);
window.onload = initial;
