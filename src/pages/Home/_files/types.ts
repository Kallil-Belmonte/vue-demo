import { Post } from '@/core/services/blog/types';

export type HomeState = {
  isLoading: boolean;
  featuredPosts: Post[];
};
