import type { FavoriteColors } from './types';

export const getFavoriteColors = async (): Promise<FavoriteColors[]> => [
  {
    value: 'red',
    text: 'Red',
  },
  {
    value: 'green',
    text: 'Green',
  },
  {
    value: 'blue',
    text: 'Blue',
  },
];
