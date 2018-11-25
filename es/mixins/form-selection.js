export default {
  computed: {
    /* istanbul ignore next */
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,
      get: function get() {
        return this.$refs.input.selectionStart;
      },
      set: function set(val) {
        this.$refs.input.selectionStart = val;
      }
    },
    /* istanbul ignore next */
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,
      get: function get() {
        return this.$refs.input.selectionEnd;
      },
      set: function set(val) {
        this.$refs.input.selectionEnd = val;
      }
    },
    /* istanbul ignore next */
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,
      get: function get() {
        return this.$refs.input.selectionDirection;
      },
      set: function set(val) {
        this.$refs.input.selectionDirection = val;
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    select: function select() {
      var _$refs$input;

      // For external handler that may want a select() method
      (_$refs$input = this.$refs.input).select.apply(_$refs$input, arguments);
    },

    /* istanbul ignore next */
    setSelectionRange: function setSelectionRange() {
      var _$refs$input2;

      // For external handler that may want a setSelectionRange(a,b,c) method
      (_$refs$input2 = this.$refs.input).setSelectionRange.apply(_$refs$input2, arguments);
    },

    /* istanbul ignore next */
    setRangeText: function setRangeText() {
      var _$refs$input3;

      // For external handler that may want a setRangeText(a,b,c) method
      (_$refs$input3 = this.$refs.input).setRangeText.apply(_$refs$input3, arguments);
    }
  }
};