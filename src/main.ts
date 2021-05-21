import { createApp } from 'vue';

import VueForm from 'vue-form';
import VueTheMask from 'vue-the-mask';
import BootstrapVue from 'bootstrap-vue';
import PrettyCheckbox from 'pretty-checkbox-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import store from '@/core/vuex/store';
import router from '@/core/router';
import App from './App.vue';

// APP
const app = createApp(App);

// PLUGINS
app.use(VueForm);
app.use(VueTheMask);
app.use(BootstrapVue);
app.use(PrettyCheckbox);
app.use(store);
app.use(router);

// COMPONENTS
app.component('font-awesome-icon', FontAwesomeIcon);

// MOUNT
app.mount('#app');
