<template>
    <div>
        <nav class="navbar is-dark">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <!-- <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"> -->
                    <img src="../../assets/logo-miao.png" alt="logo">
                </router-link>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/signup" class="navbar-item">
                        注册
                    </router-link>
                    <router-link to="/login" class="navbar-item">
                        登录
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
