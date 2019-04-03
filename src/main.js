import Vue from 'vue';
import App from './App.vue';
import router from './core/Router/Router';
import store from './core/Vuex/Store';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
