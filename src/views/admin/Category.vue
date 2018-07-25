<template>
    <div>
        <div class="level">
            <div class="level-left">
                <Input v-model="keyword" style="width:300px">
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
                <FormItem label="分类名称" prop="name">
                    <Input v-model="current.name" name="name" placeholder="Enter something..."></Input>
                </FormItem>
                <Button type="primary" html-type="submit">提交</Button>
                <Button @click="showForm = false" style="marginLeft:10px">取消</Button>
            </Form>
        </section>

        <Table :columns="columnsConfig" :data="list"></Table>
    </div>
</template>

<script>
import api from "./../../api/";
export default {
  mounted() {
    this.read();
  },
  data() {
    return {
      keyword: "",
      showForm: false,
      model: "category",
      current: {},
      currentPage: 1,
      columnsConfig: [
        {
          title: "种类名称",
          key: "name"
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
      ],
      list: []
    };
  },
  methods: {
    handleSubmit() {
      let action = this.current.id ? "update" : "create";
      console.log(this.current);

      api(`${this.model}/${action}`, this.current).then(() => {
        this.current = {};
        this.read();
        this.showForm = false;
      });
    },
    read() {
      api(`${this.model}/read`, this.current).then(r => {
        this.list = r.data;
        console.log(r.data);
      });
    },
    handleEditItem(params) {
      this.showForm = true;
      this.current = Object.assign({}, params.row);
      console.log(params.row);
    },
    handleRemoveItem(id) {
      if (id < 0 || !id) {
        return;
      }
      if (!confirm("确定删除？")) return;

      api(`${this.model}/delete`, { id }).then(() => {
        console.log("this.currentPage:", this.currentPage);
        this.read(this.currentPage);
      });
    }
  }
};
</script>

<style scoped>
form h2 {
  text-align: center;
  border-bottom: 1px dashed #aaaaaa;
  padding-bottom: 10px;
}
</style>
