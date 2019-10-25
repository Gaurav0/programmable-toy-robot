import { later } from '@ember/runloop';
import { Promise } from 'rsvp';

export function timeout(ms) {
  return new Promise(resolve => {
    later(resolve, ms);
  });
}

export function rAF(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      requestAnimationFrame(resolve);
    }, ms);
  });
}
