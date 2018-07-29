<template>
    <div>
        <div class="search-container">
            <button class="button">毛色</button>
            <button class="button">脾气</button>
            <button class="button">年龄</button>
            <button class="button">价格</button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search-container {
  background-color: #fff;
  padding: 20px;
  * {
    margin-left: 20px;
  }
  *:first-child {
    margin-left: 0;
  }
}
</style>
