import type { Post } from '@/core/services/news/types';

export type HomeState = {
  loading: boolean;
  featuredPosts: Post[];
};
