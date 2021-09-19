import { createApp } from 'vue';

import App from 'src/App.vue';
import router from 'src/core/router';
import 'src/assets/scss/styles.scss';

// APP
const app = createApp(App);

// PLUGINS
app.use(router);

// MOUNT
app.mount('#app');
