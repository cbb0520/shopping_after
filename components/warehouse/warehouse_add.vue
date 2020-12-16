<template>
  <div style="padding-right: 20px;text-align: center">
    <el-form :model="formWarehouse" label-width="80px">

      <el-form-item label="仓库名">
        <el-input v-model="formWarehouse.wname"></el-input>
      </el-form-item>

      <el-form-item label="仓库类型">
        <el-select v-model="formWarehouse.fid"  placeholder="请选择仓库类型" style="width: 100%;">
          <el-option v-for="c in classifyData" :label="c.fname" :value="c.fid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="仓库容量">
        <el-input-number v-model="formWarehouse.liang" :min=1 style="float: left"></el-input-number>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    name: "warehouse_add",
    data() {
      return {
        formWarehouse: {
          wname: '',
          fid: '',
          liang: ''
        },
        classifyData:[]
      }
    },
    methods:{
      getClassidy(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("rows", 100);
        this.$axios.post("/queryALlClassify.action", params).then(function (result) {
          _this.classifyData = result.data.rows;
        }).catch(function (error) {
          alert(error)
        });
      }
    },
    created() {
      this.getClassidy();
    }
  }
</script>

<style scoped>

</style>
