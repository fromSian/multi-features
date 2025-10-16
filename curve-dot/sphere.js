import { WIDTH, HEIGHT, SPHERE_MOVE_LENGTH } from "./constants.js";

export default class Sphere {
  x;
  y;
  radius = 6;
  direction;

  ctx;

  constructor({ ctx, x, y, direction = "vertical" }) {
    this.ctx = ctx;
    this.x = x;

    this.y = y;
    this.direction = direction;
  }

  update() {
    let _x, _y;

    switch (this.direction) {
      case "vertical":
        _x = this.x;

        if (this.y > HEIGHT) {
          _y = 0;
        } else {
          _y = this.y + SPHERE_MOVE_LENGTH;
        }
        break;

      case "horizontal":
        _y = this.y;

        if (this.x > WIDTH) {
          _x = 0;
        } else {
          _x = this.x + SPHERE_MOVE_LENGTH;
        }
        break;
    }
    (this.x = _x), (this.y = _y);

    return { x: _x, y: _y };
  }

  draw() {
    this.ctx.beginPath();

    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);

    this.ctx.fillStyle = "green";

    this.ctx.fill();
  }
}
