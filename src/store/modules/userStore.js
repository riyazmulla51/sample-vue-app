const data = {
  userData: {
    userDetails: [
      {
        name: "Riyaz",
        email: "Riyaz@gmail.com",
        phone: "2244668800",
      },
      {
        name: "Vishwa",
        email: "Vishwa@gmail.com",
        phone: "1111111111",
      },
      {
        name: "Rahul",
        email: "Rahul@gmail.com",
        phone: "2222222222",
      },
    ],
  },
};

const getters = {
  userData: (state) => state.userData,
};

const mutations = {
  updateUserData(state, payload) {
    state.userData = Object.assign(state.userData, payload);
  },
  removeUserData(state) {
    state.userData = {};
  },
};

const actions = {
  setUserData({ commit }, payload) {
    commit("updateUserData", payload);
  },
  removeUserData({ commit }) {
    commit("removeUserData");
  },
};

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions,
};
