import { reactive, computed } from 'vue';

import { Category, Post } from '@/core/services/blog/types';

type State = {
  categories: Category[];
  posts: Post[];
  currentPost?: Post;
};

const state = reactive<State>({
  categories: [],
  posts: [],
  currentPost: undefined,
});

const categories = computed(() => state.categories);
const posts = computed(() => state.posts);
const currentPost = computed(() => state.currentPost);

const setCategories = (payload: Category[]) => {
  state.categories = payload;
};

const setPosts = (payload: Post[]) => {
  state.posts = payload;
};

const setCurrentPost = (payload: Post) => {
  state.currentPost = payload;
};

export { categories, posts, currentPost, setCategories, setPosts, setCurrentPost };
