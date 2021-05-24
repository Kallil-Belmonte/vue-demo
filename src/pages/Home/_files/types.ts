import { Post } from '@/core/vuex/modules/blog';

export type HomeData = {
  isLoading: boolean;
  featuredPosts: Post[];
};
