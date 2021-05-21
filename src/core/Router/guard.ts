import VueRouter from 'vue-router';

import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { AUTH_TOKEN, EXPIRATION_DATE } from '@/shared/files/consts';
import { clearStorageData } from '@/core/Vuex/Store';

const guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE) || '');

  if (authToken && !expiredSession) {
    next();
  } else {
    clearStorageData();
    next({ name: 'login' });
  }
};

export default guard;
