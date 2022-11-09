import { reactive, computed } from 'vue';

import type { Category, Post } from '@/core/services/news/types';

type NewsState = {
  categories: Category[];
  posts: Post[];
  currentPost: Post;
};

// STATE
const initialState: NewsState = {
  categories: [],
  posts: [],
  currentPost: {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  },
};

const state = reactive(initialState);

// PROPERTIES
export const categories = computed(() => state.categories);
export const posts = computed(() => state.posts);
export const currentPost = computed(() => state.currentPost);

// ACTIONS
export const setCategories = (categories: NewsState['categories']) => {
  state.categories = categories;
};

export const setPosts = (posts: NewsState['posts']) => {
  state.posts = posts;
};

export const setCurrentPost = (currentPost: NewsState['currentPost']) => {
  state.currentPost = currentPost;
};
