import { insideRect } from "./common.js";

export default class Grid {
  ctx;
  x;
  y;
  size;
  opacity = 0;
  fill_color = "102 204 0";

  constructor({ ctx, x, y, size }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "blue";
    this.ctx.fillStyle = `rgb(${this.fill_color} / ${this.opacity})`;

    this.ctx.rect(this.x, this.y, this.size, this.size);

    this.ctx.fill();
    this.ctx.stroke();
  }

  changeColor(e) {
    if (insideRect(e, this)) {
      this.opacity = this.opacity > 0.9 ? 1 : this.opacity + 0.5;
    } else {
      this.opacity = this.opacity < 0.1 ? 0 : this.opacity - 0.01;
    }
  }
}
