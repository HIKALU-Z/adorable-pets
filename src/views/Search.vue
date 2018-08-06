<template>
  <div>
    <Nav></Nav>
    <SearchBar></SearchBar>

    <section class="section" style="padding-top:7rem">
      <div class="columns is-multiline">
        <div class="column is-3" v-for="item in petList" :key="item.id">
          <div class="box">
            <article>
              <div class="pet-title">
                <router-link class="box-title" :title="item.title" :to="`/detail/${item.id}`">{{item.title}}</router-link>
              </div>
              <figure class="image is-3by2">
                <img :src="item.cover_url || 'https://dummyimage.com/600x400/cccccc/ffffff.png'" alt="">
              </figure>
            </article>
            <!-- {{item}} -->
          </div>
        </div>
      </div>

    </section>

    <Footer></Footer>
  </div>
</template>

<script>
import api from "../api";
import { mapState } from "vuex";
const Nav = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Nav.vue");
const Footer = () =>
  import(/* webpackChunkName: "group-Detail" */ "./../components/Footer.vue");
const SearchBar = () => import("./../components/SearchBar");
export default {
  components: {
    Nav,
    SearchBar,
    Footer
  },
  created() {
    this.$store.dispatch("pet/getPetList");
  },
  mounted() {
    this.search();
  },
  data() {
    return {
      keyword: "",
      list: [],
      filter: {}
    };
  },
  computed: {
    ...mapState({
      petList: state => state.pet.petList
    })
  },
  methods: {
    search(keyword) {
      let query = `where("title" contains "${keyword}" ) `;
      let f = this.filter;
      f.category_id && (query += ` and "category_id" = ${f.category_id} `);
      f.breed_id && (query += ` and "breed_id" = ${f.breed_id} `);
      f.color_id && (query += ` and "color_id" = ${f.color_id} `);
      f.character_id && (query += ` and "character_id" = ${f.character_id} `);

      api("cart/read", {}).then(r => {
        this.result = r.data || [];
      });
    }
  }
};
</script>

<style scoped>
.pet-title {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.box-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: teal;
}
</style>
