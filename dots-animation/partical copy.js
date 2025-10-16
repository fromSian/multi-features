class Particle {
  x;
  y;
  color;
  radius;
  speed;
  directionAngle;
  vector;
  ctx;
  w;
  h;

  constructor(ctx, w, h) {
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.color = "blue";
    this.radius = 20 + Math.random() * 1;
    this.speed = 1 + Math.random() * 1;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  update() {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  border() {
    if (this.x >= this.w || this.x <= 0) this.vector.x *= -1;
    if (this.y >= this.h || this.y <= 0) this.vector.y *= -1;
    if (this.x >= this.w) this.x = this.w;
    if (this.y >= this.h) this.y = this.h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

export default Particle;
