import { reactive, computed } from 'vue';

import { LoginUser } from '@/core/services/auth/types';

type User = Pick<LoginUser, 'firstName' | 'lastName' | 'email'>;

type AuthState = {
  user: User;
};

const state = reactive<AuthState>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
});

export const user = computed(() => state.user);
export const fullName = computed(() => `${state.user.firstName} ${state.user.lastName}`);

export const setUser = (payload: AuthState['user']) => {
  state.user = payload;
};

export const resetUser = () => {
  state.user = {
    firstName: '',
    lastName: '',
    email: '',
  };
};
