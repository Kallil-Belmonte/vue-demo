import { createApp } from 'vue';

import VueForm from 'vue-form';
import VueTheMask from 'vue-the-mask';
import 'bootstrap/scss/bootstrap.scss';

import store from '@/core/vuex/store';
import router from '@/core/router';
import App from './App.vue';

// APP
const app = createApp(App);

// PLUGINS
app.use(VueForm);
app.use(VueTheMask);
app.use(store);
app.use(router);

// MOUNT
app.mount('#app');
