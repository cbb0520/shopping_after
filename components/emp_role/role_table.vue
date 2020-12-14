<template>
  <el-table
    ref="multipleTable"
    :data="roel_Data"
    style="width: 100%"
  >
    <el-table-column
      type="selection"
     >
    </el-table-column>
    <el-table-column
      prop="rid"
      label="编号"
    >
    </el-table-column>
    <el-table-column
      prop="rname"
      label="角色名"
    >
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "role_table",
      data () {
        return {
          roel_Data:[],
          rids:''
          }
      },
      methods:{
        getData(eid) { //获取数据方法

          var dd = [this.roel_Data[1], this.roel_Data[2]];
          var _this = this;
          var params = new URLSearchParams();
          if(eid ==undefined){
            params.append("eid",this.$store.getters.getmsg.eid)

          }else {
            params.append("eid",eid)
          }
          this.$axios.post("/staffrole.action",params).
          then(function(result) {
            if(_this.roel_Data==''){
              _this.roel_Data = result.data;
            }else {
              _this.$refs.multipleTable.clearSelection();
              _this.roel_Data.map(function(items,index,arr){
               var DD = result.data.some(function(item){
                  return item.rid==items.rid;
                });
               if(DD){
                 _this.$refs.multipleTable.toggleRowSelection(_this.roel_Data[index]);
               }

              });
        }

      }).
      catch(function(error) {
        alert(error)
      });

    },
        seletCheck(){
          var rids ="";
         var checks = this.$refs.multipleTable.selection
          for (var i =0;i<checks.length;i++){
            rids+= checks[i].rid+",";
          }
          this.rids = rids
        }
  },
  created(){
    this.getData();
  }
}
</script>

<style scoped>

</style>
