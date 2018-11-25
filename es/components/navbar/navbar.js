function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { mergeData } from 'vue-functional-data-merge';

export var props = {
  tag: {
    type: String,
    default: 'nav'
  },
  type: {
    type: String,
    default: 'light'
  },
  variant: {
    type: String
  },
  toggleable: {
    type: [Boolean, String],
    default: false
  },
  fixed: {
    type: String
  },
  sticky: {
    type: Boolean,
    default: false
  },
  print: {
    type: Boolean,
    default: false
  }
};

export default {
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var breakpoint = '';
    if (props.toggleable && typeof props.toggleable === 'string' && props.toggleable !== 'xs') {
      breakpoint = 'navbar-expand-' + props.toggleable;
    } else if (props.toggleable === false) {
      breakpoint = 'navbar-expand';
    }
    return h(props.tag, mergeData(data, {
      staticClass: 'navbar',
      class: (_class = {
        'd-print': props.print,
        'sticky-top': props.sticky
      }, _defineProperty(_class, 'navbar-' + props.type, Boolean(props.type)), _defineProperty(_class, 'bg-' + props.variant, Boolean(props.variant)), _defineProperty(_class, 'fixed-' + props.fixed, Boolean(props.fixed)), _defineProperty(_class, '' + breakpoint, Boolean(breakpoint)), _class),
      attrs: {
        role: props.tag === 'nav' ? null : 'navigation'
      }
    }), children);
  }
};