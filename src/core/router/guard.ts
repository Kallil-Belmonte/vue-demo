import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { clearStorageData, isValidAuthToken } from '@/shared/helpers';

const guard = async (
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

export default guard;
