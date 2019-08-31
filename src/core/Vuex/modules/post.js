const post = {
  namespaced: true,
  state: {
    currentPost: {
      userId: null,
      id: null,
      title: null,
      body:  null,
    },
  },
  mutations: {
    setCurrentPost: (state, payload) => {
      state.currentPost = payload;
    },
  },
};

export default post;
