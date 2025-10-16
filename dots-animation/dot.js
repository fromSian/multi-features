export default class Dot {
  x;
  y;
  ox;
  oy;
  radius;

  color;
  default_color;
  highlight_color;

  ctx;

  // Scatter animation state
  scatter = false;
  scatterAngle = 0;
  targetAngle = 0;
  scatterProgress = 0;
  rotationDirection = 1; // 1 for clockwise, -1 for counterclockwise
  isReturning = false;
  startX = 0;
  startY = 0;
  finalX = 0;
  finalY = 0;
  finalOffset = 20; // Distance to the right for final position

  constructor(ctx, x, y, radius, color, highlight_color) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;

    this.radius = radius;

    this.color = color;
    this.default_color = color;
    this.highlight_color = highlight_color;

    this.ctx = ctx;
    
    this.scatterAngle = 0;
    this.targetAngle = 0;
    this.finalX = this.ox + this.finalOffset;
    this.finalY = this.oy;
  }

  // Update scatter direction based on sphere position and velocity
  updateScatterDirection(sphereX, sphereY, sphereVx, sphereVy) {
    const dx = this.ox - sphereX;
    const dy = this.oy - sphereY;
    
    // Use cross product to determine rotation direction
    // Cross product of velocity vector and position vector
    const cross = sphereVx * dy - sphereVy * dx;
    this.rotationDirection = cross > 0 ? 1 : -1;
    
    // Initial angle pointing away from sphere
    this.scatterAngle = Math.atan2(dy, dx);
    
    // Calculate target angle (half circle rotation)
    const rotationAmount = Math.PI; // 180 degrees
    this.targetAngle = this.scatterAngle + (rotationAmount * this.rotationDirection);
  }

  // Easing function for smooth motion (ease-in-out)
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // Animate scatter movement in smooth circular arc (half circle and back)
  animate(scatterRadius, scatterSpeed, returnSpeed, orbitSpeed) {
    if (this.isReturning) {
      this.scatterProgress = Math.max(this.scatterProgress - returnSpeed, 0);
      const t = this.easeInOutQuad(1 - this.scatterProgress);
      this.x = this.startX + (this.finalX - this.startX) * t;
      this.y = this.startY + (this.finalY - this.startY) * t;
      if (this.scatterProgress === 0) {
        this.isReturning = false;
      }
    } else if (this.scatter) {
      // Continuously update progress
      this.scatterProgress = Math.min(this.scatterProgress + scatterSpeed, 1);

      // Calculate current angle based on progress
      const angleProgress = this.easeInOutQuad(this.scatterProgress);
      const currentAngle = this.scatterAngle + 
        (this.targetAngle - this.scatterAngle) * angleProgress;

      // Calculate radius with sine wave for smooth half-circle arc
      // Peaks at the middle of the animation
      const radiusProgress = Math.sin(angleProgress * Math.PI);
      const r = scatterRadius * radiusProgress;

      this.x = this.ox + r * Math.cos(currentAngle);
      this.y = this.oy + r * Math.sin(currentAngle);
    } else {
      this.x = this.ox;
      this.y = this.oy;
    }
  }

  update() {
    this.color =
      this.color === this.highlight_color
        ? this.default_color
        : this.highlight_color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
