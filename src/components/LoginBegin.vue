<template>
  <div class="wrapper">
    <div
      style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>
      <el-form :model="rulesForm" :rules="rules" ref="rulesForm">

        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="rulesForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="rulesForm.password"></el-input>
        </el-form-item>


        <!-- <el-form-item prop="username">
          <el-input size="medium" style="margin: 10px 0" placeholder="用户名" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" placeholder="密码" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>-->
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small" autocomplete="off" @click="login" v-loading="loading">登录</el-button>
          <!-- <el-button type="warning" size="small"  autocomplete="off">注册</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Notification } from 'element-ui'
// import { response } from 'express';
export default {
  name: "LoginBegin",
  data() {
    return {
      loading:"",
      user: {},
      rulesForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login() {
      this.loading=true;
      this.$refs.rulesForm.validate((valid) => {
        if (valid) {  // 表单校验合法
          let thiss = this
          // 请求前清空原来的token
          localStorage.removeItem('access-admin');
          axios.post("http://localhost:8088/user/api/v1/login", thiss.rulesForm)
          .then((res) => {
            //解析数据
            console.log(res.data.code)
            if (res.data.code == "200") {
              localStorage.setItem('access-admin', JSON.stringify(res.data))
              thiss.$router.replace("/")
              this.loading=false;
            }
            if (res.data.code == "0") {
              this.$notify.error({
                title: '错误',
                message: "登录失败，请检查账号密码",
                
              });
              // thiss.$router.push("/InforError")
              this.loading=false;
            }
          })
          .catch(()=>{
            this.loading=false;
            Notification.error({
                title: '错误',
                message: "链接服务器错误,请检查服务器是否开启",
            })
          })
        } else {
          this.loading=false;
          return false;
        }
      });
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #262545, #7a8dec);
  overflow: hidden;
  width: 100%;
  margin-right: 0;
  margin-top: 0;
}
</style>