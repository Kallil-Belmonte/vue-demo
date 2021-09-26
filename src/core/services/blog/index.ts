import { JSON_PLACEHOLDER_URL, MOCKY_URL } from '@/core/services/files/endpoints';
import { Category, Post } from './types';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${MOCKY_URL}/bb4a0a50-d578-44e5-8d89-11ada2c96129`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
