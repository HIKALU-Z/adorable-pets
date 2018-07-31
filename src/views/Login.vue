<template>
    <div>
        <Nav></Nav>
        <section class="section is-medium">
            <Row>
                <Col :xs="{ span: 16, offset: 4 }" :lg="{ span: 16, offset: 4 }">
                <div class="box">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="Name" prop="name">
                            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                        </FormItem>
                        <FormItem label="E-mail" prop="mail">
                            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
                        </FormItem>
                        <!-- <FormItem label="City" prop="city">
                            <Select v-model="formValidate.city" placeholder="Select your city">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem> -->
                        <!-- <FormItem label="Date">
                            <Row>
                                <Col span="11">
                                <FormItem prop="date">
                                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                                </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                <FormItem prop="time">
                                    <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                                </FormItem>
                                </Col>
                            </Row>
                        </FormItem> -->
                        <!-- <FormItem label="Gender" prop="gender">
                            <RadioGroup v-model="formValidate.gender">
                                <Radio label="male">Male</Radio>
                                <Radio label="female">Female</Radio>
                            </RadioGroup>
                        </FormItem> -->
                        <!-- <FormItem label="Hobby" prop="interest">
                            <CheckboxGroup v-model="formValidate.interest">
                                <Checkbox label="Eat"></Checkbox>
                                <Checkbox label="Sleep"></Checkbox>
                                <Checkbox label="Run"></Checkbox>
                                <Checkbox label="Movie"></Checkbox>
                            </CheckboxGroup>
                        </FormItem> -->
                        <!-- <FormItem label="Desc" prop="desc">
                            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem> -->
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
export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      formValidate: {
        name: "",
        mail: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
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
