var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { mergeData } from 'vue-functional-data-merge';
import InputGroupText from './input-group-text';

export var commonProps = {
  id: {
    type: String,
    default: null
  },
  tag: {
    type: String,
    default: 'div'
  },
  isText: {
    type: Boolean,
    default: false
  }
};

export default {
  functional: true,
  props: _extends({}, commonProps, {
    append: {
      type: Boolean,
      default: false
    }
  }),
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    return h(props.tag, mergeData(data, {
      class: {
        'input-group-append': props.append,
        'input-group-prepend': !props.append
      },
      attrs: {
        id: props.id
      }
    }), props.isText ? [h(InputGroupText, children)] : children);
  }
};