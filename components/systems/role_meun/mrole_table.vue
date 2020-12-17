<template>
  <div>
    以下是你当前所拥有的角色
    <el-button type="primary" @click="menushow">授权</el-button>
  <el-table
    :data="roelDatas"
    @cell-click="danxuan"
    highlight-current-row
    stripe
    style="width: 100%"
  >
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
  </div>
</template>

<script>
    export default {
        name: "mrole_table",
      data () {
        return {
          roelDatas:[],
          rid:''
        }
      },
      methods:{
        getData() { //获取数据方法

          var _this = this;

          var params = new URLSearchParams();
          params.append("eid",this.$store.getters.getmsg.eid)
          this.$axios.post("/staffrole.action",params).
          then(function(result) {
            _this.roelDatas = result.data;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        danxuan(row){
          this.rid = row.rid
          this.$parent.$parent.$parent.role_refresh(row.rid);
        },
        menushow(){
          this.$parent.$parent.$parent.menuCheck()
          var _this = this;
            var params = new URLSearchParams();
            params.append("rid", this.rid)
            params.append("loginedi", this.$store.getters.getmsg.eid)
            params.append("mids", this.$parent.$parent.$parent.mids)
            this.$axios.post("addroleMenu.action", params)
              .then(function (result) {
                _this.$message({
                  message: result.data,
                  type: 'success'
                });
              })
              .catch(function (error) {
                //异步如果出现错误  触发catch里面的函数
                alert(error);
              });

        },
      },
      created(){
        this.getData();
      }
    }
</script>

<style scoped>

</style>
