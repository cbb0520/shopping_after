<template>
  <div>

    <el-form :model="formStaff">

      <el-form-item label="账户" :label-width="formLabelWidth">
        <el-input v-model="formStaff.account" autocomplete="off" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="formStaff.password" placeholder="请输入密码" autocomplete="off"  show-password></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="formStaff.name" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>


      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="formStaff.sex" autocomplete="off" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="号码" :label-width="formLabelWidth">
        <el-input
          type="text"
          placeholder="请输入手机号码"
          v-model="formStaff.phone"
          maxlength="11"
          autocomplete="off"
          show-word-limit
        >
       </el-input>
      </el-form-item>

      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker
          v-model="formStaff.etiem"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="住址" :label-width="formLabelWidth">
        <el-input v-model="formStaff.address" autocomplete="off" placeholder="请输入住址"></el-input>
      </el-form-item>
    </el-form>

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
          formLabelWidth: '120px'
        }
      },
    }
</script>

<style scoped>

</style>
