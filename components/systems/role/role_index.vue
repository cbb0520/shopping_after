<template>
  <div>
  <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="角色名">
      <el-input v-model="rname" placeholder="请输入角色名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="roel_sele">查询</el-button>
      <el-button type="primary" @click="dialogFormadd = true">添加</el-button>
    </el-form-item>
  </el-form>

  <el-table
    :data="roelData"
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
    <el-table-column  label="操作"
    >
      <template slot-scope="scope">
        <el-button type="primary" @click="bianji(scope.row.rid)" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" @click="roel_dele(scope.row.rid)" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>

  </el-table>

    <el-pagination

      @current-change="pagechange"

      :page-sizes="[4, 8, 12, 16]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="添加"  :visible.sync="dialogFormadd">
      <el-input v-model="add_rname" autocomplete="off" placeholder="请输入新角色"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormadd = false">取 消</el-button>
        <el-button type="primary" @click="roleadd">添加</el-button>
      </div>
    </el-dialog>



    <el-dialog title="编辑"  :visible.sync="dialogFormVisible">
      <el-input v-model="roelform.rname" autocomplete="off" placeholder="请输入新角色"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleupdate">编辑</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
    export default {
        name: "role_index",
      data () {
        return {
          roelData:[],
          total:1,
          page:1,
          dialogFormadd:false,
          dialogFormVisible: false,
          rname:'',
          add_rname:'',
          roelform:{
            rid:'',
            rname:''
          }
        }
      },
      methods:{
        getData() { //获取数据方法

          var _this = this;

          var params = new URLSearchParams();
          params.append("rname", this.rname);
          params.append("page", this.page);

          this.$axios.post("/queryRoLe.action",params).
          then(function(result) {
            _this.roelData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        roel_sele(){
          this.getData();
        },
        roel_dele(rid){
          var _this = this;
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = new URLSearchParams();
            params.append("rid",rid);
            this.$axios.post("/deleRoLe.action",params).
            then(function(result) {
              _this.$message({
                type: 'success',
                message: result.data.msg
              });
              _this.getData();
            }).
            catch(function(error) {
              alert(error)
            });

          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        roleadd(){
          var _this = this;
          if(this.add_rname==''){
            this.$message.error('错了哦，请输入角色');
            return false;
          }
          var params = new URLSearchParams();
          params.append("rname",this.add_rname)
          this.$axios.post("/addRoLe.action",params)
            /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
            .then(function (result) {

              _this.dialogFormadd = false

              _this.$message({
                showClose: true,
                message: result.data,
                type: 'success'
              });
              _this.getData();
            }).
          catch(function(error) {
            alert(error)
          });
        },

        bianji(rid){
          this.dialogFormVisible = true
          var _this = this;
          _this.roelform.rid=rid;
          var params = new URLSearchParams();
          params.append("rid",rid)
          this.$axios.post("/roleByrId.action",params)
            /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
            .then(function (result) {
              //异步成功，执行then里面的函数
              //result  结果  很多的响应信息
              //获取后端传递的json数据  result.data
              _this.roelform.rname = result.data.rname

            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        },
        roleupdate(){
          if(this.roelform.rname==''){
            this.$message.error('错了哦，请输入角色');
            return false;
          }
          this.dialogFormVisible = false
          var _this = this;
          var params = new URLSearchParams();
          params.append("rid",this.roelform.rid)
          params.append("rname",this.roelform.rname)
          this.$axios.post("updateRoLe.action", params)
            /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
            .then(function (result) {
              //异步成功，执行then里面的函数
              //result  结果  很多的响应信息
              //获取后端传递的json数据  result.data
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-pagination{

    text-align: center;
  }
</style>
