import api from "./../../api";
// initial state
// shape: [{ id, quantity }]
const state = {
  cartList: [],
  count: 1
};

// getters
const getters = {
  // 提取所有的商品列表
  cartProducts: state => {
    return state.cartList.map(item => {
      const price = item.$pet.price;
      return {
        price: price || 1,
        quantity: item.count
      };
    });
  },
  // 计算商品总价
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }
};

// actions
const actions = {
  // 获取购物车列表
  getCartList({ commit }, { user_id = "" }) {
    if (!user_id) {
      return;
    }
    api("cart/read", {
      where: {
        user_id: user_id
      },
      with: "has_one:pet"
    }).then(r => {
      let result = r.data || [];
      commit("setCartItems", result);
    });
  },
  // 删除 cart 中的某一项
  removeCartItem({ commit }, id) {
    api("cart/delete", {
      id: id
    }).then(r => {
      if (r.success) {
        commit("removeProductFromCart", id);
      }
    });
  },
  // 增加 item 到 cart 中
  addItemToCart({ commit }, obj) {
    api("cart/create", obj)
      .then(r => {
        if (r.success) {
          return r.data.user_id;
        } else {
          return false;
        }
      })
      .then(user_id => {
        if (user_id === false) {
          return;
        }
        api("cart/read", {
          where: {
            user_id: user_id
          },
          with: "has_one:pet"
        }).then(r => {
          let result = r.data;
          if (r.data == null) {
            result = [];
          }
          commit("setCartItems", result);
        });
      });
  },
  // 如果此项宠物已在购物车内，那么增加该项商品的数量
  incrementItemQuantity({ commit }, id) {
    commit("incrementItemQuantity", id);
  }
};

// mutations
const mutations = {
  // 将产品加入购物车
  pushProductToCart(state, obj) {
    state.cartList.push(obj);
  },
  // 将产品从购物车移除
  removeProductFromCart(state, id) {
    let result = state.cartList.filter(item => {
      return item.id !== id;
    });
    state.cartList = result;
  },
  // 增加其中某一条的数量
  incrementItemQuantity(state, id) {
    const cartItem = state.cartList.find(item => item.$pet.id === id);
    cartItem.count++;
  },
  // 设置购物车数据
  setCartItems(state, list) {
    state.cartList = list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
