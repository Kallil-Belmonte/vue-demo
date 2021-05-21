const blog = {
  namespaced: true,
  state: {
    categories: [],
    posts: [],
  },
  mutations: {
    setCategories: (state, payload) => {
      state.categories = payload;
    },

    setPosts: (state, payload) => {
      state.posts = payload;
    },
  },
};

export default blog;
