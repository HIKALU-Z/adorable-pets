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
        <h2>订单管理表</h2>
        <FormItem label="订单号" prop="oid">
          <Input v-model="current.oid" placeholder="请输入订单号"></Input>
        </FormItem>
        <FormItem label="宠物信息" prop="product_info">
          <Input v-model="current.product_info" placeholder="请输入宠物信息"></Input>
        </FormItem>
        <FormItem label="备注" prop="memo">
          <Input v-model="current.memo" placeholder="请输入备注"></Input>
        </FormItem>
        <FormItem label="用户编号" prop="user_id">
          <Input v-model="current.user_id" placeholder="请输入订单关联用户的编号"></Input>
        </FormItem>
        <FormItem label="总价" prop="sum">
          <Input v-model="current.sum" placeholder="请输入订单总价"></Input>
        </FormItem>
        <FormItem label="支付方式" prop="pay_by">
          <RadioGroup v-model="current.pay_by">
            <Radio label="支付宝"></Radio>
            <Radio label="微信"></Radio>
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
      model: "order",
      current: {},
      currentPage: 1,
      columnsConfig: [
        {
          title: "订单号",
          key: "oid"
        },
        {
          title: "下单用户",
          key: "user_id"
        },
        {
          title: "总价",
          key: "sum"
        },
        {
          title: "备注",
          key: "memo"
        },
        {
          title: "宠物信息",
          key: "product_info"
        },
        {
          title: "支付方式",
          key: "pay_by"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
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
