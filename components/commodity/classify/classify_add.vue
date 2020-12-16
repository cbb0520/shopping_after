<template>
  <div style="padding-right: 20px;text-align: center">
    <el-form :model="formclassify" label-width="80px">

      <el-form-item label="类型名称">
        <el-input v-model="formclassify.fname"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    name: "classify_add",
    data() {
      return {
        formclassify: {
          fid: '',
          fname: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
