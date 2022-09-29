import { useRouter } from 'vue-router';

import isExpiredSession from './isExpiredSession';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = () => {
  const router = useRouter();

  if (!isExpiredSession()) {
    router.push('/');
  }
};

export default redirectLoggedUser;
