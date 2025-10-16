const options = {};

export default class Particle {
  ctx;
  width;
  height;

  x;
  y;
  radius;

  color;

  vertics = {
    x: 1,
    y: 1,
  };
  speed;
  directionAngle;

  constructor(ctx, width, height, color = "rgba(255, 255, 0, 0.5)") {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;

    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.radius = Math.random() * 40;

    this.speed = 1 + Math.random() * 1;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.vertics = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  update() {
    this.edge();
    this.x = this.x + this.vertics.x;
    this.y = this.y + this.vertics.y;
  }

  edge() {
    if (this.x <= this.radius || this.x >= this.width - this.radius) {
      this.vertics.x = -this.vertics.x;
    }

    if (this.y <= this.radius || this.y >= this.height - this.radius) {
      this.vertics.y = -this.vertics.y;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
