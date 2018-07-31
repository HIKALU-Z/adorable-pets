<template>
    <div>
        <Nav></Nav>

        <section>
            <div class="picture-container">
                <div class="picture-main">
                    <button class="button is-parent btn-save">
                        <span class="icon has-text-info">
                            <!-- <i class="fas fa-home"></i> -->
                            <!-- <i class="material-icons">heart</i> -->
                            <i class="mdi mdi-heart-outline"></i>
                        </span>
                        <span>收藏</span>
                    </button>

                    <button class="button is-parent btn-share">
                        <span class="icon has-text-info">
                            <i class="mdi mdi-share"></i>
                        </span>
                        <span>分享</span>
                    </button>

                    <button class="button is-parent btn-view">
                        <span class="icon has-text-info">
                            <i class="mdi mdi-image-multiple"></i>
                        </span>
                        <span>查看照片</span>
                    </button>
                </div>
                <!-- <img src="./../assets/img/cat/miao-10.jpg" alt="cat"> -->
            </div>
        </section>

        <section class="section">
            <div class="columns">
                <div class="column is-8">
                    <h1 class="title">猫咪，小奶猫，美短，英短，布偶!</h1>
                    <hr>
                    <div class="columns">
                        <div class="column is-3 card">年龄</div>
                        <div class="column is-3 card">纯种</div>
                        <div class="column is-3 card">性别</div>
                        <div class="column is-3 card">防疫</div>
                    </div>
                    <hr>
                    <div>
                        1234
                    </div>
                    <hr>
                    <div>
                        1234
                    </div>
                    <hr>
                </div>
                <div class="column is-4">
                    <div class="box">
                        <h2 class="title">This is a Persian cat!
                        </h2>
                        <p class="subtitle mdi mdi-currency-cny">1000
                        </p>
                        <button class="button is-primary" @click="handleGo(current)">Payme </button>
                    </div>
                </div>
            </div>
        </section>

        <Footer></Footer>
    </div>
</template>

<script>
const Nav = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Nav.vue");
const Footer = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Footer.vue");
export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      current: {
        pet_id: 1
      }
    };
  },
  methods: {
    handleGo(query) {
      console.log(this.$router);
      //   return;
      this.$router.push("/order/new");
      this.$router.replace({ query });
    }
  }
};
</script>

<style lang="scss" scoped>
.picture-container {
  position: relative;
  border-top: 8px solid #ffffff;
  //   height: 300px;
  .picture-main {
    background-color: rgb(54, 214, 214);
    background-image: url("./../assets/img/cat/miao-10.jpg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    .btn-save,
    .btn-share,
    .btn-view {
      position: absolute;
    }
    .btn-save {
      top: 20px;
      right: 20px;
    }
    .btn-share {
      top: 20px;
      right: 110px;
    }
    .btn-view {
      bottom: 20px;
      left: 20px;
      box-shadow: 0 1px 1px 1px rgba($color: #000000, $alpha: 0.15);
    }
  }
}
.section hr {
  color: #ffffff;
  border: 1px dashed #a6ccecc9;
  height: 0;
}
</style>
