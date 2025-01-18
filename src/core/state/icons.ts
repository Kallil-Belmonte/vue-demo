import { ref } from 'vue';

import type { Icons } from '@/shared/components/Icon/types';
import type { ObjectType } from '@/shared/files/types';

// STATE
const initialIcons = {};
export const icons = ref<ObjectType>(initialIcons);

// ACTIONS
export const addIcon = (name: Icons, svgHTML: string) => {
  if (icons.value[name]) return;
  icons.value = { ...icons.value, [name]: svgHTML };
};
