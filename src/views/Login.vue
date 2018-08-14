<template>
  <div>
    <Nav></Nav>
    <section class="section is-medium">
      <Row>
        <Col :xs="{ span: 8, offset: 8 }" :lg="{ span: 8, offset:8 }">
        <div class="box">
          <h1 class="title has-text-centered">登录</h1>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" @submit.native.prevent>
            <FormItem label="用户名" prop="username">
              <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input v-model="formValidate.password" type="password" placeholder="Enter your password"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" html-type="submit" @click="handleSubmit('formValidate')">提交</Button>
              <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
            </FormItem>
            <FormItem>
              <div class="well">
                <span>测试账号</span>
                <ul>
                  <li>用户名：admin</li>
                  <li>密码：123123</li>
                </ul>
              </div>
            </FormItem>
          </Form>
        </div>
        </Col>
      </Row>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "./../components/Login/Nav";
import Footer from "./../components/Footer";
import session from "./../utils/session.js";
export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      formValidate: {
        name: "",
        password: ""
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let unique, password;

          if (
            !(unique = this.formValidate.username) ||
            !(password = this.formValidate.password)
          ) {
            return;
          }

          if (unique === "admin" && password === "123123") {
            this.onLoginSucceed({ id: 1, username: "admin", is_admin: true });
            return;
          }

          session
            .exist(this.formValidate.username, this.formValidate.password)
            .then(row => {
              if (!row) {
                // this.login_failed = true;
                this.$Message.error("登录失败，请检查用户名或密码");
                return;
              }
              this.onLoginSucceed(row);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    onLoginSucceed(row) {
      delete row.password;
      session.login(row);
      // alert("Yo.");
      this.$Message.success("Login Success!");
      setTimeout(() => {
        if (session.is_admin()) {
          this.$router.push("/admin/order");
          return;
        }
        this.$router.push("/");
      }, 1000);
    }
  }
};
</script>

<style scoped>
.well {
  border-radius: 8px;
  padding: 10px 20px;
  background: rgba(207, 72, 72, 0.3);
  box-shadow: 0 0 5px 1px rgba(82, 33, 33, 0.2) inset;
}
</style>
