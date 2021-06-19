import { createStore } from 'vuex';

import vuejsStorage from 'vuejs-storage';

import { AUTH_TOKEN, EXPIRATION_DATE } from '@/shared/files/consts';
import user from './modules/user';
import blog from './modules/blog';
import post from './modules/post';

export const clearStorageData = (): void => {
  sessionStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(EXPIRATION_DATE);
};

const store = createStore({
  modules: {
    user,
    blog,
    post,
  },
  plugins: [
    vuejsStorage({
      namespace: 'app',
      keys: ['user', 'blog', 'post'],
    }),
  ],
});

export default store;
