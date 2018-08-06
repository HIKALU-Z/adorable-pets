import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart";
import pet from "./modules/pet";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    pet
  },
  state: {},
  mutations: {},
  actions: {}
});
