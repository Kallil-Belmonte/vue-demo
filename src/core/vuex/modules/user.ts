// STATE
type Data = {
  firstName: string;
  lastName: string;
  email: string;
};

type State = {
  data: Data;
};

// MODULE
const user = {
  namespaced: true,
  state: {
    data: {
      firstName: '',
      lastName: '',
      email: '',
    },
  },
  getters: {
    fullName: (state: State): string => `${state.data.firstName} ${state.data.lastName}`,
  },
  mutations: {
    setData: (state: State, payload: Data) => {
      const { firstName, lastName, email } = payload;
      state.data = { firstName, lastName, email };
    },

    resetData: (state: State) => {
      state.data = {
        firstName: '',
        lastName: '',
        email: '',
      };
    },
  },
};

export default user;
