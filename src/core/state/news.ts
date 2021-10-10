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

const categories = computed(() => state.categories);
const posts = computed(() => state.posts);
const currentPost = computed(() => state.currentPost);

const setCategories = (payload: NewsState['categories']) => {
  state.categories = payload;
};

const setPosts = (payload: NewsState['posts']) => {
  state.posts = payload;
};

const setCurrentPost = (payload: NewsState['currentPost']) => {
  state.currentPost = payload;
};

export { categories, posts, currentPost, setCategories, setPosts, setCurrentPost };
