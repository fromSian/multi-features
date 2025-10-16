import {
  SPIN_DOT_CURVE_PATH_RADIUS,
  SPIN_DOT_PER_DEGREE,
} from "./constants.js";

export default class SpinDot {
  ctx;

  x;
  y;
  radius = 2;
  angle = 0;

  curve_path_center = {
    x: 0,
    y: 0,
  };

  constructor({ ctx, x, y, center, angle }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.angle = angle;

    this.curve_path_center = center;
  }

  update(center) {
    this.curve_path_center = center;
    // Increment the angle for continuous rotation
    this.angle += SPIN_DOT_PER_DEGREE;

    // Calculate new position using parametric equations for a circle
    this.x =
      this.curve_path_center.x +
      SPIN_DOT_CURVE_PATH_RADIUS * Math.cos(this.angle);
    this.y =
      this.curve_path_center.y +
      SPIN_DOT_CURVE_PATH_RADIUS * Math.sin(this.angle);
  }

  draw() {
    this.ctx.beginPath();

    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);

    this.ctx.fillStyle = "green";

    this.ctx.fill();
  }
}
