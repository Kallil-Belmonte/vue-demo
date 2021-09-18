import { createStore } from 'vuex';

import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import user from './modules/user';
import blog from './modules/blog';
import post from './modules/post';

export const clearStorageData = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_DATE_KEY);
};

const store = createStore({
  modules: {
    user,
    blog,
    post,
  },
});

export default store;
