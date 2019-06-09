import Vue from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faNewspaper, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome,
  faNewspaper,
  faEnvelope,
  faUser
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
