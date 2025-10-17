import { getDistance } from "../collision/common.js";
import {
  SPIN_DOT_CURVE_PATH_RADIUS,
  ANGLE,
  GAP,
  SPIN_DOT_PER_DEGREE,
} from "./constants.js";

export default class BackgroundDot {
  ctx;
  x;
  y;
  radius = 2;

  color;

  angle;

  center = {
    x: 0,
    y: 0,
  };

  ox;
  oy;

  running = false;

  constructor({ ctx, x, y }) {
    this.ctx = ctx;
    this.x = x;

    this.y = y;

    this.ox = x;
    this.oy = y;
    this.color = "gray";
  }

  spinCounterClockWise() {
    this.running = true;

    this.angle = this.angle - (1 * Math.PI) / 180;
    this.x = this.center.x + GAP * Math.cos(this.angle);

    this.y = this.center.y + GAP * Math.sin(this.angle);
    if (this.angle < -2 * Math.PI + ANGLE) {
      this.angle = Math.PI / 2 - ANGLE / 2;
      this.running = false;
    }
  }
  spinClockWise() {
    this.running = true;
    this.angle = this.angle + (1 * Math.PI) / 180;
    this.x = this.center.x + GAP * Math.cos(this.angle);

    this.y = this.center.y + GAP * Math.sin(this.angle);
    if (this.angle > 2 * Math.PI - ANGLE) {
      this.angle = Math.PI / 2 - ANGLE / 2;
      this.running = false;
    }
  }
  update(center) {
    if (
      getDistance({ x: this.ox, y: this.oy }, center) <
        SPIN_DOT_CURVE_PATH_RADIUS + 3 + 6 ||
      this.running
    ) {
      // 0 at the top, 1 at the bottom
      let direction = this.oy <= center.y ? 0 : 1;
      this.color = direction ? "blue" : "red";

      if (!this.running) {
        this.angle = (direction ? -1 : 1) * (Math.PI / 2 - ANGLE / 2);
      }

      this.center = {
        x: this.ox - GAP * Math.sin(ANGLE / 2),
        y:
          this.oy <= center.y
            ? this.oy - GAP * Math.cos(ANGLE / 2)
            : this.oy + GAP * Math.cos(ANGLE / 2),
      };

      // this.drawCenter();

      direction ? this.spinClockWise() : this.spinCounterClockWise();
    } else {
      this.color = "gray";
      //   this.x = this.ox - GAP;
      //   this.y = this.oy;
    }
  }

  drawCenter() {
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, 4, 0, 2 * Math.PI, true);

    this.ctx.fillStyle = "red";

    this.ctx.fill();
  }
  draw() {
    this.ctx.beginPath();

    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fillStyle = this.color;

    this.ctx.fill();
  }
}
