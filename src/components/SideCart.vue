<template>
  <div>
    <h1 class="title">购物车</h1>
    <hr>
    <div class="cart-list">
      <article class="media" v-for="item in cartList" :key="item.id">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="item.$pet.cover_url">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h4>{{item.$pet.title}}</h4>
            <span>
              <i class="mdi mdi-currency-cny"></i>
              {{item.$pet.price*300}}
            </span>
          </div>
          <!-- <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fas fa-reply"></i>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fas fa-retweet"></i>
                </span>
              </a>
              <a class="level-item">
                <span class="icon is-small">
                  <i class="fas fa-heart"></i>
                </span>
              </a>
            </div>
          </nav> -->
        </div>
        <div class="media-right">
          <button class="delete"></button>
        </div>
      </article>
    </div>
    <button class="button is-info btn-pay">前去结算</button>
  </div>
</template>

<script>
import api from "../api";
import session from "../utils/session";
export default {
  mounted() {
    this.getCartList();
  },

  methods: {
    getCartList() {
      api("cart/read", {
        where: { user_id: this.user_id },
        with: "has_one:pet"
      }).then(r => {
        this.cartList = r.data;
        console.log(r.data);
      });
    }
  },
  data() {
    return {
      cartList: [],
      user_id: session.his_id()
    };
  }
};
</script>

<style lang='scss' scoped>
.cart-list {
  border-bottom: 1px dashed #cccccc;
  padding-bottom: 20px;
}
.btn-pay {
  position: absolute;
  bottom: 30px;
}
</style>
