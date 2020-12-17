<template>
  <div>
  <el-form :model="formStaffupdate" :rules="satuprules" ref="formStaffupdate">

    <el-form-item label="账户" :label-width="formLabelWidth">
      <el-input :disabled="true" v-model="formStaffupdate.account" autocomplete="off" placeholder="请输入账户"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input v-model="formStaffupdate.password" placeholder="请输入密码" autocomplete="off"  show-password></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
      <el-input v-model="formStaffupdate.name" autocomplete="off" placeholder="请输入姓名"></el-input>
    </el-form-item>


    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
      <el-select v-model="formStaffupdate.sex" autocomplete="off" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="号码" :label-width="formLabelWidth" prop="phone">
      <el-input
        placeholder="请输入手机号码"
        v-model="formStaffupdate.phone"
        maxlength="11"
        autocomplete="off"
        show-word-limit
      >
      </el-input>
    </el-form-item>

    <el-form-item label="生日" :label-width="formLabelWidth" prop="etiem">
      <el-date-picker
        v-model="formStaffupdate.etiem"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="住址" :label-width="formLabelWidth" prop="address">
      <el-input v-model="formStaffupdate.address" autocomplete="off" placeholder="请输入住址"></el-input>
    </el-form-item>
  </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.$parent.dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="update('formStaffupdate')">编辑</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "staff_update",
      data () {
        return {
          formStaffupdate: {
            eid:'',
            account:'',
            password: '',
            name: '',
            sex: '',
            phone: '',
            etiem: '',
            address:'',
          },
          formLabelWidth: '120px',
          satuprules: {
            account: [
              { required: true, message: '请输入账户', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            sex: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ],
            phone: [
              { required: true, message: '输入正确的手机号', trigger: 'blur' },
              { min: 11, max: 11, message: '输入正确的手机号', trigger: 'blur' }
            ],
            etiem: [
              {required: true, message: '请选择日期', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请填入地址', trigger: 'blur' }
            ]
          }
        }

      },
      methods: {
        update(formName) {
          console.log(formName)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$parent.$parent.dialogFormVisible = false
              var _this = this;
              var params = new URLSearchParams();
              params.append("eid",_this.formStaffupdate.eid)
              params.append("password",this.formStaffupdate.password)
              params.append("name", this.formStaffupdate.name)
              params.append("sex", this.formStaffupdate.sex)
              params.append("phone", this.formStaffupdate.phone)
              params.append("etiem", this.formStaffupdate.etiem)
              params.append("address", this.formStaffupdate.address)
              this.$axios.post("updateStaff.action", params)
                /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
                .then(function (result) {
                  //异步成功，执行then里面的函数
                  //result  结果  很多的响应信息
                  //获取后端传递的json数据  result.data
                  _this.$message({
                    message: result.data,
                    type: 'success'
                  });
                  _this.$parent.$parent.getData();
                })
                .catch(function (error) {
                  //异步如果出现错误  触发catch里面的函数
                  alert(error);
                });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      },
    }
</script>

<style scoped>
  .dialog-footer {
    text-align: right;
  }
</style>
