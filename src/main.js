import Vue from 'vue';

import App from './App.vue';
import router from './core/Router/Router';
import store from './core/Vuex/Store';
import './core/Icons/Icons';
import './core/Plugins/Plugins';
import './assets/scss/styles.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
