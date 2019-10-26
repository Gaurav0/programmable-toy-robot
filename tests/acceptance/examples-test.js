import { module, test } from 'qunit';
import { visit, click, fillIn, settled } from '@ember/test-helpers';
import { timeout } from 'programmable-toy-robot/utils/timeout';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | examples', function(hooks) {
  setupApplicationTest(hooks);

  test('example 1', async function(assert) {
    await visit('/');

    await fillIn('.program-input', `
      PLACE 0,0,NORTH
      MOVE
      REPORT
    `);

    await click('.run-program');

    // should not be necessary
    await timeout(0);
    await settled();

    assert.dom('.program-output').hasText('0,1,NORTH');
  });

  test('example 2', async function(assert) {
    await visit('/');

    await fillIn('.program-input', `
      PLACE 0,0,NORTH
      LEFT
      REPORT
    `);

    await click('.run-program');

    // should not be necessary
    await timeout(0);
    await settled();

    assert.dom('.program-output').hasText('0,0,WEST');
  });

  test('example 3', async function(assert) {
    await visit('/');

    await fillIn('.program-input', `
      PLACE 1,2,EAST
      MOVE
      MOVE
      LEFT
      MOVE
      REPORT
    `);

    await click('.run-program');

    // should not be necessary
    await timeout(0);
    await settled();

    assert.dom('.program-output').hasText('3,3,NORTH');
  });
});
