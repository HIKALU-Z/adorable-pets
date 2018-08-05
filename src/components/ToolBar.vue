<template>
    <div>
        <div :class="[ 'toolbar-container',isCartActive ? 'active' : '' ]">
            <SideCart></SideCart>
            <!-- <div class="mask" v-if="isCartActive"></div> -->
            <ul class="toolbar-list">
                <li class="toolbar-item" @click="isCartActive=!isCartActive">
                    <i class="mdi mdi-cart-outline"></i>
                    <span class="toolbar-content">购物车</span>
                    <!-- couwuche -->
                    <!-- <span class="toolbar-content">购物车</span> -->
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
const SideCart = () =>
  import(/* webpackChunkName: "group-App" */ "./../components/SideCart.vue");
export default {
  components: {
    SideCart
  },
  methods: {},
  data() {
    return {
      isCartActive: false
    };
  }
};
</script>

<style lang='scss' scoped>
.toolbar-list {
  //   color: #ffbe00;
  position: absolute;
  top: 40%;
  right: 400px;
  z-index: inherit;
  .toolbar-item {
    background-color: rgba($color: #000000, $alpha: 0.3);
    width: 40px;
    padding: 5px 10px;
    color: #ffffff;
    font-size: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: width 0.7s ease-in-out;
    white-space: nowrap;
    .toolbar-content {
      margin-left: 10px;
    }
    &:hover {
      width: 120px;
      background-color: rgba($color: #df6d6d, $alpha: 0.7);
    }
  }
}
.toolbar-container {
  position: fixed;
  background-color: #f0f0f0;
  // padding: 20px;
  width: 400px;
  right: -400px;
  top: 52px;
  bottom: 0;
  transition: all 0.7s;
  z-index: 2;
}
.toolbar-container.active {
  right: 0;
  box-shadow: -2px 0 3px rgba($color: #000000, $alpha: 0.3);
}
</style>
