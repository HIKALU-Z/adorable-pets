import api from "./../../api";
// initial state
// shape: [{ id, quantity }]
const state = {
  petList: []
};

// getters
const getters = {};

// actions
const actions = {
  // 获取宠物列表
  getPetList({ commit }) {
    api("pet/read").then(r => {
      let result = r.data || [];
      commit("setPetList", result);
    });
  },
  searchPetList({ commit }, query) {
    api("pet/read", { query }).then(r => {
      let result = r.data || [];
      commit("setPetList", result);
    });
  }
};

// mutations
const mutations = {
  // 设置宠物列表数据
  setPetList(state, list) {
    state.petList = list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
