<template>
  <div>

    <section class="section is-medium">
      <h1>下单</h1>
      <div>姓名：{{product.title}}</div>
      <div>单价：{{product.price}}</div>
      <div>总价：{{total}}</div>
      <div>支付方式：
        <label for="alipay">
          <input type="radio" v-model="current.pay_by" value="alipay">alipay
        </label>
        <label for="wechat">
          <input type="radio" v-model="current.pay_by" value="wechat">wechat
        </label>
      </div>
      <button @click="handleSubmit">提交订单</button>
    </section>

    <!-- <div v-if="payment_url">
      {{payment_url}}
    </div> -->

    <!-- <div v-if="payment_url">
      <div class="columns">
        <div v-if="current.pay_by=='wechat'" class="columns is-6">
          <img :src="payment_url" alt="二维码">
        </div>
        <div v-else class="columns is-6">
          <a :href="payment_url">点击使用支付宝支付</a>
        </div>
      </div>
      <div>
        <button @click="handleVerify">支付完成</button>
      </div>
    </div> -->

  </div>
</template>

<script>
import api from "./../../api";
export default {
  mounted() {
    this.current = Object.assign({}, this.current, this.$route.query);
    console.log(this.current);
    this.findPet(this.current.pet_id);
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
        console.log(r.data);
        this.product = r.data;
        this.initCurrent(this.product);
        // console.log(r.data);
      });
    },
    handleSubmit() {
      api("order/create", this.current).then(r => {
        console.log(r);
        this.$router.push({ path: "pay", query: { id: r.data.id } });
      });
    },
    initCurrent(product) {
      this.current.price = product.price;
      this.current.sum = product.price * this.current.count;
    }
  },
  computed: {
    total() {
      return this.product.price * this.current.count;
    }
  }
};
</script>

<style scoped>
</style>
