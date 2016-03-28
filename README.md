# buni

A tiny and uni-directional data binding library

## Usage

Demo: http://codepen.io/ktsn/pen/GZEXYZ

```html
<!-- HTML -->
<div id="wrapper">
  <!--
    Bind text value to value attribute
    and listen input event by onInput handler
  -->
  <input type="text" :value="text" @input="onInput">

  <!-- Bind text value to its child content -->
  <span $="text"></span>
</div>
```

```js
// JavaScript
import { bind, unbind } from 'buni';

const wrapper = document.getElementById('wrapper');

// Bind data to DOM elements and return bound data
const boundData = bind(wrapper, {
  text: 'Input text',
  onInput: function(event) {
    this.text = event.target.value;
  }
});

// Unbind
const unboundData = unbind(boundData);
```

## License

MIT
