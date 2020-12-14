<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="账户">
        <el-input v-model="account" placeholder="请输入账户"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="staff_sele">查询</el-button>
        <el-button type="primary" @click="shourole">授权</el-button>
      </el-form-item>
    </el-form>

  <el-table
    :data="staffData"
    highlight-current-row
    @cell-click="dd"
    @select="dd"
    style="width: 100%">
    <el-table-column
      prop="eid"
      label="编号">
    </el-table-column>
    <el-table-column
      prop="account"
      label="账户名">
    </el-table-column>
  </el-table>

    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "staff_table",
      data () {
        return {
          staffData:[],
          total:1,
          page:1,
          account:'',
          eid:'',
          rids:''
        }
      },
      methods: {
        getData() { //获取数据方法

          var _this = this;

          var params = new URLSearchParams();
          params.append("account", this.account);
          params.append("page", this.page);

          this.$axios.post("/queryStaff.action",params).
          then(function(result) {
            _this.staffData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        staff_sele(){
          this.getData();
        },
        pagechange(pageindex){  //页码变更时
          //console.log(pageindex)
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();

        },
        dd(row){
          this.eid = row.eid
          this.$emit("tempclick",row.eid);
        },
        shourole() {
          this.$emit("roleCheck");
          var _this = this;
          if (this.$store.getters.getmsg.eid == this.eid) {
            this.$message.error('错了哦，你不能给自己授权');
          } else {
            var params = new URLSearchParams();
            params.append("eid", this.eid)
            params.append("loginedi", this.$store.getters.getmsg.eid)
            params.append("rids", this.rids)
            this.$axios.post("addEmprole.action", params)
              .then(function (result) {
                _this.$message({
                  message: result.data,
                  type: 'success'
                });
                _this.getData();
              })
              .catch(function (error) {
                //异步如果出现错误  触发catch里面的函数
                alert(error);
              });
          }
        }
      },
      created(){
        this.getData();
      }

    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
