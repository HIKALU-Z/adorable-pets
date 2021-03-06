import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import iView from "iview";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "iview/dist/styles/iview.css";
import "bulma";
// import "./../node_modules/material-design-icons/iconfont/material-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
// 引入 swiper css
import "swiper/dist/css/swiper.css";
import session from "./utils/session";

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueAwesomeSwiper);

/**
 * 切换 body 上的 class 以方便 Nav fixed 作用时生成一个脱离文档流的间距
 * @param flag 设置是否添加 fixed 类
 */
const $toggleBodyClassList = function(flag) {
  const CLASSNAME = "has-navbar-fixed-top";
  let list = document.body.classList;
  let value = list.value;
  let index = value.indexOf(CLASSNAME);
  if (flag && index < 0) {
    list.add(CLASSNAME);
  } else if (!flag && index >= 0) {
    list.remove(CLASSNAME);
  }
};

/**
 * 每次路由跳转前做判断
 * - 如果有 meta 信息那么获取 meta.title
 */
router.beforeEach((to, from, next) => {
  // 如果 meta 信息不为空，那么填充 meta 信息
  if (to.meta.title !== undefined) {
    document.title = to.meta.title;
  }
  // 如果所前往的页面有个别元素不需要 fixed 至顶部，修改 body 的样式
  if (
    to.fullPath.startsWith("/admin/") ||
    to.fullPath.startsWith("/signup") ||
    to.fullPath.startsWith("/login")
  ) {
    $toggleBodyClassList(false);
  } else {
    $toggleBodyClassList(true);
  }

  // 判断是否是管理员
  if (!session.is_admin() && to.fullPath.startsWith("/admin")) {
    alert("您不是管理员，无权前往该页面，请使用管理员身份登录");
    next("/login");
    return;
  }
  //判断是否登录
  if (!session.logged_in() && to.fullPath.startsWith("/order")) {
    alert("尚未登录，无此权限，请先登录");
    next("/login");
    return;
  }
  next();
});

//页面全局点击
Vue.prototype.globalClick = function(callback) {
  document.addEventListener("click", callback);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
