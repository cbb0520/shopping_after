<template>
  <div >
    <el-form :inline="true" :model="userformInline" class="demo-form-inline">
      <el-form-item label="账户">
        <el-input v-model="userformInline.uaccount" placeholder="账户"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userformInline.uname" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userformInline.phone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userchaxuan">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="usertableData"
      style="width: 100%"
      :row-class-name="usertableRowClassName">
      <el-table-column
        prop="uid"
        label="编号"
        >
      </el-table-column>
      <el-table-column
        prop=""
        label="头像"
      >
        <template slot-scope="scope">
        <el-image :src="imgs+scope.row.uimg" style="width: 70px;height: 70px">
        </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="uaccount"
        label="账户"
        >
      </el-table-column>

      <el-table-column
        prop="uname"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="住址"
        >
      </el-table-column>
    </el-table>
    <el-pagination @current-change="userpagechange" layout="prev, pager, next" :total="total" :page-size="3">
    </el-pagination>

  </div>
</template>

<script>
    export default {
        name: "user_index",
      data () {
        return {
          usertableData:[],
          total:1,
          page:1,
          imgs:'src/assets/',
          userformInline: {
            uaccount: '',
            uname: '',
            phone:''
          }
        }
      },
      methods: {
        usertableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        },
        getData() { //获取数据方法
          var _this = this;
          this.$axios.get("/queryAlluserCount.action",{params:{uaccount:_this.userformInline.uaccount,uname:_this.userformInline.uname,phone:_this.userformInline.phone,page:_this.page}}).
          then(function(result) {
            _this.usertableData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        userchaxuan(){
          this.getData();
        },
        userpagechange(pageindex){  //页码变更时
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();

        }
      },
      created(){
        this.getData();
      }
    }
</script>

<style scoped>

</style>
