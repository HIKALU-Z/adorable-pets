<template>
    <div class="root">
        <div class="card content">
            123
        </div>
        <div class="card content" style="margin-top:10px">
            123
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.content {
  padding: 16px;
}
.root {
  > div {
    margin-top: 16px;
  }
  > div:first-child {
    margin-top: 0;
  }
}
</style>
