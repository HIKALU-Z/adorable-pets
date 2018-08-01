import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Search from "./views/Search.vue";
import Detail from "./views/Detail.vue";

//  管理页面路由集合
import AdminBase from "./views/admin/AdminBase.vue";
import Category from "./views/admin/Category.vue";
import UserManager from "./views/admin/UserManager.vue";
import Order from "./views/admin/Order.vue";
import Pet from "./views/admin/Pet.vue";
import Breed from "./views/admin/Breed.vue";

// 订单页面集合
import OrderBase from "./views/order/OrderBase.vue";
import NewOrder from "./views/order/NewOrder.vue";
import PayOrder from "./views/order/PayOrder.vue";

// 注册路由集合
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";

// 用户信息中心
import Me from "./views/me/MeBase";
import MeOrder from "./views/me/Order";
import MeSetting from "./views/me/Setting";

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
      path: "/detail/:id",
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
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        title: "注册"
      }
    },
    // order
    {
      path: "/order",
      name: "order",
      component: OrderBase,
      meta: {
        title: "订单"
      },
      children: [
        {
          path: "new",
          component: NewOrder,
          meta: {
            title: "订单-新建订单"
          }
        },
        {
          path: "pay/:oid",
          component: PayOrder,
          meta: {
            title: "订单-支付订单"
          }
        }
      ]
    },
    // admin
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
        },
        {
          path: "order",
          component: Order,
          meta: {
            title: "管理-订单管理"
          }
        },
        {
          path: "pet",
          component: Pet,
          meta: {
            title: "管理-订单管理"
          }
        },
        {
          path: "breed",
          component: Breed,
          meta: {
            title: "管理-品种管理"
          }
        }
      ]
    },
    // me
    {
      path: "/me",
      name: "me",
      component: Me,
      meta: {
        title: "用户中心"
      },
      children: [
        {
          path: "order",
          component: MeOrder
        },
        {
          path: "setting",
          component: MeSetting
        }
      ]
    }
  ]
});
