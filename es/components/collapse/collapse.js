import listenOnRootMixin from '../../mixins/listen-on-root';
import { hasClass, reflow, getCS, getBCR, eventOn, eventOff } from '../../utils/dom';

// Events we emit on $root
var EVENT_STATE = 'bv::collapse::state';
var EVENT_ACCORDION = 'bv::collapse::accordion';
// Events we listen to on $root
var EVENT_TOGGLE = 'bv::toggle::collapse';

export default {
  mixins: [listenOnRootMixin],
  render: function render(h) {
    var content = h(this.tag, {
      class: this.classObject,
      directives: [{ name: 'show', value: this.show }],
      attrs: { id: this.id || null },
      on: { click: this.clickHandler }
    }, [this.$slots.default]);
    return h('transition', {
      props: {
        enterClass: '',
        enterActiveClass: 'collapsing',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: 'collapsing',
        leaveToClass: ''
      },
      on: {
        enter: this.onEnter,
        afterEnter: this.onAfterEnter,
        leave: this.onLeave,
        afterLeave: this.onAfterLeave
      }
    }, [content]);
  },
  data: function data() {
    return {
      show: this.visible,
      transitioning: false
    };
  },

  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    isNav: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  watch: {
    visible: function visible(newVal) {
      if (newVal !== this.show) {
        this.show = newVal;
      }
    },
    show: function show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitState();
      }
    }
  },
  computed: {
    classObject: function classObject() {
      return {
        'navbar-collapse': this.isNav,
        'collapse': !this.transitioning,
        'show': this.show && !this.transitioning
      };
    }
  },
  methods: {
    toggle: function toggle() {
      this.show = !this.show;
    },
    onEnter: function onEnter(el) {
      el.style.height = 0;
      reflow(el);
      el.style.height = el.scrollHeight + 'px';
      this.transitioning = true;
      // This should be moved out so we can add cancellable events
      this.$emit('show');
    },
    onAfterEnter: function onAfterEnter(el) {
      el.style.height = null;
      this.transitioning = false;
      this.$emit('shown');
    },
    onLeave: function onLeave(el) {
      el.style.height = 'auto';
      el.style.display = 'block';
      el.style.height = getBCR(el).height + 'px';
      reflow(el);
      this.transitioning = true;
      el.style.height = 0;
      // This should be moved out so we can add cancellable events
      this.$emit('hide');
    },
    onAfterLeave: function onAfterLeave(el) {
      el.style.height = null;
      this.transitioning = false;
      this.$emit('hidden');
    },
    emitState: function emitState() {
      this.$emit('input', this.show);
      // Let v-b-toggle know the state of this collapse
      this.$root.$emit(EVENT_STATE, this.id, this.show);
      if (this.accordion && this.show) {
        // Tell the other collapses in this accordion to close
        this.$root.$emit(EVENT_ACCORDION, this.id, this.accordion);
      }
    },
    clickHandler: function clickHandler(evt) {
      // If we are in a nav/navbar, close the collapse when non-disabled link clicked
      var el = evt.target;
      if (!this.isNav || !el || getCS(this.$el).display !== 'block') {
        return;
      }
      if (hasClass(el, 'nav-link') || hasClass(el, 'dropdown-item')) {
        this.show = false;
      }
    },
    handleToggleEvt: function handleToggleEvt(target) {
      if (target !== this.id) {
        return;
      }
      this.toggle();
    },
    handleAccordionEvt: function handleAccordionEvt(openedId, accordion) {
      if (!this.accordion || accordion !== this.accordion) {
        return;
      }
      if (openedId === this.id) {
        // Open this collapse if not shown
        if (!this.show) {
          this.toggle();
        }
      } else {
        // Close this collapse if shown
        if (this.show) {
          this.toggle();
        }
      }
    },
    handleResize: function handleResize() {
      // Handler for orientation/resize to set collapsed state in nav/navbar
      this.show = getCS(this.$el).display === 'block';
    }
  },
  created: function created() {
    // Listen for toggle events to open/close us
    this.listenOnRoot(EVENT_TOGGLE, this.handleToggleEvt);
    // Listen to otehr collapses for accordion events
    this.listenOnRoot(EVENT_ACCORDION, this.handleAccordionEvt);
  },
  mounted: function mounted() {
    if (this.isNav && typeof document !== 'undefined') {
      // Set up handlers
      eventOn(window, 'resize', this.handleResize, false);
      eventOn(window, 'orientationchange', this.handleResize, false);
      this.handleResize();
    }
    this.emitState();
  },
  updated: function updated() {
    this.$root.$emit(EVENT_STATE, this.id, this.show);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isNav && typeof document !== 'undefined') {
      eventOff(window, 'resize', this.handleResize, false);
      eventOff(window, 'orientationchange', this.handleResize, false);
    }
  }
};