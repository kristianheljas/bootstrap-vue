function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { mergeData } from 'vue-functional-data-merge';
import stripScripts from '../../utils/strip-scripts';
import InputGroupPrepend from './input-group-prepend';
import InputGroupAppend from './input-group-append';
import InputGroupText from './input-group-text';

import './input-group.css';

export var props = {
  id: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: null
  },
  prepend: {
    type: String,
    default: null
  },
  append: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  }
};

export default {
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;

    var $slots = slots();

    var childNodes = [];

    // Prepend prop
    if (props.prepend) {
      childNodes.push(h(InputGroupPrepend, [h(InputGroupText, { domProps: { innerHTML: stripScripts(props.prepend) } })]));
    } else {
      childNodes.push(h(false));
    }

    // Prepend slot
    if ($slots.prepend) {
      childNodes.push(h(InputGroupPrepend, $slots.prepend));
    } else {
      childNodes.push(h(false));
    }

    // Default slot
    if ($slots.default) {
      childNodes.push.apply(childNodes, _toConsumableArray($slots.default));
    } else {
      childNodes.push(h(false));
    }

    // Append prop
    if (props.append) {
      childNodes.push(h(InputGroupAppend, [h(InputGroupText, { domProps: { innerHTML: stripScripts(props.append) } })]));
    } else {
      childNodes.push(h(false));
    }

    // Append slot
    if ($slots.append) {
      childNodes.push(h(InputGroupAppend, $slots.append));
    } else {
      childNodes.push(h(false));
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'input-group',
      class: _defineProperty({}, 'input-group-' + props.size, Boolean(props.size)),
      attrs: {
        id: props.id || null,
        role: 'group'
      }
    }), childNodes);
  }
};