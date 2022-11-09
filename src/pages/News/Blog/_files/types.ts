import type { Category, Post } from '@/core/services/news/types';

export type CategoriesState = {
  activeCategory: Category['name'];
};

export type BlogState = {
  loading: boolean;
  pages: { [key: string]: Post[] };
  postsPerPage: number;
  firstPaginationItem: number;
  maxPaginationItem: number;
  currentPage: number;
};
