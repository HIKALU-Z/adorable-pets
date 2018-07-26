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
                    <h1>A Pirate's Life For Me - Houseboat!</h1>
                    <hr>
                    <div class="columns">
                        <div class="column is-3 card">已绝育</div>
                        <div class="column is-3 card">已绝育</div>
                        <div class="column is-3 card">已绝育</div>
                        <div class="column is-3 card">已绝育</div>
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel placeat recusandae voluptate sed aspernatur iusto accusantium corrupti minima voluptas, ad quam, fuga, id dolorum soluta minus consequuntur veritatis? Hic, nemo.
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
