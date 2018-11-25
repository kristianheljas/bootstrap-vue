import bPopover from './popover';
import popoverPlugin from '../../directives/popover';
import { registerComponents, vueUse } from '../../utils/plugins';

var components = {
  bPopover: bPopover
};

var VuePlugin = {
  install: function install(Vue) {
    registerComponents(Vue, components);
    Vue.use(popoverPlugin);
  }
};

vueUse(VuePlugin);

export default VuePlugin;