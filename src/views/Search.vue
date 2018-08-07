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
                <div class="pet-desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit optio vel, magnam, veniam reiciendis vitae blanditiis ratione eligendi iure, ullam eaque? Necessitatibus suscipit eaque voluptatem tempore facere ex quisquam ea!
                </div>
              </figure>

            </article>
            <!-- {{item}} -->
          </div>
        </div>
      </div>
      <div class="has-text-centered">
        <Page :total="petTotal" :page-size="8" :current="currentPage" show-elevator @on-change="handlePageChange"></Page>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>

<script>
// import api from "../api";
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
  data() {
    return {
      keyword: "",
      list: [],
      filter: {}
    };
  },
  computed: {
    ...mapState({
      petList: state => state.pet.petList,
      petTotal: state => state.pet.total,
      currentPage: state => state.pet.currentPage
    })
  },
  methods: {
    handlePageChange(index) {
      this.$store.dispatch("pet/searchPetList", { page: index });
    }
  }
};
</script>

<style scoped>
.box figure {
  position: relative;
}
.pet-title {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pet-desc {
  height: 60px;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  position: absolute;
  /* top: 104px; */
  left: 0;
  right: 0;
  bottom: 0;
  color: #ffffff;
  padding: 5px;
  font-size: 1rem;
  line-height: 1.8rem;
  opacity: 0;
  transition: opacity 0.3s ease-in;
}
article:hover .pet-desc {
  opacity: 1;
}
.box-title {
  font-size: 1.4rem;
  font-weight: bold;
  color: teal;
}
</style>
