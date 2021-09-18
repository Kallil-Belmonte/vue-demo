// TYPES
export type Category = {
  name: string;
  posts: number;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type State = {
  categories: Category[];
  posts: Post[];
};

// MODULE
const blog = {
  namespaced: true,
  state: {
    categories: [],
    posts: [],
  },
  mutations: {
    setCategories: (state: State, payload: Category[]) => {
      state.categories = payload;
    },

    setPosts: (state: State, payload: Post[]) => {
      state.posts = payload;
    },
  },
};

export default blog;
