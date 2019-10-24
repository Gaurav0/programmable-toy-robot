import ToyRobot, { NORTH, SOUTH, EAST, WEST } from './toy-robot';

const dirMap ={
  'NORTH': NORTH,
  'SOUTH': SOUTH,
  'EAST': EAST,
  'WEST': WEST
};

export default class ProgramRunner {
  isPlaced = false
  toyRobot = null

  constructor(context) {
    this.context = context;
  }

  run(program) {
    const instructions = program.split('\n');
    instructions.forEach(instruction => {
      const words = instruction.split(' ');
      if (words[0] === 'PLACE') {
        const args = words[1].split(',').map(s => s.trim());
        const [x, y, dir] = args;
        const f = dirMap(dir.toUpperCase());
        this.toyRobot = new ToyRobot(this.context, x, y, f);
      }
    });
  }
}
