import { Post } from '@/core/services/news/types';

export type PostState = {
  isLoading: boolean;
  isDeleteModalVisible: boolean;
};

export type PostBodyProps = {
  post: Post;
};

export type DeletePostModalProps = {
  isVisible: boolean;
};

export type DeletePostModalState = {
  isLoading: boolean;
};
