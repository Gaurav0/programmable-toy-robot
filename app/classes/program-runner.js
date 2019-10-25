import ToyRobot, { NORTH, SOUTH, EAST, WEST } from './toy-robot';
import { timeout } from '../utils/timeout';

const dirMap ={
  'NORTH': NORTH,
  'SOUTH': SOUTH,
  'EAST': EAST,
  'WEST': WEST
};

let reverseDirMap = {}
Object.entries(dirMap).forEach(([str, num]) => {
  reverseDirMap[num] = str;
});

const TIMEOUT = 600;

export default class ProgramRunner {
  isPlaced = false
  toyRobot = null

  constructor(context) {
    this.context = context;
  }

  async run(program) {
    const instructions = program.split('\n');
    let output = '';
    for (let instruction of instructions) {
      await timeout(TIMEOUT);
      const words = instruction.split(' ');
      try {
        switch(words[0].toUpperCase()) {
          case 'PLACE':
            await this.place(words.slice(1).join(' '));
            break;
          case 'LEFT':
            this.rotateLeft();
            break;
          case 'RIGHT':
            this.rotateRight();
            break;
          case 'MOVE':
            await this.moveForward();
            break;
          case 'REPORT':
            output += this.report();
            break;
          default:
            throw new Error(`Syntax Error: instruction ${words[0]} not recognized`);
        }
      } catch (error) {
        output += error.message;
        return output;
      }
    }
    return output;
  }

  async place(words) {
    const args = words.split(',').map(s => s.trim());
    if (args.length !== 3) {
      throw new Error('Syntax Error: PLACE requires 3 arguments');
    }
    const [x, y, dir] = args;
    const f = dirMap[dir.toUpperCase()];
    this.toyRobot = new ToyRobot(this.context, x, 4 - y, f);
    await this.toyRobot.load();
    this.toyRobot.plot();
    this.isPlaced = true;
  }

  rotateLeft() {
    if (!this.isPlaced) {
      return;
    }
    this.toyRobot.dir = (this.toyRobot.dir + 1) % 4;
    this.toyRobot.plot();
  }

  rotateRight() {
    if (!this.isPlaced) {
      return;
    }
    this.toyRobot.dir = (this.toyRobot.dir - 1 + 4) % 4;
    this.toyRobot.plot();
  }

  async moveForward() {
    if (!this.isPlaced) {
      return;
    }
    let { x, y, dir } = this.toyRobot;
    switch(dir) {
      case NORTH:
        y -= 1;
        break;
      case EAST:
        x += 1;
        break;
      case WEST:
        x -= 1;
        break;
      case SOUTH:
        y += 1;
        break;
    }
    await this.toyRobot.walkTo(x, y);
  }

  report() {
    let { x, y, dir } = this.toyRobot;
    let f = reverseDirMap[dir];
    return `${x},${4 - y},${f}`;
  }
}
