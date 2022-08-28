import { reactive, computed } from 'vue';

import { Category, Post } from '@/core/services/news/types';

type NewsState = {
  categories: Category[];
  posts: Post[];
  currentPost: Post;
};

const state = reactive<NewsState>({
  categories: [],
  posts: [],
  currentPost: {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  },
});

export const categories = computed(() => state.categories);
export const posts = computed(() => state.posts);
export const currentPost = computed(() => state.currentPost);

export const setCategories = (payload: NewsState['categories']) => {
  state.categories = payload;
};

export const setPosts = (payload: NewsState['posts']) => {
  state.posts = payload;
};

export const setCurrentPost = (payload: NewsState['currentPost']) => {
  state.currentPost = payload;
};
