import { Post } from '@/core/vuex/modules/blog';

// BLOG
export type BlogData = {
  groupArrayItemsInArrays: (array: any[], itemsQuantity: number, repeatLastItem?: boolean) => void;
  isLoading: boolean;
  pages: { [key: string]: Post[] };
  postsPerPage: number;
  firstPaginationItem: number;
  maxPaginationItem: number;
  currentPage: number;
};

// CATEGORIES
export type CategoriesData = {
  activeCategory: string;
};
