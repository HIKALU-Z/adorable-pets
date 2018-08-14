<template>
  <div>
    <!-- main-search -->
    <div class="search-container">
      <!-- search-button -->
      <form @submit.prevent="handleSearch" class="search-input">
        <input type="text" v-model="keyword" placeholder="请输入标题搜索萌宠">
        <button type="submit" hidden>submit</button>
      </form>
      <button class="button" @click="switchForm(1)">分类</button>
      <button class="button" @click="switchForm(2)">品种</button>
      <button class="button" @click="switchForm(3)">价格</button>

      <!-- search-form -->
      <div class="search-form-container" v-if="showFrom>0">
        <form class="card search-form" v-if="showFrom == 1">
          <Select v-model="filter.category" clearable filterable style="width:360px" placeholder="分类">
            <Option v-for="item in categoryOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form>

        <form class="card search-form" v-if="showFrom == 2">
          <Select v-model="filter.breed" clearable filterable style="width:360px" placeholder="品种">
            <Option v-for="item in breedOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </form>

        <form class="card search-form" v-if="showFrom == 3" @submit.prevent="handleSearchByPrice">
          <input type="number" v-model="price.min" placeholder="最低价">
          <input type="number" v-model="price.max" placeholder="最高价">
          <button type="submit" class="button is-primary is-small">确定</button>
          <!-- {{filter.max}} {{filter.min}} -->
        </form>
      </div>
    </div>

    <!-- mask -->
    <div class="mask" v-if="showFrom" @click="closeSearchForm">
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "../api";
export default {
  created() {
    this.$store.dispatch("pet/getPetList");
  },
  mounted() {
    this.getModelOptions("breed");
    this.getModelOptions("category");
  },
  data() {
    return {
      timer: 0, // 计数器，用于 filter 改变的 debounce function
      showFrom: false, // 控制是否显示搜索 item 的表单
      keyword: "", // search keyword
      categoryOptions: [],
      breedOptions: [],
      // main filter when it changes it will trigger search event
      filter: {
        category: "",
        breed: "",
        min: "",
        max: ""
      },
      price: {
        min: "",
        max: ""
      }
    };
  },
  computed: {
    ...mapState({
      petList: state => state.pet.petList
    })
  },
  methods: {
    /**
     * 关闭表单显示
     * @param e
     */
    closeSearchForm(e) {
      if (e.target != e.currentTarget) {
        return;
      } else {
        this.showFrom = false;
      }
    },
    /**
     * 切换表单显示与否
     */
    switchForm(id) {
      if (this.showFrom == id) {
        this.showFrom = 0;
      } else {
        this.showFrom = id;
      }
    },
    getModelOptions(model) {
      api(`${model}/read`)
        .then(r => {
          if (r.data == null) {
            return;
          }
          this[`${model}Options`] = r.data.map(item => {
            return {
              value: item.id,
              label: item.name
            };
          });
        })
        .catch(err => {
          throw new Error(err);
        });
    },
    handleSearch() {
      // 生成 query 条件
      let categoryQuery = "",
        breedQuery = "",
        minPriceQuery = "",
        maxPriceQuery = "";

      let filter = this.filter;

      filter.category &&
        (categoryQuery = ` and "category_id" = ${filter.category} `);
      filter.min && (minPriceQuery = ` and "price" >= ${filter.min}`);
      filter.max && (maxPriceQuery = ` and "price" <= ${filter.max}`);
      filter.breed && (breedQuery = ` and "breed_id" = ${filter.breed}`);

      let query = `where ("title" contains "${
        this.keyword
      }" ${categoryQuery} ${minPriceQuery} ${maxPriceQuery} ${breedQuery})`;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$store.dispatch("pet/searchPetList", { query, page: 1 });
      }, 500);
    },
    handleSearchByPrice() {
      let { min = 0, max = 0 } = this.price;
      min = parseInt(min);
      max = parseInt(max);
      if (min > max) {
        let cache = max;
        max = min;
        min = cache;
      }
      this.filter.min = min;
      this.filter.max = max;
    }
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.handleSearch();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
  padding: 20px;
  button {
    margin-left: 20px;
  }
  button:first-child {
    margin-left: 0;
  }
  .search-input {
    display: inline-block;
    input {
      padding: 4px 10px;
    }
  }
}
.search-form-container {
  position: absolute;
  top: 78px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  // height: 100vh;
  background-color: rgba($color: #ffffff, $alpha: 0.5);
  .search-form {
    padding: 10px 20px;
    input {
      padding-left: 5px;
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 130px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba($color: #000, $alpha: 0.2);
  z-index: 1;
}
@media screen and (max-width: 768px) {
  .search-form-container {
    top: 130px;
  }
}
@media screen and (max-width: 500px) {
  .search-form-container {
    top: 160px;
  }
}
</style>
