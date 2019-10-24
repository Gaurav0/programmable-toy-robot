import Component from '@glimmer/component';
import { action } from '@ember/object';
import ProgramRunner from '../classes/program-runner';

export default class ToyRobotApp extends Component {
  @action
  runProgram(program) {
    new ProgramRunner().run(program);
  }
}
