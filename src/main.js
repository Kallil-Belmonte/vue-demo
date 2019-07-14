import Vue from 'vue';

import App from './App';
import router from './core/Router/Router';
import store from './core/Vuex/Store';
import './shared/Pipes/LimitWords';
import './core/Resource/Resource';
import './core/Plugins/Plugins';
import './core/Icons/Icons';
import './assets/scss/styles.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
