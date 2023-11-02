import { ref, computed } from 'vue';

import type { LoggedUser } from '@/core/services/auth/types';

type User = Pick<LoggedUser, 'firstName' | 'lastName' | 'email'>;

// STATE
const initialUser: User = {
  firstName: '',
  lastName: '',
  email: '',
};
export const user = ref<User>(initialUser);

// PROPERTIES
export const fullName = computed(() => `${user.value.firstName} ${user.value.lastName}`);

// ACTIONS
export const setUser = (userParam: User) => {
  user.value = userParam;
};

export const resetUser = () => {
  user.value = initialUser;
};
