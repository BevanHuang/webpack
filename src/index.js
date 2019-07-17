import _ from 'lodash';
import './style/index.css'; // loader=> css-loader module, style-loader
import './style/a.scss';
import axios from 'axios';

import { d, e, f } from '@/b';

import $ from 'jquery';

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['xhxh', 'xh.', 'ltd'], '');
  // d.className = 'box';
  dom.classList.add('box');
  return dom;
}

var divDom = createDomElement();

document.body.appendChild(divDom);

console.log(12311 + 'lt');

// axios.get();

class Demo {
  show() {
    console.log('this.Age :' + this.Age);
  }

  get Age() {
    return this._age;
  }

  set Age(val) {
    this._age = val + 1;
  }
}

const d1 = new Demo();
d1.Age = 19;
d1.show();

const [a, b, c] = [1, 2, 3];
console.log('a :', a);
console.log('b :', b);
console.log('c :', c);

console.log('d :', d);
console.log('e :', e);
console.log('f :', f);

$(function() {
  console.log('jquery');

  $('.box').click(function() {
    alert(1);
  });
});
