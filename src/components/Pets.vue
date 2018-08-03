<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="category-container" v-for="category in categoryList" :key="category.name">
          <h1 class="title">{{category.name}}</h1>
          <!-- <p>{{category.$pet}}</p> -->
          <div class="columns is-multiline">
            <div class="column is-4" v-for="pet in category.$pet" :key="pet.id">
              <router-link :to="'/detail/'+pet.id" tag="article" class="card">
                <div class="card-image">
                  <figure class="image is-3by2">
                    <img :src="pet.cover_url || 'http://img5.imgtn.bdimg.com/it/u=167640062,1078515027&fm=27&gp=0.jpg '" alt="cat image">
                  </figure>
                </div>

                <div class="card-content">
                  <h3>{{pet.title}}</h3>
                  <i class="mdi mdi-currency-cny">{{pet.price*300}}</i>
                  <Rate style="float:right;clear:both" disabled v-model="starValue"></Rate>
                </div>
                <div class="card-footer">
                  <div class="card-footer-item">
                    <i class="mdi mdi-map-marker"></i>南京
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>
<script>
import api from "../api";
export default {
  mounted() {
    this.read();
    this.getCategoryList();
  },
  data() {
    return {
      step: 0,
      petList: [],
      categoryList: [],
      starValue: 5,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    read() {
      api("pet/read").then(r => {
        this.petList = r.data;
      });
    },
    getCategoryList() {
      api("category/read", {
        with: { relation: "has_many", model: "pet" }
      }).then(r => {
        this.categoryList = r.data;
        console.log("cat", r.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  h1 {
    margin-top: 1.5rem;
    &:first {
      margin-top: 0;
    }
  }
}
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
  h3 {
    font-size: 1.2rem;
    font-weight: 700;
  }
}
.img-container {
  background-size: cover;
  background-position: center;
}
</style>
