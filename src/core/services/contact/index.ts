import { MOCKY_URL } from '../files/endpoints';

export const getFavoriteColors = async () => {
  try {
    const response = await fetch(`${MOCKY_URL}/bc275f73-6f3b-4ce2-b518-d9e181bb0f31`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
