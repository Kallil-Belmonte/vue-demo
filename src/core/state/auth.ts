import { reactive, computed } from 'vue';

import { LoginUser } from '@/core/services/auth/types';

type User = Pick<LoginUser, 'firstName' | 'lastName' | 'email'>;

type AuthState = {
  user: User;
};

// STATE
const initialState: AuthState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

const state = reactive(initialState);

// PROPERTIES
export const user = computed(() => state.user);
export const fullName = computed(() => `${state.user.firstName} ${state.user.lastName}`);

// ACTIONS
export const setUser = (payload: AuthState['user']) => {
  state.user = payload;
};

export const resetUser = () => {
  state.user = initialState.user;
};
