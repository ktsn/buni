const ATTR_WITH_PROPS_RE = /^(?:value|checked|selected|muted)$/;

function attrBinder(el, binding, oldVal, newVal) {
  const { boundAttrName } = binding;

  if (ATTR_WITH_PROPS_RE.test(boundAttrName) && boundAttrName in el) {
    if (el[boundAttrName] !== newVal) {
      el[boundAttrName] = newVal;
    }
    return;
  }

  if (newVal != null && newVal !== false) {
    el.setAttribute(boundAttrName, newVal);
  } else {
    el.removeAttribute(boundAttrName);
  }
}

function eventBinder(el, binding, oldVal, newVal) {
  const { boundAttrName } = binding;

  el.removeEventListener(boundAttrName, oldVal);
  el.addEventListener(boundAttrName, newVal);
}

function textBinder(el, binding, oldVal, newVal) {
  el.textContent = newVal;
}

export function createBinder(el, attr) {
  const binding = {
    attr: attr
  };

  if (attr.name[0] === ':') {
    binding.binder = attrBinder;
    binding.boundAttrName = attr.name.slice(1);
  } else if (attr.name[0] === '@') {
    binding.binder = eventBinder;
    binding.boundAttrName = attr.name.slice(1);
  } else if (attr.name === '$') {
    binding.binder = textBinder;
  } else {
    return null;
  }

  const boundDataPath = attr.value.trim();
  el.removeAttribute(attr.name);

  return function(updatePath, oldVal, newVal) {
    if (updatePath !== boundDataPath) return;
    binding.binder(el, binding, oldVal, newVal);
  };
}
