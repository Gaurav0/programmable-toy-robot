import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ProgramInput extends Component {
  program = ''

  @action
  didInsertTextarea(element) {
    element.value = '';
  }
}
