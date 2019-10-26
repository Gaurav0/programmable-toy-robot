import { later } from '@ember/runloop';
import { Promise } from 'rsvp';
import env from '../config/environment';

const TESTING = env.environment === 'test';

export function timeout(ms) {
  return new Promise(resolve => {
    later(resolve, TESTING ? ms : 0);
  });
}

export function rAF(ms) {
  return new Promise(resolve => {
    if (TESTING) {
      later(resolve, 0);
    } else {
      later(() => {
        requestAnimationFrame(resolve);
      }, ms);
    }
  });
}
