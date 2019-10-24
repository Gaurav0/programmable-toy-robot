import { later } from '@ember/runloop';
import { Promise } from 'rsvp';

export function timeout(ms) {
  return new Promise(resolve => {
    later(resolve, ms);
  });
}
