<template>

  <div>
    <Nav></Nav>
    <section class="section">
      <Row :gutter="16">
        <Col span="6">
        <div class="card">
          <router-link to="/me/setting">
            用户设置
          </router-link>
          <router-link to="/me/order">
            订单列表
          </router-link>
        </div>
        </Col>
        <Col span="18">

        <router-view></router-view>

        </Col>
      </Row>
    </section>

    <Footer></Footer>
  </div>

</template>

<script>
const Nav = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../../components/Nav.vue");
const Footer = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../../components/Footer.vue");
export default {
  components: {
    Nav,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.card {
  a {
    display: block;
    color: #333;
    padding: 10px;
    &:hover {
      background-color: rgba($color: #77a6ec, $alpha: 0.2);
    }
    &.router-link-exact-active {
      font-weight: 700;
      color: rgb(245, 57, 104);
      border-left: 3px solid rgba($color: #77a6ec, $alpha: 0.8);
    }
  }
}
</style>
