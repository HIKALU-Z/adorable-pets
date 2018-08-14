
<template>
    <div>
        <nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <!-- <img src="../assets/svg/airbnb-plus.svg" alt="logo"> -->
                    <img src="../assets/logo-miao.png" alt="logo-2">
                </router-link>

                <a role="button" class="navbar-burger" data-target="navbarMain" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarMain" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item">
                        首页
                    </router-link>
                    <router-link to="/search" class="navbar-item">
                        搜索
                    </router-link>
                    <div class="navbar-item has-dropdown is-hoverable" v-if="isAdmin">
                        <a class="navbar-link" href="#">
                            管理
                        </a>
                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/admin/category" class="navbar-item">
                                分类管理
                            </router-link>
                            <router-link to="/admin/user" class="navbar-item">
                                用户管理
                            </router-link>
                            <router-link to="/admin/pet" class="navbar-item">
                                宠物管理
                            </router-link>
                            <router-link to="/admin/breed" class="navbar-item">
                                种类管理
                            </router-link>
                            <router-link to="/admin/order" class="navbar-item">
                                订单管理
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="navbar-end" v-if="hasLogin">
                    <div class="navbar-item has-dropdown is-hoverable account-name">

                        <a class="navbar-link">
                            {{accountname}}
                        </a>

                        <div class="navbar-dropdown is-right is-boxed">
                            <router-link to="/me/setting" class="navbar-item">
                                账户管理
                            </router-link>
                            <router-link to="/me/order" class="navbar-item">
                                我的订单
                            </router-link>
                            <hr class="navbar-divider">
                            <a class="navbar-item" @click="handleLogout">
                                登出
                            </a>
                        </div>
                    </div>
                </div>
                <div class="navbar-end" v-else>
                    <router-link to="/login" class="navbar-item">
                        登录
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import bulmaUtils from "./../utils/bulma";
import session from "./../utils/session.js";
export default {
  mounted() {
    bulmaUtils.DOMloaded();
  },
  data() {
    return {
      hasLogin: session.logged_in(),
      accountname: session.uinfo().username || "Account-Center",
      isAdmin: session.is_admin() || false
    };
  },
  methods: {
    handleLogout() {
      session.logout("#/login");
      // this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
nav {
  box-shadow: 0 1px 1px rgba(10, 10, 15, 0.2);
}
.account-name {
  font-weight: bold;
}
</style>
