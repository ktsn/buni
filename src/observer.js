import { isObject } from './utils';

export function observe(seed, fn) {
  if (!isObject(seed)) return seed;

  return mapObject(seed, function observeMap(observed, key, val) {
    observeForKey(observed, key, val, fn);
  });
}

export function unobserve(data) {
  if (!isObject(data)) return data;

  return mapObject(data, function unobserveMap(unobserved, key, val) {
    unobserved[key] = unobserve(val);

    if (typeof val === 'function') {
      data[key] = null;
    }
  });
}

function observeForKey(target, key, defaultValue, fn) {
  // Actual value for key
  let val;

  Object.defineProperty(target, key, {
    enumerable: true,
    get: function observableGetter() { return val; },
    set: function observableSetter(newVal) {
      if (val === newVal) return;

      const oldVal = val;

      if (typeof newVal === 'object') {
        val = observe(newVal, (childKey, oldVal, newVal) => {
          fn(`${key}.${childKey}`, oldVal, newVal);
        });
      } else if (typeof newVal === 'function') {
        val = newVal.bind(this);
      } else {
        val = newVal;
      }

      fn(key, oldVal, val);
    }
  });

  target[key] = defaultValue;
}

function mapObject(obj, fn) {
  const result = {};

  Object.keys(obj).forEach(key => {
    fn(result, key, obj[key]);
  });

  return result;
}
