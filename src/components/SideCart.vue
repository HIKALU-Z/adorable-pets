<template>
  <div>
    <div class="check-tool">
      <span>全选</span>
    </div>
    <div class="cart-list">
      <article class="media" v-for="item in cartList" :key="item.id">
        <figure class="media-left">
          <p class="image is-64x64">
            <!-- <img :src="item.$pet.cover_url"> -->
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h4>{{item.$pet.title}}</h4>
            <span>
              单价
              <i class="mdi mdi-currency-cny"></i>
              {{item.$pet.price*300}}
            </span>
            <label>
              数量
              <input type="text" v-model="item.count">
            </label>

            <!-- <span>
              数量 {{item.count}}
            </span> -->
          </div>
        </div>
        <div class="media-right">
          <button class="delete" @click="removeItem(item.id)"></button>
        </div>
      </article>
    </div>
    <button class="button is-info btn-pay">前去结算</button>
    <div class="content total-price">
      <h4>总价：
        <span>
          <i class="mdi mdi-currency-cny"></i>
          {{cartTotalPrice *300}}
        </span>
      </h4>
    </div>
  </div>

</template>

<script>
// import api from "../api";
import session from "../utils/session";
export default {
  created() {
    console.log(this.user_id);
    this.$store.dispatch("cart/getCartList", { user_id: this.user_id });
  },
  methods: {
    removeItem(id) {
      this.$store.dispatch("cart/removeCartItem", id);
    }
  },
  data() {
    return {
      user_id: session.his_id() || ""
    };
  },
  computed: {
    cartList() {
      // console.log(this.$store);
      return this.$store.state.cart.cartList;
    },
    cartProducts() {
      console.log(this.$store);
      return this.$store.getters["cart/cartProducts"];
    },
    cartTotalPrice() {
      return this.$store.getters["cart/cartTotalPrice"];
    }
  }
};
</script>

<style lang='scss' scoped>
.cart-list {
  // border-bottom: 1px dashed #cccccc;
  padding-bottom: 20px;
  max-height: 480px;
  overflow-y: auto;
  article {
    background-color: #ffffff;
    padding: 16px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }
}

/*滚动条样式*/
.cart-list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.cart-list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.cart-list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.btn-pay {
  position: absolute;
  bottom: 30px;
  left: 20px;
}
.total-price {
  position: absolute;
  bottom: 60px;
  left: 20px;
  span {
    color: red;
  }
}

.check-tool {
  padding: 10px 20px;
}
</style>
