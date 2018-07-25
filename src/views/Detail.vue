<template>
    <div>
        <!-- <Hero></Hero> -->
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
        <section class="section is-medium">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur doloremque earum consectetur numquam sapiente perspiciatis ducimus cupiditate quaerat, inventore vero, dignissimos dolorem veniam, odio commodi possimus. Accusantium veritatis est rem!
            <div class="box">
                夕阳沿着西湖边
            </div>
        </section>
    </div>
</template>

<script>
const Hero = () => import("./../components/Hero.vue");
export default {
  components: {
    Hero
  }
};
</script>

<style lang="scss" scoped>
.picture-container {
  position: relative;
  //   border-top: 8px solid #ffffff;
  //   height: 300px;
  .picture-main {
    // position: absolute;
    // top: 0;
    // right: 0;
    // left: 0;
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
</style>
