<template>
    <div>
        <Nav></Nav>
        <router-view></router-view>
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

<style scoped>
</style>
