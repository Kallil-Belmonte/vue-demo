import { ref } from 'vue';

import type { Category, Post } from '@/core/services/news/types';

// STATE
const initialCategories: Category[] = [];
export const categories = ref<Category[]>(initialCategories);

const initialPosts: Post[] = [];
export const posts = ref<Post[]>(initialPosts);

const initialCurrentPost: Post = {
  userId: 0,
  id: 0,
  title: '',
  body: '',
};
export const currentPost = ref<Post>(initialCurrentPost);

// ACTIONS
export const setCategories = (categoriesParam: Category[]) => {
  categories.value = categoriesParam;
};

export const setPosts = (postsParam: Post[]) => {
  posts.value = postsParam;
};

export const setCurrentPost = (currentPostParam: Post) => {
  currentPost.value = currentPostParam;
};
