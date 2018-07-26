<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu :active-name="activeName" theme="dark" width="auto" :open-names="['1']" @on-select="handleSelect">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        数据管理
                    </template>
                    <MenuItem name="order"> 订单管理</MenuItem>
                    <MenuItem name="user"> 用户管理</MenuItem>
                    <MenuItem name="pet"> 宠物管理</MenuItem>
                    <MenuItem name="category"> 分类管理</MenuItem>
                    <MenuItem name="breed"> 品种管理</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px rgba(0,0,0,0.15)'}">
                <router-link to="/">Home</router-link>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <!-- <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb> -->
                <Card :style="{ marginTop:'16px' }">
                    <div style="minHeight: 600px">
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
  mounted() {
    this.activeName = this.$route.path.split("/")[2];
  },
  data() {
    return {
      activeName: "category"
    };
  },
  methods: {
    handleSelect(name) {
      this.$router.push(name);
      this.activeName = name;
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

form h2 {
  text-align: center;
  border-bottom: 1px dashed #aaaaaa;
  padding-bottom: 10px;
}
</style>
