import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { isValidAuthToken, clearStorageData } from '@/shared/helpers';

const app = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isValid = await isValidAuthToken();

  if (isValid) {
    next();
  } else {
    clearStorageData();
    next({ name: 'login' });
  }
};

export default app;
