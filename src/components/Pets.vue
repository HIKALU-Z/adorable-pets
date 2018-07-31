<template>
    <div>
        <section class="section">
            <div class="container">
                <!-- first-tile -->
                <div class="columns is-multiline">
                    <div class="column is-4" v-for="(item, index) in 7" :key="index">
                        <router-link :to="'/detail/'+item" tag="article" class="card">
                            <div class="card-image">
                                <figure class="image is-16by9">
                                    <img src="./../assets/img/cat/miao-4.jpg" alt="">
                                </figure>
                            </div>

                            <div class="card-content">
                                <i class="mdi mdi-currency-cny">188</i>
                                <Rate style="float:right;clear:both" disabled v-model="value"></Rate>
                                <!-- <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div> -->
                            </div>
                            <div class="card-footer">
                                <div class="card-footer-item">
                                    <i class="mdi mdi-map-marker"></i>南京
                                </div>
                                <!-- <div class="card-footer-item">B</div> -->
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: 5
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    box-shadow: 0 2px 3px 1px rgba($color: #000000, $alpha: 0.2);
  }
  .thumbnail {
    height: 150px;
  }
  .content {
    padding: 8px 16px;
  }
}
</style>
