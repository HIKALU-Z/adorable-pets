<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <Nav></Nav> -->
    <!-- <Hero/> -->
    <router-view/>
    <!-- <Footer></Footer> -->
  </div>
</template>


<script>
// const Hero = () => import(/* webpackChunkName: "group-App" */ "./components/Hero.vue");
// const Nav = () => import(/* webpackChunkName: "group-App" */ "./components/Nav.vue");
// const Footer = () => import(/* webpackChunkName: "group-App" */ "./components/Footer.vue");
// import Hero from "./components/Hero";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";
export default {
  components: {
    // Nav,
    // Hero,
    // Footer
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f0f0;
  // color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
