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

const user = computed(() => state.user);
const fullName = computed(() => `${state.user.firstName} ${state.user.lastName}`);

const setUser = (payload: AuthState['user']) => {
  state.user = payload;
};

const resetUser = () => {
  state.user = {
    firstName: '',
    lastName: '',
    email: '',
  };
};

export { user, fullName, setUser, resetUser };
