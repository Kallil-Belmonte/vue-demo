import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { isValidAuthToken, clearStorageData } from '@/shared/helpers';

const app = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isValid = await isValidAuthToken();

  if (isValid) next({ name: 'home' });
  else next();
};

export default app;
