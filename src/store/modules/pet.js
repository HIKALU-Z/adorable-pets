import api from "./../../api";
// initial state
// shape: [{ id, quantity }]
const state = {
  petList: [], // 宠物列表
  total: 0, // 宠物总数
  currentPage: 1, // 当前页
  query: ""
};

// getters
const getters = {};

// actions
const actions = {
  // 获取宠物列表
  getPetList({ commit }) {
    api("pet/read", { limit: 8 }).then(r => {
      let result = r.data || [];
      commit("setPetList", result);
      commit("setTotal", r.total);
      commit("setCurrentPage", r.current);
    });
  },
  searchPetList({ commit }, { query = state.query, page = 1 }) {
    api("pet/read", { query, limit: 8, page }).then(r => {
      let result = r.data || [];

      commit("setPetList", result);
      commit("setTotal", r.total);
      commit("setCurrentPage", r.current_page);
      commit("setQuery", query);
    });
  }
};

// mutations
const mutations = {
  // 设置宠物列表数据
  setPetList(state, list) {
    state.petList = list;
  },
  setTotal(state, total) {
    state.total = total;
  },
  setCurrentPage(state, current) {
    state.currentPage = current;
  },
  setQuery(state, query) {
    state.query = query;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
