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
    userFullName: state => `${state.data.firstName} ${state.data.lastName}`
  },
  mutations: {
    setData: (state, payload) => {
      state.data = payload;
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
