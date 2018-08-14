<template>
  <div>
    <Nav></Nav>
    <section class="section is-medium">
      <Row>
        <Col :xs="{ span: 16, offset: 4 }" :lg="{ span: 16, offset: 4 }">
        <div class="box">
          <h1 class="title">注册</h1>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" label-position="left">
            <FormItem label="UserName" prop="username">
              <Input v-model="formValidate.username" placeholder="Enter your username"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="email">
              <Input v-model="formValidate.email" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="Phone" prop="phone">
              <Input v-model="formValidate.phone" placeholder="Enter your phone"></Input>
            </FormItem>
            <FormItem label="VerifyCode" prop="verifyCode">
              <Row>
                <Col span="16">
                <Input v-model="formValidate.verifyCode" placeholder="Enter your VerifyCode"></Input>
                </Col>
                <Col span="7" offset="1">
                <Button html-type="button" long :disabled="captcha.cooldown>0" @click="handleGetVerifyCode()">
                  <span v-if="captcha.cooldown>0">{{ captcha.cooldown }}
                  </span>
                  <span v-else>发送验证码</span>
                </Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="Password" prop="password">
              <Input v-model="formValidate.password" type="password" placeholder="Enter your password"></Input>
            </FormItem>
            <FormItem label="Confirm-password" prop="confirmPassword">
              <Input v-model="formValidate.confirmPassword" type="password" placeholder="Enter your confirmPassword"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
import api from "../api";

export default {
  mounted() {},
  components: {
    Nav,
    Footer
  },
  data() {
    // data 现在就像一个普通的函数一样，你可以在外部定义变量
    // 举例来说你在 data 内部定义的函数可以很好的帮你绑定 this
    const checkConfirmPassword = (rule, value, callback) => {
      if (value === "" || value !== this.formValidate.password) {
        callback(new Error("两次输入不一致"));
      } else {
        callback();
      }
    };
    return {
      // 表单验证
      formValidate: {
        name: "",
        mail: "",
        phone: ""
      },
      // 验证规则细节
      ruleValidate: {
        username: [
          {
            required: true,
            message: "The username cannot be empty",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "phone Box cannot be empty",
            trigger: "blur"
          },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur"
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: "confirmPassword cannot be empty",
            trigger: "blur"
          },
          {
            validator: checkConfirmPassword,
            required: true,
            trigger: "blur"
          }
        ],
        verifyCode: [
          {
            required: true,
            message: "confirmPassword cannot be empty",
            trigger: "blur"
          }
        ]
      },
      // 验证码对象
      captcha: {
        timer: null,
        cooldown: 0
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api("user/create", this.formValidate).then(() => {
            this.$Message.success("Success!");
            this.handleReset("formValidate");
            setTimeout(() => {
              this.$router.push("/login");
            }, 2000);
          });
        } else {
          this.$Message.error("填写信息有误，请重新填写");
        }
      });
    },
    // 监听获取验证码点击事件
    handleGetVerifyCode() {
      // 如果仍然在计时中，那么退出。否则继续
      if (this.captcha.cooldown) return;
      // 如果未填写手机号，那么退出，否则继续
      if (!this.formValidate.phone) return;

      let action;

      this.captcha.cooldown = 60;

      action = "sms";

      this.captcha.timer = setInterval(() => {
        if (this.captcha.cooldown == 0) {
          clearInterval(this.captcha.timer);
          return;
        }
        // this.captcha.cooldown = this.captcha.cooldown - 1;
        this.$set(this.captcha, "cooldown", this.captcha.cooldown - 1);
      }, 1000);

      api(`captcha/${action}`, {
        phone: this.formValidate.phone
        // mail: this.current.mail
      }).then(r => {
        this.code = atob(r.data.result);
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
</style>
