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
                        Home
                    </router-link>
                    <!-- <router-link to="/detail/1" class="navbar-item">
                        Detail
                    </router-link> -->
                    <router-link to="/search" class="navbar-item">
                        Search
                    </router-link>
                    <div class="navbar-item has-dropdown is-hoverable" v-if="isAdmin">
                        <a class="navbar-link" href="#">
                            Admin
                        </a>
                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/admin/category" class="navbar-item">
                                Category
                            </router-link>
                            <router-link to="/admin/user" class="navbar-item">
                                User
                            </router-link>
                            <router-link to="/admin/pet" class="navbar-item">
                                Pet
                            </router-link>
                            <router-link to="/admin/breed" class="navbar-item">
                                Breed
                            </router-link>
                            <router-link to="/admin/order" class="navbar-item">
                                Order
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable account-name">

                        <a class="navbar-link">
                            {{accountname}}
                        </a>

                        <div class="navbar-dropdown is-right is-boxed">
                            <router-link to="/me/setting" class="navbar-item">
                                Setting
                            </router-link>
                            <router-link to="/me/order" class="navbar-item">
                                Order
                            </router-link>
                            <hr class="navbar-divider">
                            <a class="navbar-item" @click="logout">
                                Logout
                            </a>
                        </div>
                    </div>
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
      accountname: session.uinfo().username || "Account-Center",
      isAdmin: session.is_admin() || false
    };
  },
  methods: {
    logout() {
      session.logout();
      this.$route.push("/login");
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
