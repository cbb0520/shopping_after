<template>
  <div >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账户">
        <el-input v-model="formInline.account" placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="formInline.address" placeholder="住址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxuan">查询</el-button>
        <el-button type="primary" @click="dialogFormadd = true">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="eid"
        label="编号"
        >
      </el-table-column>
      <el-table-column
        prop="account"
        label="账户"
        >
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        >
        <template slot-scope="scope">
         <p v-if="scope.row.password !=''">*****</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码"
        >
      </el-table-column>
      <el-table-column
        prop="etiem"
        label="生日"
       >
      </el-table-column>
      <el-table-column
        prop="address"
        label="住址"
        >
      </el-table-column>
      <el-table-column  label="操作"
                       >
        <template slot-scope="scope">
          <el-button type="primary" @click="bianji(scope.row.eid)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="staff_dele(scope.row.eid)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination

      @current-change="pagechange"

      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog title="添加"  :visible.sync="dialogFormadd">
       <staff_add ref="stadd"></staff_add>
    </el-dialog>

    <el-dialog title="编辑"  :visible.sync="dialogFormVisible">
      <staff_update ref="stupda"></staff_update>
    </el-dialog>
  </div>
</template>

<script>
  import Staff_add from "./staff_add"
  import Staff_update from "./staff_update"

    export default {
        name: "staff_index",
      data () {
        return {
          tableData:[],
          total:1,
          page:1,
          dialogFormadd:false,
          dialogFormVisible: false,
          formInline: {
            account: '',
            name: '',
            address:''
          }
        }
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        getData() { //获取数据方法

          var _this = this;

          var params = new URLSearchParams();
          params.append("account", this.formInline.account);
          params.append("name", this.formInline.name);
          params.append("address", this.formInline.address);
          params.append("page", this.page);

          this.$axios.post("/queryStaff.action",params).
          then(function(result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        chaxuan(){
          this.getData();
        },
        //删除
        staff_dele(eid){
          var _this = this;
          _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var params = new URLSearchParams();
            params.append("eid",eid);
            this.$axios.post("/deleStaff.action",params).
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
        //添加
        //编辑数据
        bianji(eid){
          this.dialogFormVisible = true
          var _this = this;
          var params = new URLSearchParams();
          params.append("eid",eid)
          this.$axios.post("/queryByeId.action",params)
            /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
            .then(function (result) {
              //异步成功，执行then里面的函数
              //result  结果  很多的响应信息
              //获取后端传递的json数据  result.data
              _this.$refs.stupda.formStaffupdate.eid = result.data.eid
              _this.$refs.stupda.formStaffupdate.account = result.data.account
              _this.$refs.stupda.formStaffupdate.password = result.data.password
              _this.$refs.stupda.formStaffupdate.name = result.data.name
              _this.$refs.stupda.formStaffupdate.sex = result.data.sex
              _this.$refs.stupda.formStaffupdate.phone = result.data.phone
              _this.$refs.stupda.formStaffupdate.etiem = result.data.etiem
              _this.$refs.stupda.formStaffupdate.address = result.data.address

            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        },
        //确认编辑
        pagechange(pageindex){  //页码变更时
          //console.log(pageindex)
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();

        }
      },
      components: { //子组件
        staff_add:Staff_add,
        staff_update:Staff_update
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
