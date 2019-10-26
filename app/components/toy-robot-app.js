import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ProgramRunner from '../classes/program-runner';

export default class ToyRobotApp extends Component {
  @tracked output = ''
  context = null

  @action
  runProgram(program) {
    let runner = new ProgramRunner(this.context);
    runner.run(program).then(output => {
      this.output = output;
    });
  }

  @action
  didInsertCanvas(element) {
    this.context = element.getContext('2d');
  }
}
