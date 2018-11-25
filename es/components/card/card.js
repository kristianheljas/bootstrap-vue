function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { mergeData } from 'vue-functional-data-merge';

import prefixPropName from '../../utils/prefix-prop-name';
import unPrefixPropName from '../../utils/unprefix-prop-name';
import copyProps from '../../utils/copyProps';
import pluckProps from '../../utils/pluck-props';
import { assign } from '../../utils/object';
import cardMixin from '../../mixins/card-mixin';
import CardBody, { props as bodyProps } from './card-body';
import CardHeader, { props as headerProps } from './card-header';
import CardFooter, { props as footerProps } from './card-footer';
import CardImg, { props as imgProps } from './card-img';

var cardImgProps = copyProps(imgProps, prefixPropName.bind(null, 'img'));
cardImgProps.imgSrc.required = false;

export var props = assign({}, bodyProps, headerProps, footerProps, cardImgProps, copyProps(cardMixin.props), {
  align: {
    type: String,
    default: null
  },
  noBody: {
    type: Boolean,
    default: false
  }
});

export default {
  functional: true,
  props: props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;

    var $slots = slots();

    // Create placeholder elements for each section
    var imgFirst = h(false);
    var header = h(false);
    var content = h(false);
    var footer = h(false);
    var imgLast = h(false);

    if (props.imgSrc) {
      var img = h(CardImg, {
        props: pluckProps(cardImgProps, props, unPrefixPropName.bind(null, 'img'))
      });
      if (props.imgBottom) {
        imgLast = img;
      } else {
        imgFirst = img;
      }
    }

    if (props.header || $slots.header) {
      header = h(CardHeader, { props: pluckProps(headerProps, props) }, $slots.header);
    }

    if (props.noBody) {
      content = $slots.default;
    } else {
      // Wrap content in card-body
      content = [h(CardBody, { props: pluckProps(bodyProps, props) }, $slots.default)];
    }

    if (props.footer || $slots.footer) {
      footer = h(CardFooter, {
        props: pluckProps(footerProps, props)
      }, $slots.footer);
    }

    return h(props.tag, mergeData(data, {
      staticClass: 'card',
      class: (_class = {
        'flex-row': props.imgLeft || props.imgStart,
        'flex-row-reverse': (props.imgRight || props.imgEnd) && !(props.imgLeft || props.imgStart)
      }, _defineProperty(_class, 'text-' + props.align, Boolean(props.align)), _defineProperty(_class, 'bg-' + props.bgVariant, Boolean(props.bgVariant)), _defineProperty(_class, 'border-' + props.borderVariant, Boolean(props.borderVariant)), _defineProperty(_class, 'text-' + props.textVariant, Boolean(props.textVariant)), _class)
    }), [imgFirst, header].concat(_toConsumableArray(content), [footer, imgLast]));
  }
};