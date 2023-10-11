import { useRouter } from 'vue-router';

import isValidAuthToken from './isValidAuthToken';

/**
 * @function redirectLoggedUser
 */

const redirectLoggedUser = async () => {
  const router = useRouter();
  const isLoggedUser = await isValidAuthToken();

  if (isLoggedUser) {
    router.push('/');
  }
};

export default redirectLoggedUser;
