export default {
  computed: {
    /* istanbul ignore next */
    validity: {
      // Expose validity property
      cache: false,
      get: function get() {
        return this.$refs.input.validity;
      }
    },
    /* istanbul ignore next */
    validationMessage: {
      // Expose validationMessage property
      cache: false,
      get: function get() {
        return this.$refs.input.validationMessage;
      }
    },
    /* istanbul ignore next */
    willValidate: {
      // Expose willValidate property
      cache: false,
      get: function get() {
        return this.$refs.input.willValidate;
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    setCustomValidity: function setCustomValidity() {
      var _$refs$input;

      // For external handler that may want a setCustomValidity(...) method
      return (_$refs$input = this.$refs.input).setCustomValidity.apply(_$refs$input, arguments);
    },

    /* istanbul ignore next */
    checkValidity: function checkValidity() {
      var _$refs$input2;

      // For external handler that may want a checkValidity(...) method
      return (_$refs$input2 = this.$refs.input).checkValidity.apply(_$refs$input2, arguments);
    },

    /* istanbul ignore next */
    reportValidity: function reportValidity() {
      var _$refs$input3;

      // For external handler that may want a reportValidity(...) method
      return (_$refs$input3 = this.$refs.input).reportValidity.apply(_$refs$input3, arguments);
    }
  }
};