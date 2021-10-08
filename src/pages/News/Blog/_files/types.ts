import { Category } from '@/core/services/news/types';

export type CategoriesProps = {
  categories: Category[];
};

export type CategoriesState = {
  activeCategory: Category['name'];
};

// export type BlogData = {
//   groupArrayItemsInArrays: (array: any[], itemsQuantity: number, repeatLastItem?: boolean) => void;
//   isLoading: boolean;
//   pages: { [key: string]: Post[] };
//   postsPerPage: number;
//   firstPaginationItem: number;
//   maxPaginationItem: number;
//   currentPage: number;
// };

// export type CategoriesData = {
//   activeCategory: string;
// };
