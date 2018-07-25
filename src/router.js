import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Search from "./views/Search.vue";
import Detail from "./views/Detail.vue";
import AdminBase from "./views/admin/AdminBase.vue";
import Category from "./views/admin/Category.vue";
import UserManager from "./views/admin/UserManager.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        title: "关于"
      }
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail,
      meta: {
        title: "详情"
      }
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        title: "搜索"
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminBase,
      meta: {
        title: "管理"
      },
      children: [
        {
          path: "category",
          component: Category,
          meta: {
            title: "管理-分类管理"
          }
        },
        {
          path: "user",
          component: UserManager,
          meta: {
            title: "管理-用户管理"
          }
        }
      ]
    }
  ]
});
