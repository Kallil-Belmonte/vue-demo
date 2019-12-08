const post = {
  namespaced: true,
  state: {
    currentPost: {
      userId: undefined,
      id: undefined,
      title: undefined,
      body:  undefined,
    },
  },
  mutations: {
    setCurrentPost: (state, payload) => {
      state.currentPost = payload;
    },
  },
};

export default post;
