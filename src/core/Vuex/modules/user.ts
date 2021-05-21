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
    fullName: state => `${state.data.firstName} ${state.data.lastName}`,
  },
  mutations: {
    setData: (state, payload) => {
      const { firstName, lastName, email } = payload;
      state.data = { firstName, lastName, email };
    },

    resetData: state => {
      state.data = {
        firstName: '',
        lastName: '',
        email: '',
      };
    },
  },
};

export default user;
