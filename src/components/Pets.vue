<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="category-container" v-for="category in categoryList" :key="category.name">
          <div class="level">
            <div class="level-right">
              <h2 class="title">{{category.name}}</h2>
            </div>
            <div class="level-left">
              <router-link :to="`search?breed_id=${item.id}`" class="breed" v-for="item in category.$breed" :key="item.name">{{item.name}}</router-link>
              <router-link to="/search" class="breed more-breed">更多</router-link>
            </div>
          </div>

          <div class="columns is-multiline">
            <div class="column is-3" v-for="pet in category.$pet" :key="pet.id">
              <router-link :to="'/detail/'+pet.id" tag="article" class="card">
                <div class="card-image">
                  <figure class="image is-3by2">
                    <img :src="pet.cover_url || 'http://img5.imgtn.bdimg.com/it/u=167640062,1078515027&fm=27&gp=0.jpg '" alt="cat image">
                  </figure>
                </div>

                <div class="card-content">
                  <h3>{{pet.title}}</h3>
                  <i class="mdi mdi-currency-cny">{{pet.price}}</i>
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
        this.petList = r.data || [];
      });
    },
    getCategoryList() {
      api("category/read", {
        with: [
          { relation: "has_many", model: "pet" },
          { relation: "has_many", model: "breed" }
        ]
      }).then(r => {
        this.categoryList = r.data || [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  .level {
    margin-top: 20px;
    background-color: rgba($color: #ffffff, $alpha: 0.9);
    border: 2px solid rgba(0, 81, 255, 0.473);
    padding: 10px 20px;
    h2 {
      cursor: pointer;
    }
  }
  .level:first {
    margin-top: 0;
  }
  .level-left {
    .breed {
      display: inline-block;
      padding: 10px;
      color: #aaaaaa;
      cursor: pointer;
      &:hover {
        color: #000000;
      }
    }
    .more-breed {
      text-decoration: solid;
    }
  }
  .level-right {
    .title {
      font-size: 1.4rem;
      font-weight: 500;
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
