<template>
  <div>

    <section class="section is-medium">
      <div>
        <div class="container">
          <div class="columns card info-title">
            <div class="column is-1">
              <label class="checkbox">
                <input type="checkbox"> 全选
              </label>
            </div>
            <div class="column is-4">商品信息</div>
            <div class="column is-1">单价</div>
            <div class="column is-2">数量</div>
            <div class="column is-2">小计</div>
            <div class="column is-2">操作</div>
          </div>

          <div class="columns card info-list">
            <div class="column">
              <!-- 产品列表 start -->
              <div class="columns" v-for="(item, index) in list" :key="index">
                <div class="column is-1">
                  <label class="checkbox">
                    <input type="checkbox">
                  </label>
                </div>
                <div class="column is-4">姓名：{{item.$pet.title}}</div>
                <div class="column is-1 mdi mdi-currency-cny">{{item.$pet.price}}</div>
                <div class="column is-2">1</div>
                <div class="column is-2">1</div>
                <div class="column is-2">
                  <button class="button is-danger">
                    删除
                  </button>
                </div>
              </div>

              <div class="columns" v-if="false">
                <div class="column is-1">
                  <label class="checkbox">
                    <input type="checkbox">
                  </label>
                </div>
                <div class="column is-4">姓名：{{product.title}}</div>
                <div class="column is-1 mdi mdi-currency-cny">11{{product.price}}</div>
                <div class="column is-2">总价：{{total}}</div>
              </div>
              <!-- 产品列表 end -->
              <!-- 支付方式 start -->
              <div class="columns pay-row">
                <div class="column is-2">支付方式：
                </div>
                <div class="column is-3 pay-col">
                  <img class="pay-by" src="../../assets/img/paybay/alipay.png" alt="alipay">
                  <label for="alipay">
                    <input type="radio" id="alipay" v-model="current.pay_by" value="alipay">支付宝
                  </label>
                </div>
                <div class="column is-3 pay-col">
                  <img class="pay-by" src="../../assets/img/paybay/wechat.png" alt="wechat">
                  <label for="wechat">
                    <input type="radio" id="wechat" v-model="current.pay_by" value="wechat">微信
                  </label>
                </div>
              </div>
              <!-- 支付方式 end -->
              <div class="columns">
                <div class="column is2 is-offset-10">
                  <button class="button is-info" @click="handleSubmit">提交订单</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "./../../api";
import session from "./../../utils/session.js";
import { generate_oid } from "./../../utils/order.js";
export default {
  created() {
    this.initOrderInfo();
  },
  data() {
    return {
      current: {
        pay_by: "wechat",
        count: 1
      },
      product: {},
      count: 1
    };
  },
  methods: {
    findPet(id) {
      api("pet/find", { id }).then(r => {
        this.product = r.data;
        this.initCurrent(this.product);
      });
    },
    handleSubmit() {
      api("order/create", this.current).then(r => {
        this.$router.push("pay/" + r.data.oid);
      });
    },
    // 初始化 order 页面的所需信息
    initCurrent(product) {
      this.current.price = product.price;
      this.current.sum = product.price * this.current.count;
      this.current.product_info = product.id;
      this.current.oid = generate_oid(product.id);
      this.current.user_id = session.his_id();
    },
    initOrderInfo() {
      this.current = Object.assign({}, this.current, this.$route.query);
      this.current.pet_id && this.findPet(this.current.pet_id);
      this.cartList = this.$store.state.cart.cartList;
      console.log(this.cartList);
      console.log(this.list);
    }
  },
  computed: {
    total() {
      return this.product.price * this.current.count;
    },
    list() {
      return this.$store.state.cart.cartList;
    }
  }
};
</script>

<style lang="scss" scoped>
.info-title {
  background-color: #dbeefa;
}
.pay-row {
  border-top: 1px solid #dbeefa;
}
.pay-col {
  img,
  label {
    display: inline;
    vertical-align: middle;
    cursor: pointer;
  }
  img + label {
    margin-left: 10px;
  }
  label {
    input {
      margin-right: 8px;
    }
  }
}
.pay-by {
  width: 32px;
  height: 32px;
}
</style>
