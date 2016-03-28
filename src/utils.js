export function isObject(val) {
  return typeof val === 'object' && val !== null;
}

export function toArray(arrayLike) {
  if (typeof Array.from === 'function') return Array.from(arrayLike);

  return Array.prototype.slice.call(arrayLike);
}
