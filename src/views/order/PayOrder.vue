<template>
  <div>
    <section class="section is-medium">
      <div class="columns" v-if="order.pay_by=='wechat'">
        <div class="column box is-2 is-offset-5">
          <h2 class="has-text-centered">微信支付</h2>
          <img :src="payment_url" alt="qrcode">
        </div>
      </div>
      <div class="columns" v-if="order.pay_by=='wechat'">
        <div class="column is-2 is-offset-5">
          <button style="width:100%" class="button is-primary" @click="handleVerify">完成支付</button>
        </div>
      </div>
      <div class="columns" v-else>
        <div class="column has-text-centered is-6 is-offset-3 box">
          跳转中，请稍后。。。
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "./../../api";
import { url } from "./../../utils/url.js";
export default {
  mounted() {
    this.order_id = this.$route.params.oid;
    this.getOrderInfo(this.order_id);
  },
  data() {
    return {
      order_id: undefined,
      order: {},
      payment_url: "",
      return_url: url("/#/me/order")
    };
  },
  methods: {
    getOrderInfo(order_id) {
      api("order/first", { where: { oid: order_id } }).then(r => {
        const order = (this.order = r.data);
      
        // 如果没有查询结果，说明订单号不正确
        if (!order) {
          alert("订单号有误");
          this.goToUserOdrerPage();
          return;
        }
        // 如果订单已经完成支付，那么不需要进行额外的任何操作
        if (order._paid) {
          alert("此订单已支付");
          this.goToUserOdrerPage();
          return;
        }
        // 获取支付地址
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
        if (r.data.url) {
          setTimeout(() => {
            location.href = r.data.url;
          }, 500);
        } else {
          this.payment_url = r.data.qrcode;
        }
      });
    },
    handleVerify() {
      api("order/find", {
        id: this.order.id
      }).then(r => {
        if (r.data._paid) {
          alert("支付成功");
          this.goToUserOdrerPage();
        } else {
          alert("支付失败");
        }
      });
    },
    goToUserOdrerPage() {
      this.$router.push("/me/order");
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
