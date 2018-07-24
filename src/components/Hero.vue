<template>
    <div>

        <section class="hero is-primary">
            <!-- Hero head: will stick at the top -->
            <div class="hero-head">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <!-- <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"> -->
                                <img src="./../assets/img/logo-h.png" alt="Logo">
                                <!-- <h1>HIKALU</h1> -->
                            </a>
                            <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenuHeroA" class="navbar-menu">
                            <div class="navbar-end">
                                <router-link to="/" class="navbar-item is-active">
                                    Home
                                </router-link>
                                <router-link to="/detail" class="navbar-item">
                                    Detial
                                </router-link>
                                <a class="navbar-item">
                                    Documentation
                                </a>
                                <span class="navbar-item">
                                    <a class="button is-primary is-inverted">
                                        <span>Login</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <!-- Hero content: will be in the middle -->
            <!-- <div class="hero-body">
                <div class="container has-text-centered text-shadow">
                    <h1 class="title">
                        喵呜啊呜
                    </h1>
                    <h2 class="subtitle">
                        爱宠大作战
                    </h2>
                </div>
            </div> -->

            <!-- Hero footer: will stick at the bottom -->
            <!-- <div class="hero-foot">
                <nav class="tabs">
                    <div class="container">
                        <ul>
                            <li class="is-active">
                                <a>Overview</a>
                            </li>
                            <li>
                                <a>Modifiers</a>
                            </li>
                            <li>
                                <a>Grid</a>
                            </li>
                            <li>
                                <a>Elements</a>
                            </li>
                            <li>
                                <a>Components</a>
                            </li>
                            <li>
                                <a>Layout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div> -->
        </section>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 0.1em 0.1em rgba(201, 63, 219, 0.5);
}
</style>
