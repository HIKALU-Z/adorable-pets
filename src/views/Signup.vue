<template>
  <div>
    <Nav></Nav>
    <section class="section is-medium">
      <Row>
        <Col :xs="{ span: 16, offset: 4 }" :lg="{ span: 16, offset: 4 }">
        <div class="box">
          <p>当前正在进行第 {{ currentStep + 1 }} 步</p>
          <Steps :current="currentStep">
            <Step title="验证手机"></Step>
            <Step title="填写信息"></Step>
            <Step title="注册成功"></Step>
          </Steps>
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
              <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="mail">
              <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
          <Button style="margin-top:10px;" type="primary" @click="next">Next step</Button>
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
export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      currentStep: 0
    };
  },
  methods: {
    next() {
      if (this.currentStep == 2) {
        this.currentStep = 0;
      } else {
        this.currentStep += 1;
      }
    }
  }
};
</script>

<style scoped>
</style>
