export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    formatter: {
      type: Function,
      value: null
    },
    trim: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    lazyFormatter: {
      type: Boolean,
      value: false
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  data: function data() {
    return {
      localValue: this.stringifyValue(this.value)
    };
  },

  watch: {
    value: function value(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== this.localValue) {
        this.localValue = this.stringifyValue(newVal);
      }
    }
  },
  mounted: function mounted() {
    var value = this.stringifyValue(this.value);
    if (value !== this.localValue) {
      this.localValue = value;
    }
  },

  computed: {
    computedClass: function computedClass() {
      return [{
        // Range input needs class custom-range
        'custom-range': this.type === 'range',
        // plaintext not supported by type=range or type=color
        'form-control-plaintext': this.plaintext && this.type !== 'range' && this.type !== 'color',
        // form-control not used by type=range or plaintext. Always used by type=color
        'form-control': !this.plaintext && this.type !== 'range' || this.type === 'color'
      }, this.sizeFormClass, this.stateClass];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // this.ariaInvalid is null or false or 'false'
        return this.computedState === false ? 'true' : null;
      }
      if (this.ariaInvalid === true) {
        // User wants explicit aria-invalid=true
        return 'true';
      }
      // Most likely a string value (which could be the string 'true')
      return this.ariaInvalid;
    }
  },
  methods: {
    stringifyValue: function stringifyValue(value) {
      return value === null || typeof value === 'undefined' ? '' : String(value);
    },
    getFormatted: function getFormatted(value, event) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      value = this.stringifyValue(value);
      if ((!this.lazyFormatter || force) && typeof this.formatter === 'function') {
        value = this.formatter(value, event);
      }
      return value;
    },
    updateValue: function updateValue(value) {
      value = this.stringifyValue(value);
      if (this.localValue !== value) {
        // keep the input set to the value before modifiers
        this.localValue = value;
        if (this.number) {
          // Emulate .number modifier behaviour
          var num = parseFloat(value);
          value = isNaN(num) ? value : num;
        } else if (this.trim) {
          // Emulate .trim modifier behaviour
          value = value.trim();
        }
        // Update the v-model
        this.$emit('update', value);
      }
    },
    onInput: function onInput(evt) {
      // evt.target.composing is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      if (evt.target.composing) {
        return;
      }
      var formatted = this.getFormatted(evt.target.value, evt);
      if (formatted === false || evt.defaultPrevented) {
        return;
      }
      this.updateValue(formatted);
      this.$emit('input', formatted);
    },
    onChange: function onChange(evt) {
      // evt.target.composing is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      if (evt.target.composing) {
        return;
      }
      var formatted = this.getFormatted(evt.target.value, evt);
      if (formatted === false) {
        return;
      }
      this.updateValue(formatted);
      this.$emit('change', formatted);
    },
    onBlur: function onBlur(evt) {
      // lazy formatter
      if (this.lazyFormatter) {
        var formatted = this.getFormatted(evt.target.value, evt, true);
        if (formatted === false) {
          return;
        }
        this.updateValue(formatted);
      }
      // Emit native blur event
      this.$emit('blur', evt);
    },
    focus: function focus() {
      // For external handler that may want a focus method
      if (!this.disabled) {
        this.$el.focus();
      }
    },
    blur: function blur() {
      // For external handler that may want a blur method
      if (!this.disabled) {
        this.$el.blur();
      }
    }
  }
};