function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { mergeData } from 'vue-functional-data-merge';
import prefixPropName from '../../utils/prefix-prop-name';
import copyProps from '../../utils/copyProps';
import { assign } from '../../utils/object';
import stripScripts from '../../utils/strip-scripts';
import cardMixin from '../../mixins/card-mixin';

export var props = assign({},
// Import common card props and prefix them with `body-`
copyProps(cardMixin.props, prefixPropName.bind(null, 'body')), {
  bodyClass: {
    type: [String, Object, Array],
    default: null
  },
  title: {
    type: String,
    default: null
  },
  titleTag: {
    type: String,
    default: 'h4'
  },
  subTitle: {
    type: String,
    default: null
  },
  subTitleTag: {
    type: String,
    default: 'h6'
  },
  overlay: {
    type: Boolean,
    default: false
  }
});

export default {
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _ref2;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    var cardTitle = h(false);
    var cardSubTitle = h(false);
    var cardContent = children || [h(false)];

    if (props.title) {
      cardTitle = h(props.titleTag, {
        staticClass: 'card-title',
        domProps: { innerHTML: stripScripts(props.title) }
      });
    }

    if (props.subTitle) {
      cardSubTitle = h(props.subTitleTag, {
        staticClass: 'card-subtitle mb-2 text-muted',
        domProps: { innerHTML: stripScripts(props.subTitle) }
      });
    }

    return h(props.bodyTag, mergeData(data, {
      staticClass: 'card-body',
      class: [(_ref2 = {
        'card-img-overlay': props.overlay
      }, _defineProperty(_ref2, 'bg-' + props.bodyBgVariant, Boolean(props.bodyBgVariant)), _defineProperty(_ref2, 'border-' + props.bodyBorderVariant, Boolean(props.bodyBorderVariant)), _defineProperty(_ref2, 'text-' + props.bodyTextVariant, Boolean(props.bodyTextVariant)), _ref2), props.bodyClass || {}]
    }), [cardTitle, cardSubTitle].concat(_toConsumableArray(cardContent)));
  }
};