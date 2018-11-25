var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { mergeData } from 'vue-functional-data-merge';
import InputGroupAddon, { commonProps } from './input-group-addon';

export default {
  functional: true,
  props: commonProps,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    // pass all our props/attrs down to child, and set`append` to false
    return h(InputGroupAddon, mergeData(data, {
      props: _extends({}, props, { append: false })
    }), children);
  }
};