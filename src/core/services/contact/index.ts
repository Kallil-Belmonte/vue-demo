import { MOCKY_URL } from '@/core/services/files/endpoints';
import { FavoriteColors } from './types';

export const getFavoriteColors = async (): Promise<FavoriteColors> => {
  try {
    const response = await fetch(`${MOCKY_URL}/1d567325-5979-4c8b-9f3a-3681c8be6d11`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
