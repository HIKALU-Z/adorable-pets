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
        <h2>宠物管理表单</h2>
        <FormItem label="标题" prop="title">
          <Input v-model="current.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="颜色" prop="color">
          <Input v-model="current.color" placeholder="请输入颜色"></Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="current.description" type="textarea" placeholder="请输入描述"></Input>
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="current.price" placeholder="请输入价格"></Input>
        </FormItem>
        <FormItem label="性格" prop="character">
          <Input v-model="current.character" placeholder="说说你的宠物什么性格"></Input>
        </FormItem>
        <FormItem label="出生日期" prop="birthday">
          <Input v-model="current.birthday" type="date" placeholder="请输入价格"></Input>
        </FormItem>
        <FormItem label="封面照片" prop="cover_url">
          <Input v-model="current.cover_url" placeholder="请输入封面照片地址"></Input>
        </FormItem>
        <FormItem label="品牌" prop="breed">
          <Select v-model="current.breed" filterable  :remote-method="remoteMethod" :loading="loading" placeholder="请输入关键字以选择品牌">
            <Option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>

        <FormItem label="种类" prop="category_id">
          <Input v-model="current.category_id" placeholder="请输入种类"></Input>
        </FormItem>
        <FormItem label="是否绝育" prop="neuter">
          <RadioGroup v-model="current.neuter">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
            {{current.neuter}}
          </RadioGroup>
        </FormItem>
        <FormItem label="是否接种疫苗" prop="vaccinated">
          <RadioGroup v-model="current.vaccinated">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否纯种" prop="pure_breed">
          <RadioGroup v-model="current.pure_breed">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否有遗传疾病" prop="disease">
          <RadioGroup v-model="current.disease">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="current.sex">
            <Radio label="1">公</Radio>
            <Radio label="0">母</Radio>
          </RadioGroup>
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
      model: "pet",
      current: {},
      currentPage: 1,
      loading: false,
      options: [],
      dataList: ["a", "b", "c"],
      columnsConfig: [
        {
          title: "标题",
          key: "title",
          fixed: "left",
          width: 120
        },
        {
          title: "描述",
          key: "description",
          width: 100
        },
        {
          title: "性格",
          key: "character",
          width: 100
        },
        {
          title: "绝育",
          key: "neuter",
          width: 100
        },
        {
          title: "是否纯种",
          key: "pure_breed",
          width: 100
        },
        {
          title: "是否接种疫苗",
          key: "vaccinated"
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          fixed: "right",
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
    // 搜索远程数据
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          const list = this.dataList.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style scoped>
</style>
