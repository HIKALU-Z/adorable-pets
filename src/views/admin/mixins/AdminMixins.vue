<script>
import api from "./../../../api";
export default {
  data() {
    return {
      showForm: false, // 展示编辑表格
      list: [], // 各个页面的主要 list
      keyword: "", // 搜索的关键字
      searchable: ["name"], // 可搜索的所有属性
      current: {}, // 当前的对象
      currentPage: 1, // 当前读取的页数
      timer: 0, // 为 debouce 函数设置的计时器
      with: {}, // 调用 read 方法时传递的参数，方便同时读取其他的关系型数据
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
        this.read(this.currentPage);
      });
    },
    /**
     * 监听 search 事件的触发
     */
    handleSearch() {
      let params = {
        or: {}
      };
      this.searchable.forEach(item => {
        params.or[item] = this.keyword;
      });

      api(`${this.model}/search`, {
        or: params.or
      }).then(r => {
        if (r.data !== null) {
          this.list = r.data;
        } else {
          this.list = [];
        }
      });
    },
    /**
     * 读取当前 model 列表
     */
    read() {
      api(`${this.model}/read`, {
        with: this.with
      }).then(r => {
        this.list = r.data;
      });
    }
  }
};
</script>
