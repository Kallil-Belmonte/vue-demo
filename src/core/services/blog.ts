import { JSON_PLACEHOLDER_URL, MOCKY_URL } from './files/endpoints';

export const getCategories = async () => {
  try {
    const response = await fetch(`${MOCKY_URL}/bb4a0a50-d578-44e5-8d89-11ada2c96129`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts`);
    return response.json();
  } catch (error) {
    throw error;
  }
};
