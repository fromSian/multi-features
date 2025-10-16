import { WIDTH, HEIGHT, SPIN_DOT_CURVE_PATH_RADIUS, GAP } from "./constants.js";
import Sphere from "./sphere.js";
import SpinDot from "./spin-dot.js";
import BackgroundDot from "./background-dot.js";

let ctx;

let animationId = null;

let spheres = [];

let background_dots = [];

const drawBackGroundDots = () => {
  background_dots = []; //

  //   return;
  const x_loop = Array.from({ length: Math.floor(WIDTH / GAP) - 1 });
  const y_loop = Array.from({ length: Math.floor(HEIGHT / GAP) - 1 });

  x_loop.forEach((_, xi) => {
    y_loop.forEach((_, yi) => {
      const x = GAP + xi * GAP;
      const y = GAP + yi * GAP;
      const dot = new BackgroundDot({ ctx, x, y });
      background_dots.push(dot);
    });
  });
};

const drawSpheres = () => {
  spheres = Array.from({ length: 1 }).map((_, i) => {
    const x = Math.random() * HEIGHT;

    const y = Math.random() * WIDTH;

    const center = { x, y };
    const dots = Array.from({ length: 8 }).map((_, i) => {
      const per_arc = (Math.PI * 2) / 8;
      return new SpinDot({
        ctx,
        x: center.x + SPIN_DOT_CURVE_PATH_RADIUS * Math.cos(per_arc * i),
        y: center.y + SPIN_DOT_CURVE_PATH_RADIUS * Math.sin(per_arc * i),
        angle: per_arc * i,
        center,
      });
    });
    return {
      sphere: new Sphere({
        ctx,
        x,
        y,
        direction: "horizontal",
      }),
      dots,
    };
  });
};

let dot;

const animate = () => {
  spheres.forEach(({ sphere, dots }) => {
    const new_center = sphere.update();
    background_dots.forEach((bd) => {
      bd.update(new_center);
      bd.draw();
    });
    sphere.draw();
    //   dots.forEach((dot) => {
    //     dot.update(new_center);
    //     dot.draw();
    //   });
  });
};

const loop = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  //   if (dot.angle > (330 * Math.PI) / 180) {
  //     cancelAnimationFrame(animationId);
  //     return;
  //   }
  animate();
  animationId = requestAnimationFrame(loop);
};

const initial = () => {
  try {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      //   ctx.globalCompositeOperation = "xor";
      drawSpheres();
      drawBackGroundDots();

      drawBackGroundDots();
      loop();
    } else {
      console.log("sorry, this environment not supported");
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = initial;
