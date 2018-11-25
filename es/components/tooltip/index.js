import bTooltip from './tooltip';
import tooltipPlugin from '../../directives/tooltip';
import { registerComponents, vueUse } from '../../utils/plugins';

var components = {
  bTooltip: bTooltip
};

var VuePlugin = {
  install: function install(Vue) {
    registerComponents(Vue, components);
    Vue.use(tooltipPlugin);
  }
};

vueUse(VuePlugin);

export default VuePlugin;