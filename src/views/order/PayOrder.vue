<template>
  <div>
    <section class="section is-medium">
      <div class="columns" v-if="order.pay_by=='wechat'">
        <div class="column  box is-2 is-offset-5">
          <h2 class="has-text-centered">微信支付</h2>
          <img :src="payment_url" alt="qrcode">
        </div>
      </div>
      <div class="columns" v-else>
        <div class="column has-text-centered">
          <!-- <h2 class="has-text-centered">点此前往支付</h2> -->
          <a :href="payment_url" class="button is-info" target="_blank">点此前往支付</a>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2 is-offset-5 has-text-centered">
          <button class="button is-primary" @click="handleVerify">完成支付</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "./../../api";
export default {
  mounted() {
    this.order_id = this.$route.query.id;
    this.getOrderInfo(this.order_id);
  },
  data() {
    return {
      order_id: undefined,
      order: {},
      payment_url: "",
      return_url: "http://localhost:8080/"
    };
  },
  methods: {
    getOrderInfo(id) {
      api("order/find", { id }).then(r => {
        this.order = r.data;
        console.log(this.order);
        this.getPaymentUrl(
          this.order.id,
          this.order.pay_by,
          this.order.sum,
          this.return_url
        );
      });
    },
    getPaymentUrl(id, pay_by, fee, return_url) {
      if (fee > 0.2) {
        fee = 0.01;
      }
      return api("order/payment/url", {
        id,
        pay_by,
        fee,
        return_url
      }).then(r => {
        this.payment_url = r.data.url || r.data.qrcode;
      });
    },
    handleVerify() {
      api("order/find", {
        id: this.order.id
      }).then(r => {
        if (r.data._paid) alert("支付成功");
        else alert("支付失败");
      });
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 1.6rem;
  font-weight: 700;
}
</style>
