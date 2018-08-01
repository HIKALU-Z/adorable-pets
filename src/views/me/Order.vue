<template>
    <div class="card content">
        <div class="table">
            <table>
                <thead>
                    <th>订单号</th>
                    <th>总价</th>
                    <th>已付款</th>
                    <th>产品信息</th>
                    <th>操作</th>
                </thead>
                <tbody>
                    <tr v-for="row in list" :key='row.oid'>
                        <td>{{row.oid || '-'}}</td>
                        <td>{{row.sum || 0}}</td>
                        <td>{{row._paid ? '是' : '否'}}</td>
                        <td>
                            <span @click="show_detail(row)" class="anchor">详情</span>
                        </td>
                        <td>
                            <div>
                                <div v-if="!row._paid">
                                    <router-link :to="`/pay/${row.oid}`" class="btn-small">付款</router-link>
                                    <span @click="cancel(row.id)" class="anchor btn-small">取消订单</span>
                                </div>
                                <div v-else>-</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import api from "../../api";
import session from "./../../utils/session.js";
export default {
  mounted() {
    this.read();
  },
  data() {
    return {
      current: {},
      pet: {},
      list: [],
      detail_visible: false
    };
  },
  methods: {
    read() {
      api("order/read", {
        with: "has_one:pet",
        where: { user_id: session.his_id() }
      }).then(r => {
        this.list = r.data;
      });
    },
    show_detail(row) {
      this.current = row;
      this.detail_visible = true;
      this.findPet(row.product_info);
    },
    findPet(pet_id) {
      api("pet/find", { id: pet_id }).then(r => {
        this.pet = r.data;
      });
    }
  }
};
</script>

<style scoped>
.content {
  padding: 16px;
}
tr:hover {
  background-color: rgba(15, 0, 180, 0.1);
}
</style>
