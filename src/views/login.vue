import Vue from 'vue'
<template>
  <!--login-->
  <div class="loginvue">
    <!--title-->
    <div class="loginTitle" style="margin-left:140px;margin-bottom:15px">考研信息交流后台管理模块</div>
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      :rules="rules"
      label-position="right"
      show-message
    >
      <el-form-item prop="name">
        <span class="fontC">账号</span>
        <el-input v-model="form.name" prefix-icon="el-icon-user" style="width:70%" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" >
        <span class="fontC">密码</span>
        <el-input
          type="password"
          v-model="form.password"
          prefix-icon="el-icon-lock"
          style="width:70%"
          @keyup.enter.native="login('form')"
          clearable
        ></el-input>
        <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item style="margin-left: 50px">
        <el-button type="primary" @click="login('form')" round>登录</el-button>
        <el-button type="primary" @click="dialogFormVisible = true" round>注册</el-button>
        <el-button @click="restart('formReg')" round>重置</el-button>
      </el-form-item>
    </el-form>
    <!--<router-link to='/a1'><el-button type='primary'>跳转a1</el-button></router-link>-->
    <!--register-->
    <el-dialog title="注册" :visible.sync="dialogFormVisible">
      <el-form :model="formReg" ref="formReg">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="formReg.name"
            autocomplete="off"
            prefix-icon="el-icon-user"
            style="width:70%"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="formReg.password"
            autocomplete="off"
            style="width:70%"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" round>取 消</el-button>
        <el-button type="primary" @click="register('formReg')" round>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loginMana } from "../api/api";
import { registerMana } from "../api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        checked: true
      },
      formReg: {
        name: "",
        password: ""
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 1, max: 11, message: "长度在3到11个字符之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 11, message: "长度在4到11个字符之间", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    login(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("formName-->" + formName);
          console.log("valid-->" + valid);
          var json = this.form;
          console.log("json-->" + this.form);
          var loginParams = {
            name: this.form.name,
            password: this.form.password
          };
          console.log("usrename-->" + json.name);
          console.log("password-->" + json.password);
          loginMana(loginParams).then(
            result => {
              console.log("result-->" + result);
              var json = JSON.stringify(result);
              var code = result.returnCode.code;
              var desc = result.returnCode.desc;
              var body = result.body;
              console.log("json-->" + typeof json);
              console.log("json-->" + json);
              console.log("json.code-->" + result.returnCode.code);
              console.log("json.desc-->" + result.returnCode.desc);
              console.log("json.body-->" + result.body);
              if (code !== 1004) {
                var msg = "登陆成功，欢迎管理员:  " + body.name;
                this.$message({
                  message: msg,
                  type: "success"
                }); 
                this.$router.push({name:"homeLink",params:{name:body.name,manaPemission:body.manaPemission}});
              } else if (desc === "errorPwd") {
                this.$message.error("密码错误，请重新登陆");
                this.$refs.form.resetFields();
                this.$router.push("/login");
              } else if (desc === "noUser") {
                this.$message.error("用户不存在，请注册");
                this.$refs.form.resetFields();
                this.$router.push("/login");
              } else if (desc === "noData") {
                var msg = "请填写您的信息";
                this.$message({
                  message: msg,
                  type: "warning"
                });
                this.$refs.form.resetFields();
                this.$router.push("/login");
              }
            },
            error => {
              this.$message.error("服务开小差了，请稍后再试~");
              this.$refs.form.resetFields();
            }
          );
        } else {
          var msg = "请填写您的信息";
          this.$message({
            message: msg,
            type: "warning"
          });
          this.$refs.form.resetFields();
          this.$router.push("/login");
        }
      });
    },
    register(formReg) {
      this.$refs.formReg.validate(valid => {
        if (valid) {
          console.log("formReg-->" + formReg);
          var json = this.formReg;
          console.log("json-->" + this.formReg);
          var registerParams = {
            name: this.formReg.name,
            password: this.formReg.password
          };
          console.log("usrename-->" + json.name);
          console.log("password-->" + json.password);
          registerMana(registerParams).then(
            result => {
              console.log("result-->" + result);
              var json = JSON.stringify(result);
              var code = result.returnCode.code;
              var desc = result.returnCode.desc;
              var body = result.body;
              console.log("json-->" + typeof json);
              console.log("json-->" + json);
              console.log("json.code-->" + result.returnCode.code);
              console.log("json.desc-->" + result.returnCode.desc);
              console.log("json.body-->" + result.body);
              if (code === 1000) {
                var msg = "注册成功！若审核通过您将可以登录后台 ";
                this.$message({
                  message: msg,
                  type: "success"
                });
                this.$refs.formReg.resetFields();
                this.$router.push("/home");
              } else if (desc === "repeat") {
                this.$message.error("管理员已存在，请重新输入");
                this.$refs.formReg.resetFields();
                this.$router.push("/login");
              } else {
                var msg = "注册失败，请稍后再试";
                this.$message({
                  message: msg,
                  type: "warning"
                });
                this.$refs.formReg.resetFields();
                this.$router.push("/login");
              }
            },
            error => {
              this.$message.error("网络开小差了，请稍后再试~");
              this.$refs.formReg.resetFields();
              this.$router.push("/login");
            }
          );
        } else {
          var msg = "请填写您的信息";
          this.$message({
            message: msg,
            type: "warning"
          });
          this.$refs.formReg.resetFields();
          this.$router.push("/login");
        }
      });
    },
    restart(form) {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style>
.loginvue {
  width: 500px;
  margin: 120px auto;
  padding: 50px 55px 15px 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: lightgoldenrodyellow;
  border-radius: 2px;
  opacity: 0.8;
  font-family: Hiragino Sans GB;
}
span.fontC {
  color: #606266;
  font-family: Hiragino Sans GB;
}
div.loginTitle {
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
}
</style>
