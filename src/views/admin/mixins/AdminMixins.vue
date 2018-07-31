<script>
import api from "./../../../api";
export default {
  data() {
    return {
      showForm: false, // 展示编辑表格
      list: [], // 各个页面的主要 list
      keyword: "", // 搜索的关键字
      current: {}, // 当前的对象
      currentPage: 1, // 当前读取的页数
      timer: 0, // 为 debouce 函数设置的计时器
      // 管理页面的表头
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
      ]
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    /**
     * 表单提交事件
     */
    handleSubmit() {
      let action = this.current.id ? "update" : "create";
      console.log(this.current);
      api(`${this.model}/${action}`, this.current).then(() => {
        this.current = {};
        this.read();
        this.showForm = false;
      });
    },
    /**
     * 编辑表单中的某一项
     */
    handleEditItem(params) {
      this.showForm = true;
      this.current = Object.assign({}, params.row);
      for (let key in this.current) {
        let item = this.current[key];
        if (item === true) {
          this.current[key] = "1";
        } else if (item === false) {
          this.current[key] = "0";
        }
      }
    },
    /**
     * 删除表单的某一项
     */
    handleRemoveItem(id) {
      if (id < 0 || !id) {
        return;
      }
      if (!confirm("确定删除？")) return;

      api(`${this.model}/delete`, { id }).then(() => {
        console.log("this.currentPage:", this.currentPage);
        this.read(this.currentPage);
      });
    },
    /**
     * 读取当前 model 列表
     */
    read() {
      api(`${this.model}/read`, this.current).then(r => {
        this.list = r.data;
      });
    }
  }
};
</script>
