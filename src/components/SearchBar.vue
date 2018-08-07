<template>
  <div>
    <!-- main-search -->
    <div class="search-container">
      <div class="level">
        <div class="level-left">
          <button class="button" @click="switchForm(1)">分类</button>
          <button class="button" @click="switchForm(2)">品种</button>
          <button class="button" @click="switchForm(3)">毛色</button>
          <button class="button" @click="switchForm(4)">脾气</button>
          <button class="button" @click="switchForm(5)">年龄</button>
          <button class="button" @click="switchForm(6)">价格</button>
        </div>
        <div class="level-right">
          <form @submit.prevent="handleSearch" class="search-input">
            <input type="text" v-model="keyword">
            <button type="submit" hidden>submit</button>
          </form>
        </div>
      </div>

      <!-- search-form -->
      <div class="search-form-container" v-if="showFrom>0">
        <form class="card search-form" v-if="showFrom == 1">
          <Select v-model="filter.category" filterable style="width:360px">
            <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          {{filter.category}}
        </form>

        <form class="card search-form" v-if="showFrom == 2">
          <Select v-model="filter.breed" filterable style="width:360px">
            <Option v-for="item in colorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          {{filter.breed}}
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
export default {
  created() {
    this.$store.dispatch("pet/getPetList");
  },
  data() {
    return {
      showFrom: false, // 控制是否显示搜索 item 的表单
      keyword: "",
      colorList: [
        {
          value: "3",
          label: "汪星人"
        },
        {
          value: "1",
          label: "喵星人"
        },
        {
          value: "2",
          label: "赛亚人"
        }
      ],
      model11: "",
      model12: [],
      filter: {
        category: "",
        breed: ""
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
    handleSearch() {
      let category_query = "";
      let filter = this.filter;

      filter.category &&
        (category_query = ` and "category_id" = ${filter.category} `);

      let query = `where ("title" contains "${
        this.keyword
      }"  ${category_query})`;

      // console.log(query);
      this.$store.dispatch("pet/searchPetList", { query, page: 1 });
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
  }
  .search-input {
    float: right;
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
