<script>
import api from "./../../../api";
export default {
  data() {
    return {
      showForm: false,
      list: [],
      keyword: "",
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
      ]
    };
  },
  mounted() {
    this.read();
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
    },
    read() {
      api(`${this.model}/read`, this.current).then(r => {
        this.list = r.data;
      });
    }
  }
};
</script>
