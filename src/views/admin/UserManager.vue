<template>
  <div>
    <div class="level">
      <div class="level-left">
        <Input v-model="keyword">
        <Button slot="append" icon="ios-search"></Button>
        </Input>
      </div>
      <div class="level-right">
        <Button type="primary" @click="showForm = true">创建</Button>
      </div>
    </div>

    <section class="box" v-if="showForm">
      <Form :model="current" @submit.native.prevent="handleSubmit">
        <h2>分类管理表单</h2>
        <FormItem label="用户姓名" prop="username">
          <Input v-model="current.username" placeholder="用户姓名"></Input>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input v-model="current.phone" placeholder="电话"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="current.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem label="密码" prop="username">
          <Input v-model="current.password" type="password" placeholder="密码"></Input>
        </FormItem>
        <Button type="primary" html-type="submit">提交</Button>
        <Button @click="showForm = false" style="marginLeft:10px">取消</Button>
      </Form>
    </section>

    <Table :columns="columnsConfig" :data="list"></Table>
  </div>
</template>

<script>
import AdminMixinsVue from "./mixins/AdminMixins.vue";
export default {
  mixins: [AdminMixinsVue],
  data() {
    return {
      model: "user",
      columnsConfig: [
        { title: "用户名", key: "username" },
        { title: "邮箱", key: "email" },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "操作",
          key: "action",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                    // size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleEditItem(params);
                    }
                  }
                },
                "Edit"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning"
                    // size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleRemoveItem(params.row.id);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
