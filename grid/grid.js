import { insideRect } from "./common.js";

export default class Grid {
  ctx;
  x;
  y;
  size;
  opacity = 0;
  fill_color = "0 0 255";

  constructor({ ctx, x, y, size }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#ebf8e1";
    this.ctx.fillStyle = `rgb(${this.fill_color} / ${this.opacity})`;

    this.ctx.rect(this.x, this.y, this.size, this.size);

    this.ctx.fill();
    this.ctx.stroke();
  }

  changeColor(e) {
    if (insideRect(e, this)) {
      this.opacity = this.opacity >= 0.6 ? 0.6 : this.opacity + 0.3;
    } else {
      this.opacity = this.opacity < 0.1 ? 0 : this.opacity - 0.02;
    }
  }
}
