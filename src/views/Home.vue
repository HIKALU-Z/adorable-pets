<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Nav></Nav>
    <Pets></Pets>
    <ToolBar></ToolBar>
    <!-- <SideCart></SideCart> -->
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Pets from "../components/Pets";

const Nav = () =>
  import(/* webpackChunkName: "group-App" */ "./../components/Nav.vue");
const Footer = () =>
  import(/* webpackChunkName: "group-App" */ "./../components/Footer.vue");
const ToolBar = () =>
  import(/* webpackChunkName: "group-App" */ "./../components/ToolBar.vue");
export default {
  name: "home",
  components: {
    Nav,
    Pets,
    // SideCart,
    ToolBar,
    Footer
  }
};
</script>
