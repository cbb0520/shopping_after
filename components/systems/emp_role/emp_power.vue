<template>
  <div>
    <el-row>
      <el-col :span="12"><staff_table ref="staff_ta" @tempclick="refresh" @roleCheck="roleCheck"></staff_table></el-col>
      <el-col :span="12"><role_table ref="role_ta"></role_table></el-col>
    </el-row>
  </div>
</template>

<script>

  import Staff_table from "./staff_table"
  import Role_table from "./role_table"
    export default {
        name: "emp_power",

       methods:{
         refresh(eid){
           this.$refs.role_ta. getData(eid)
         },
         roleCheck(){
           this.$refs.role_ta.seletCheck()
           this.$refs.staff_ta.rids = this.$refs.role_ta.rids
         }
       },
         components: { //子组件
           staff_table:Staff_table,
           role_table:Role_table
      },
    }
</script>

<style scoped>

</style>
