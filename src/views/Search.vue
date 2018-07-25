<template>
    <div>
        <SearchBar></SearchBar>
    </div>
</template>

<script>
const SearchBar = () => import("./../components/SearchBar");
export default {
  components: {
    SearchBar
  }
};
</script>

<style scoped>
</style>
