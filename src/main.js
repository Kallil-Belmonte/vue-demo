import Vue from 'vue';
import App from './App.vue';
import router from './core/Router/Router';
import store from './core/Vuex/Store';
import PrettyCheckbox from 'pretty-checkbox-vue';
import './assets/scss/index.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  PrettyCheckbox,
  render: h => h(App)
}).$mount('#app');
