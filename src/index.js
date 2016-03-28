import { elementBinder } from './element';
import { observe, unobserve } from './observer';

export function bind(el, data) {
  return observe(data, elementBinder(el));
}

export function unbind(boundData) {
  return unobserve(boundData);
}
