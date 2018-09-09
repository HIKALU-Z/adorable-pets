<template>
  <div>
    <Nav></Nav>
    <section>
      <div class="picture-container">
        <div class="picture-main" :style="`backgroundImage:url('${current.cover_url}')`">
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
    <!-- <Carousel v-model="step" loop>
            <CarouselItem>
                <figure class="demo-carousel image is-3by2">
                    <img :src="'http://img5.imgtn.bdimg.com/it/u=167640062,1078515027&fm=27&gp=0.jpg '" alt="cat image">
                </figure>
            </CarouselItem>
            <CarouselItem>
                <figure class="demo-carousel image is-3by2">
                    <img :src="'http://img5.imgtn.bdimg.com/it/u=167640062,1078515027&fm=27&gp=0.jpg '" alt="cat image">
                </figure>
            </CarouselItem>
        </Carousel> -->
    <section class="section">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title">{{current.title}}</h1>
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
            <h2 class="title">This is a {{ current.$bread && current.$breed.name || "cute"}} {{ current.$category && current.$category.name}}!
            </h2>
            <p class="subtitle mdi mdi-currency-cny">1000
            </p>
            <button class="button is-default" @click="handleAddToCart">加入购物车</button>
            <!-- <button v-if="isInCart" class="button is-default" disabled>已加入购物车</button> -->
            <button class="button is-primary" style="margin-left:10px" @click="handleBuy(current.id)">直接购买</button>
          </div>
        </div>
      </div>
    </section>
    <ToolBar></ToolBar>
    <Footer></Footer>
  </div>
</template>

<script>
import api from "../api";
import session from "../utils/session";
const Nav = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Nav.vue");
const Footer = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Footer.vue");
const ToolBar = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/ToolBar.vue");
export default {
  components: {
    Nav,
    ToolBar,
    Footer
  },
  created() {
    this.pet_id = this.$route.params.id;
    // this.checkPetExistInCart();
  },
  mounted() {
    this.getDetailInfo();
  },
  data() {
    return {
      step: 0,
      pet_id: null,
      current: {},
      count: 1,
      user_id: session.his_id(),
      cartList: []
      // isInCart: false // 判断当前宠物是否在购物车内,默认不在宠物车内
    };
  },
  methods: {
    getDetailInfo() {
      api("pet/find", {
        id: this.pet_id,
        with: [
          {
            relation: "has_one",
            model: "breed"
          },
          {
            relation: "has_one",
            model: "category"
          }
        ]
      }).then(r => {
        this.current = r.data;
      });
    },
    // 检测宠物是否已存在，如果已经有此宠物，那么就显示已加入购物车的按钮
    // checkPetExistInCart() {
    //   this.$store.state.cart.cartList.forEach(item => {
    //     if (item.pet_id == this.pet_id) {
    //       this.isInCart = true;
    //     }
    //   });
    // },
    handleBuy(id) {
      this.$router.push({ path: "/order/new", query: { pet_id: id } });
    },
    handleAddToCart() {
      let obj = {
        user_id: this.user_id,
        pet_id: this.pet_id,
        count: this.count
      };
      if (!obj.user_id) {
        alert("尚未登录，请先登录");
        this.$router.push("/login");
        return;
      }
      let hasSamePet;
      this.$store.state.cart.cartList.forEach(item => {
        if (item.pet_id == this.pet_id) {
          hasSamePet = true;
        }
      });
      if (!hasSamePet) {
        this.$store.dispatch("cart/addItemToCart", obj);
        // this.isInCart = true;
      } else {
        this.$store.dispatch(
          "cart/incrementItemQuantity",
          parseInt(obj.pet_id)
        );
      }
      this.$Message.success("商品已成功加入购物车");
    }
  },
  computed: {}
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
