import { Post } from './blog';

// TYPES
type State = {
  currentPost: Post;
};

// MODULE
const post = {
  namespaced: true,
  state: {
    currentPost: {
      userId: undefined,
      id: undefined,
      title: undefined,
      body: undefined,
    },
  },
  mutations: {
    setCurrentPost: (state: State, payload: Post) => {
      state.currentPost = payload;
    },
  },
};

export default post;
