import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router/dist/vue-router.d';

import { clearStorageData, isExpiredSession } from '@/shared/helpers';

const guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (isExpiredSession()) {
    clearStorageData();
    next({ name: 'login' });
  } else {
    next();
  }
};

export default guard;
