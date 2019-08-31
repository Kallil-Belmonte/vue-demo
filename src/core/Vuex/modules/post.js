const post = {
  namespaced: true,
  state: {
    currentPost: null,
  },
  mutations: {
    setCurrentPost: (state, payload) => {
      state.currentPost = payload;
    },
  },
};

export default post;
