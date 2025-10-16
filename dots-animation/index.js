import Dot from "./dot.js";

const WIDTH = 600;
const HEIGHT = 600;
const GAP = 40;
const DOT_SIZE = 2;
const SCATTER_RADIUS = 80; // Bigger circular path
const SCATTER_SPEED = 0.02; // Slower for smoother expansion
const RETURN_SPEED = 0.02; // Slower for smoother return
const SCATTER_ORBIT_SPEED = 0.02; // Slower orbit rotation

let ctx;
let loopId;

const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

let dots = [];

// Floating sphere with random velocity and elastic collision
const sphere = {
  x: CENTER_X,
  y: CENTER_Y,
  radius: 12,
  vx: 0,
  vy: 0,
  init() {
    // Randomly choose vertical or horizontal movement
    const isHorizontal = Math.random() > 0.5;
    const speed = 2;

    if (isHorizontal) {
      this.vx = Math.random() > 0.5 ? speed : -speed; // Move left or right
      this.vy = 0;
    } else {
      this.vx = 0;
      this.vy = Math.random() > 0.5 ? speed : -speed; // Move up or down
    }
  },
  update() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Elastic collision with borders
    if (this.x - this.radius <= 0 || this.x + this.radius >= WIDTH) {
      this.vx = -this.vx;
      this.x = Math.max(this.radius, Math.min(WIDTH - this.radius, this.x));
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= HEIGHT) {
      this.vy = -this.vy;
      this.y = Math.max(this.radius, Math.min(HEIGHT - this.radius, this.y));
    }
  },
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(70, 119, 64, 0.7)";
    ctx.fill();
    ctx.restore();
  }
};

// Create grid of dots, each with origin and scatter state
const drawDots = () => {
  dots = [];
  const x_loop = Array.from({ length: Math.floor(WIDTH / GAP) - 1 });
  const y_loop = Array.from({ length: Math.floor(HEIGHT / GAP) - 1 });

  x_loop.forEach((_, xi) => {
    y_loop.forEach((_, yi) => {
      const ox = GAP + xi * GAP;
      const oy = GAP + yi * GAP;
      const dot = new Dot(ctx, ox, oy, DOT_SIZE, "rgba(70, 119, 64, 0.5)", "rgba(255, 0, 255, 0.5)");
      dot.ox = ox; // origin x
      dot.oy = oy; // origin y
      dot.scatter = false;
      dot.scatterAngle = Math.random() * Math.PI * 2;
      dot.scatterOrbitAngle = dot.scatterAngle;
      dot.scatterProgress = 0; // 0: at origin, 1: fully scattered
      dots.push(dot);
    });
  });
};

const updateDots = () => {
  dots.forEach(dot => {
    // Distance to sphere
    const dx = dot.ox - sphere.x;
    const dy = dot.oy - sphere.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // If close to sphere, scatter
    if (dist < sphere.radius + 30) {
      if (!dot.scatter) {
        // Pass sphere velocity to determine scatter direction
        dot.updateScatterDirection(sphere.x, sphere.y, sphere.vx, sphere.vy);
      }
      dot.scatter = true;
    } else {
      if (dot.scatter) {
        // Start returning to final position
        dot.scatter = false;
        dot.isReturning = true;
        dot.startX = dot.x;
        dot.startY = dot.y;
        dot.scatterProgress = 1;
      }
    }

    // Use the animate method with orbit speed
    dot.animate(SCATTER_RADIUS, SCATTER_SPEED, RETURN_SPEED, SCATTER_ORBIT_SPEED);
  });
};

const loop = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  sphere.update();
  sphere.draw(ctx);

  updateDots();
  dots.forEach(dot => dot.draw());

  loopId = requestAnimationFrame(loop);
};

const initialParticle = () => {
  try {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      sphere.init(); // Initialize sphere movement direction
      drawDots();
      loop();
    } else {
      console.log("sorry, this environment not supported");
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = initialParticle;
