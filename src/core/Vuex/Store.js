import Vue from 'vue';
import Vuex from 'vuex';

import vuejsStorage from 'vuejs-storage';

import user from './modules/user';
import blog from './modules/blog';
import post from './modules/post';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    blog,
    post,
  },
  plugins: [
    vuejsStorage({
      keys: ['user', 'blog', 'post'],
    })
  ],
});
