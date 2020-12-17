<template>
  <div>

    <el-form :model="formStaff" :rules="rules" ref="formStaff">

      <el-form-item label="账户" :label-width="formLabelWidth" prop="account">
        <el-input v-model="formStaff.account" autocomplete="off" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="formStaff.password" placeholder="请输入密码" autocomplete="off"  show-password></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formStaff.name" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>


      <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
        <el-select v-model="formStaff.sex" autocomplete="off" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="号码" :label-width="formLabelWidth" prop="phone">
        <el-input
          placeholder="请输入手机号码"
          v-model="formStaff.phone"
          maxlength="11"
          autocomplete="off"
          show-word-limit
        >
       </el-input>
      </el-form-item>

      <el-form-item label="生日" :label-width="formLabelWidth" prop="etiem">
        <el-date-picker
          v-model="formStaff.etiem"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="住址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="formStaff.address" autocomplete="off" placeholder="请输入住址"></el-input>
      </el-form-item>
    </el-form>



    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.$parent.dialogFormadd = false">取 消</el-button>
      <el-button type="primary" @click="staffadd('formStaff')">添加</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "staff_add",
      data () {
        return {
          formStaff: {
            account:'',
            password: '',
            name: '',
            sex: '',
            phone: '',
            etiem: '',
            address:'',
          },
          formLabelWidth: '120px',
          rules: {
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
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { min: 11, max: 11, message: '输入正确的手机号', trigger: 'blur' },
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
        staffadd(formName) {
          console.log(formName)
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();
              params.append("account",this.formStaff.account)
              params.append("password",this.formStaff.password)
              params.append("name",this.formStaff.name)
              params.append("sex",this.formStaff.sex)
              params.append("phone",this.formStaff.phone)
              params.append("etiem",this.formStaff.etiem)
              params.append("address",this.formStaff.address)
              this.$axios.post("/addStaff.action",params)
                /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
                .then(function (result) {

                  _this.$parent.$parent.dialogFormadd = false

                  _this.$message({
                    showClose: true,
                    message: result.data,
                    type: 'success'
                  });
                  _this.$parent.$parent.getData();
                }).
              catch(function(error) {
                alert(error)
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      }
    }
</script>

<style scoped>
  .dialog-footer {
    text-align: right;
  }
</style>
