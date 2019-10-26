import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TableTop extends Component {
  width = 128 * 5
  height = 96 * 5

  @action
  didInsertGrid(element) {
    for (let i = 0; i < 25; ++i) {
      let gridItem = document.createElement('div');
      gridItem.classList.add('table-grid-item');
      element.appendChild(gridItem);
    }
  }
}
