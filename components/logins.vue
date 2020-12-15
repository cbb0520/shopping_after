<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">管理系统</h2>
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {

      data() {
        return {
          form: {
            username: "",
            password: ""
          }
        };
      },
      methods: {
        onSubmit() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("account", this.form.username);
          params.append("password", this.form.password);
          this.$axios.post("staffLogin.action",params)
            /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
            .then(function (result) {


              if(result.data != ''){
                _this.$parent.$store.commit("setmsg", result.data);
                _this.$router.push({name:"indexs"});
              }else {
                _this.$message.error('登录失败，账户或密码错误');
              }


            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        }
      }
    }
</script>

<style scoped>
  .login-form {
    width: 350px;
    margin: 160px auto; /* 上下间距160px，左右自动居中*/
    background-color: rgba(255, 255, 255, 0.8); /* 透明背景色 */
    padding: 30px;
    border-radius: 20px; /* 圆角 */
  }

  /* 背景 */
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../src/assets/login.jpg");
    background-size: cover;

  }

  /* 标题 */
  .login-title {
    color: #303133;
    text-align: center;
  }
</style>
