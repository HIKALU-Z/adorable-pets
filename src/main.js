import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import bulmaUtil from "./utils/bulma";
import "iview/dist/styles/iview.css";
import "bulma";
// import "./../node_modules/material-design-icons/iconfont/material-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;
Vue.use(iView);

bulmaUtil.DOMloaded();

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

/**
 * 切换 body 上的 class 以方便 Nav fixed 作用时生成一个脱离文档流的间距
 */
Vue.prototype.$toggleBodyClassList = function() {
  document.body.classList.toggle("has-navbar-fixed-top");
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
