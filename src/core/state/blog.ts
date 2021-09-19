import { reactive, computed } from 'vue';

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
