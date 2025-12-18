import { createApp } from 'vue';

import App from '@/App.vue';
import '@/assets/scss/styles.scss';
import router from '@/core/router';

// APP
const app = createApp(App);

// PLUGINS
app.use(router);

// MOUNT
app.mount('#app');
