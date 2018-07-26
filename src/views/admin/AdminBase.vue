<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="data-category" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        数据管理
                    </template>
                    <MenuItem name="data-category">
                    <router-link to="/admin/category" tag="li">分类管理</router-link>
                    </MenuItem>
                    <MenuItem name="date-user">
                    <router-link to="/admin/user" tag="li">用户管理</router-link>
                    </MenuItem>
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
                    <div style="height: 600px">
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {};
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
</style>
