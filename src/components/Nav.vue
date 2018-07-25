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
                    <router-link to="/detail" class="navbar-item">
                        Detail
                    </router-link>
                    <router-link to="/search" class="navbar-item">
                        Search
                    </router-link>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="#">
                            Admin
                        </a>
                        <div class="navbar-dropdown is-boxed">
                            <router-link to="/admin/category" class="navbar-item is-active">
                                Category
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <router-link to="/" class="navbar-item">
                        personal-info
                    </router-link>
                    <!-- <div class="navbar-item">
                       
                    </div> -->
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  box-shadow: 0 1px 1px rgba(10, 10, 15, 0.2);
}
</style>
