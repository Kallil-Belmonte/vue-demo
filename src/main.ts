import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/core/router';
import '@/assets/scss/styles.scss';

// APP
const app = createApp(App);

// PLUGINS
app.use(router);

// MOUNT
app.mount('#app');
