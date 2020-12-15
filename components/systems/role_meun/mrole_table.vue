<template>
  <div>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="角色名">
      <el-input v-model="r_rname" placeholder="请输入角色名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="rolesele">查询</el-button>
      <el-button type="primary" @click="menushow">授权</el-button>
    </el-form-item>
  </el-form>

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
    <el-pagination

      @current-change="pagechange"

      :page-sizes="[4, 8, 12, 16]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "mrole_table",
      data () {
        return {
          roelDatas:[],
          total:1,
          page:1,
          r_rname:'',
          rid:''
        }
      },
      methods:{
        getData() { //获取数据方法

          var _this = this;

          var params = new URLSearchParams();
          params.append("rname", this.r_rname);
          params.append("page", this.page);

          this.$axios.post("/queryRoLe.action",params).
          then(function(result) {
            _this.roelDatas = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        rolesele(){
          this.getData();
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
        pagechange(pageindex){  //页码变更时
          //console.log(pageindex)
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();

        },
      },
      created(){
        this.getData();
      }
    }
</script>

<style scoped>

</style>
