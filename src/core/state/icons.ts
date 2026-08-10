import { ref } from 'vue';

import type { Category, Icons } from '@/shared/components/Icon/types';
import type { ObjectType } from '@/shared/files/types';

// STATE
const initialIcons = {};
export const icons = ref<ObjectType>(initialIcons);

// ACTIONS
export const addIcon = (category: Category, name: Icons, svgHTML: string) => {
  if (icons.value[name]) return;

  icons.value = {
    ...icons.value,
    [category]: {
      ...icons.value[category],
      [name]: svgHTML,
    },
  };
};
