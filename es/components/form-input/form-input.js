var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import idMixin from '../../mixins/id';
import formMixin from '../../mixins/form';
import formSizeMixin from '../../mixins/form-size';
import formStateMixin from '../../mixins/form-state';
import formTextMixin from '../../mixins/form-text';
import formSelectionMixin from '../../mixins/form-selection';
import formValidityMixin from '../../mixins/form-validity';
import { arrayIncludes } from '../../utils/array';
import { eventOn, eventOff } from '../../utils/dom';

import './form-input.css';

// Valid supported input types
var TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week'];

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formTextMixin, formSelectionMixin, formValidityMixin],
  render: function render(h) {
    var self = this;
    return h('input', {
      ref: 'input',
      class: self.computedClass,
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: self.localValue,
        expression: 'localValue'
      }],
      attrs: {
        id: self.safeId(),
        name: self.name,
        form: self.form || null,
        type: self.localType,
        disabled: self.disabled,
        placeholder: self.placeholder,
        required: self.required,
        autocomplete: self.autocomplete || null,
        readonly: self.readonly || self.plaintext,
        min: self.min,
        max: self.max,
        step: self.step,
        'aria-required': self.required ? 'true' : null,
        'aria-invalid': self.computedAriaInvalid
      },
      domProps: {
        value: self.localValue
      },
      on: _extends({}, self.$listeners, {
        input: self.onInput,
        change: self.onChange,
        blur: self.onBlur
      })
    });
  },

  props: {
    type: {
      type: String,
      default: 'text',
      validator: function validator(type) {
        return arrayIncludes(TYPES, type);
      }
    },
    noWheel: {
      // Disable mousewheel to prevent wheel from changing values (i.e. number/date).
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    localType: function localType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text';
    }
  },
  mounted: function mounted() {
    this.setWheelStopper(this.noWheel);
  },
  deactivated: function deactivated() {
    // Turn off listeners when keep-alive component deactivated
    /* istanbul ignore next */
    this.setWheelStopper(false);
  },
  activated: function activated() {
    // Turn on listeners (if no-wheel) when keep-alive component activated
    /* istanbul ignore next */
    this.setWheelStopper(this.noWheel);
  },
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore next */
    this.setWheelStopper(false);
  },

  watch: {
    noWheel: function noWheel(newVal) {
      this.setWheelStopper(newVal);
    }
  },
  methods: {
    setWheelStopper: function setWheelStopper(on) {
      var input = this.$el;
      // We use native events, so that we don't interfere with propgation
      if (on) {
        eventOn(input, 'focus', this.onWheelFocus);
        eventOn(input, 'blur', this.onWheelBlur);
      } else {
        eventOff(input, 'focus', this.onWheelFocus);
        eventOff(input, 'blur', this.onWheelBlur);
        eventOff(document, 'wheel', this.stopWheel);
      }
    },
    onWheelFocus: function onWheelFocus(evt) {
      eventOn(document, 'wheel', this.stopWheel);
    },
    onWheelBlur: function onWheelBlur(evt) {
      eventOff(document, 'wheel', this.stopWheel);
    },
    stopWheel: function stopWheel(evt) {
      evt.preventDefault();
      this.$el.blur();
    }
  }
};