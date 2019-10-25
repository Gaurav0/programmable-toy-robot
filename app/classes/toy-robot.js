import { rAF } from '../utils/timeout';

export const NORTH = 2;
export const EAST = 1;
export const SOUTH = 0;
export const WEST = 3;

export const TIMEOUT = 1000 / 12;

export default class ToyRobot {
  constructor(context, x, y, dir) {
    this.context = context;
    this.x = +x;
    this.y = +y;
    this.dir = dir;
    this.img = new Image();
    this.img.src = '/assets/images/toy-robot.png';
  }

  load() {
    return new Promise(resolve => {
      this.img.onload = resolve;
    });
  }

  plot(frame = 3, posX, posY) {
    if (posX === undefined) {
      posX = this.x;
    }
    if (posY === undefined) {
      posY = this.y;
    }
    const sw = 32;
    const sh = 64;
    const sx = 33 * frame + 1;
    const sy = 65 * this.dir + 1;
    const dw = 32;
    const dh = 64;
    const dx = posX * 128 + 48;
    const dy = posY * 96 + 16;
    this.context.clearRect(0, 0, 128 * 5, 96 * 5);
    this.context.drawImage(this.img, sx, sy, sw, sh, dx | 0, dy | 0, dw, dh);
  }

  async walkTo(newX, newY, frames = 8) {
    const startX = this.x;
    const startY = this.y;
    const stepX = (newX - startX) / frames;
    const stepY = (newY - startY) / frames;
    for (let i = 0; i < frames; i++) {
      await rAF(TIMEOUT);
      const frame = i % 4;
      const posX = (startX + (i + 1) * stepX);
      const posY = (startY + (i + 1) * stepY);
      this.plot(frame, posX, posY);
    }
    this.x = newX;
    this.y = newY;
  }
}

