<template>
  <div class="root">
    <div class="card content">
      <h1>do some thing </h1>
      <div>
        <div class="cute-form">
          <form @submit.prevent="submit('username')" v-if="show.username" class="input-group">
            <input style="width: 60%;" type="text" v-model="current.username" autofocus>
            <button type="submit" style="width: 20%;" class="btn-primary">提交</button>
            <button @click="show.username=false" type="button" style="width: 20%;">取消</button>
          </form>
          <div v-else>
            <span class="key">用户名</span>
            <span class="value">{{current.username || '-'}}</span>
            <span @click="show.username=!show.username" class="anchor">编辑</span>
          </div>
        </div>
        <div class="cute-form">
          <form @submit.prevent="submit('intro')" v-if="show.intro" class="input-group">
            <input style="width: 60%;" type="text" v-model="current.intro" autofocus>
            <button type="submit" style="width: 20%;" class="btn-primary">提交</button>
            <button @click="show.intro=false" type="button" style="width: 20%;">取消</button>
          </form>
          <div v-else>
            <span class="key">签名</span>
            <span class="value">{{current.intro || '-'}}</span>
            <span @click="show.intro=!show.intro" class="anchor">编辑</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card content">
      123
    </div>
  </div>
</template>

<script>
import session from "./../../utils/session.js";
export default {
  data() {
    return {
      show: {
        username: false,
        password: false,
        intro: false
      },
      current: session.uinfo()
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  padding: 16px;
}
</style>
