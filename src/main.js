import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bulma";
// import "./../node_modules/material-design-icons/iconfont/material-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

/**
 * 每次路由跳转前做判断
 * - 如果有 meta 信息那么获取 meta.title
 */
router.beforeEach((to, from, next) => {
  if (to.meta.title !== undefined) {
    document.title = to.meta.title;
  }
  next();
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
