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
        <h2>品种管理表单</h2>
        <FormItem label="品种名称" prop="name">
          <Input v-model="current.name" placeholder="请输入品种名称"></Input>
        </FormItem>
        <FormItem label="所属种类" prop="category_id">
          <Input v-model="current.category_id" placeholder="请输入所属种类"></Input>
        </FormItem>
        <Button type="primary" html-type="submit">提交</Button>
        <Button @click="showForm = false" style="marginLeft:10px">取消</Button>
      </Form>
    </section>

    <Table :columns="columnsConfig" :data="list"></Table>
  </div>
</template>

<script>
// import api from "./../../api/";

import AdminMixinsVue from "./mixins/AdminMixins.vue";
export default {
  mixins: [AdminMixinsVue],
  data() {
    return {
      model: "breed",
      current: {},
      currentPage: 1,
      columnsConfig: [
        {
          title: "种类名称",
          key: "name"
        },
        {
          title: "所属种类",
          key: "category_id"
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
  },
  methods: {}
};
</script>

<style scoped>
</style>
