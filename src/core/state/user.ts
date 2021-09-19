import { reactive, computed } from 'vue';

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type State = {
  user: User;
};

const state = reactive<State>({
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
});

const user = computed(() => state.user);
const fullName = computed(() => `${state.user.firstName} ${state.user.lastName}`);

const setUser = (payload: User) => {
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
