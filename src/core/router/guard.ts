import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { clearStorageData } from '@/core/vuex/store';

const guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (authToken && !expiredSession) {
    next();
  } else {
    clearStorageData();
    next({ name: 'login' });
  }
};

export default guard;
