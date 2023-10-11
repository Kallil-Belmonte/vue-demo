import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { isValidAuthToken, clearStorageData } from '@/shared/helpers';

const guard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isValid = isValidAuthToken();

  if (isValid) {
    next();
  } else {
    clearStorageData();
    next({ name: 'login' });
  }
};

export default guard;
