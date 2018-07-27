<template>
  <div>
    <Nav></Nav>
    <SearchBar></SearchBar>
    <Footer></Footer>
  </div>
</template>

<script>
const Nav = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Nav.vue");
const Footer = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Footer.vue");
const SearchBar = () => import("./../components/SearchBar");
export default {
  components: {
    Nav,
    SearchBar,
    Footer
  }
};
</script>

<style scoped>
</style>
