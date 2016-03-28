import { toArray } from './utils';
import { createBinder } from './binders';

export function elementBinder(el) {
  const children = toArray(el.children);
  const childrenBinders = children.map(elementBinder);
  const targetBinders = toArray(el.attributes).map(attr => createBinder(el, attr));

  const binders = targetBinders.concat(childrenBinders);

  return composeBinders(binders);
}

function composeBinders(binders) {
  const filtered = binders.filter(Boolean);

  if (filtered.length === 0) return null;

  return function composedBinder(...args) {
    filtered.forEach(fn => fn(...args));
  };
}
