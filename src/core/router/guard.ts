import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { clearStorageData, getAuthToken } from '@/shared/helpers';

const guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isExpiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(AUTH_EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !isExpiredSession) {
    next();
  } else {
    clearStorageData();
    next({ name: 'login' });
  }
};

export default guard;
