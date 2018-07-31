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
          <Select v-model="current.category_id" clearable filterable remote :remote-method="getCategoryList" :loading="loading" placeholder="请输入关键字以选择种类">
            <Option v-for="(option, index) in categoryOptions" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
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
import api from "../../api";
export default {
  mixins: [AdminMixinsVue],
  mounted() {
    this.readCategoryList();
  },
  data() {
    return {
      model: "breed", // 模型名
      current: {},
      currentPage: 1,
      loading: false,
      categoryOptions: [], // 分类选项
      categoryListCache: [], // 分类缓存，方便稍后进行读取
      columnsConfig: [
        {
          title: "种类名称",
          key: "name"
        },
        {
          title: "所属种类",
          key: "category_id",
          render: (h, params) => {
            let item = this.getCategoryNameByid(params.row.category_id);
            return h("div", {}, item);
          }
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
  methods: {
    getCategoryList(query) {
      this.loading = true;

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        api(`category/search`, { or: { name: query } }).then(r => {
          this.loading = false;
          this.categoryOptions = r.data.map(item => {
            return {
              value: item.id,
              label: item.name
            };
          });
        });
      }, 300);
    },
    readCategoryList() {
      api("category/read").then(r => {
        this.categoryOptions = r.data.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        this.categoryListCache = this.categoryOptions.concat();
      });
    },
    getCategoryNameByid(id) {
      let result = this.categoryListCache.filter(item => item.value == id);
      return result[0].label;
    }
  }
};
</script>

<style scoped>
</style>
