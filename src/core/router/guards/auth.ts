import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { isValidAuthToken } from '@/shared/helpers';

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
