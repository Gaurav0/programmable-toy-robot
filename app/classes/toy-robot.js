import { timeout } from '../utils/timeout';

export const NORTH = 2;
export const EAST = 1;
export const SOUTH = 0;
export const WEST = 3;

export const TIMEOUT = 1000 / 24;

export default class ToyRobot {
  constructor(context, x, y, dir) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.img = new Image();
    this.img.src = '/assets/images/toy-robot.png';
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
    const sx = 32 * frame;
    const sy = 64 * this.dir;
    const dw = 64;
    const dh = 128;
    const dx = posX * 64 + 16;
    const dy = posY * 192 + 32;
    this.context.drawImage(this.img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  async walkTo(newX, newY, frames = 8) {
    const startX = this.x * 64 + 16;
    const startY = this.y * 192 + 32;
    const stepX = (newX - startX) / frames;
    const stepY = (newY - startY) / frames;
    for (let i = 0; i < frames; i++) {
      await timeout(TIMEOUT);
      const frame = i % 4;
      const posX = startX + (i + 1) * stepX;
      const posY = startY + (i + 1) * stepY;
      this.plot(frame, posX, posY);
    }
    this.x = newX;
    this.y = newY;
  }
}

