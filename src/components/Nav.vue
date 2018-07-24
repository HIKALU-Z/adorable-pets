<template>
    <div>
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <!-- <img src="../assets/svg/airbnb-plus.svg" alt="logo"> -->
                    <img src="../assets/logo-miao.png" alt="logo-2">
                </router-link>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="navbar-item">
                        Home
                    </router-link>
                    <router-link to="/detail" class="navbar-item">
                        Detail
                    </router-link>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="/documentation/overview/start/">
                            Docs
                        </a>
                        <div class="navbar-dropdown is-boxed">
                            <a class="navbar-item" href="/documentation/overview/start/">
                                Overview
                            </a>
                            <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                                Modifiers
                            </a>
                            <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                                Columns
                            </a>
                            <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                                Layout
                            </a>
                            <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                                Form
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                                Elements
                            </a>
                            <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                                Components
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                       <router-link to="/">hooo</router-link>
                    </div>
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
