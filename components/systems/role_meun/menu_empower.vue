<template>
  <div>
    <el-row>
      <el-col :span="11"><mrole_table></mrole_table></el-col>
      <el-col :span="2"><el-divider direction="vertical"></el-divider></el-col>
      <el-col :span="11"><menu_tree ref="menutrr"></menu_tree></el-col>
    </el-row>
  </div>
</template>

<script>
  import Mrole_table from "./mrole_table"
  import Menu_tree from "./menu_tree"


    export default {
        name: "menu_empower",
      data () {
        return {
         mids:''
        }
      },
      methods:{
        role_refresh(rid){
          this.$refs.menutrr.menurid(rid)
        },
        menuCheck(){
          this.$refs.menutrr.seletCheck()
          this.mids = this.$refs.menutrr.mids
        }
      },
      components: { //子组件
        mrole_table:Mrole_table,
        menu_tree:Menu_tree
      },
    }
</script>

<style scoped>
</style>
