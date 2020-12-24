<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入商户姓名" v-model="name">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="mid" label="商户id"></el-table-column>
        <el-table-column prop="sname" label="姓名"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="mtype" label="门店类型"></el-table-column>
        <el-table-column prop="mddress" label="商户地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm title="你确认同意吗？" @confirm="appraisalmerchants(scope.row.mid)">
              <el-button type="success" icon="el-icon-edit" slot="reference" circle></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
      </el-pagination>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData:[],
          total: 1,
          page: 1,
          name: ""
        }
      },
      methods:{
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("sname", this.name);
          _this.$axios.post("/queryCountshengpiMerchants.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        appraisalmerchants(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("mid", val);
          _this.$axios.post("/updatestate.action", params).
          then(function(result) {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
            //刷新数据
            _this.getData();
          }).
          catch(function() {
            _this.$message({
              message: '审批失败',
              type: 'success'
            });
          });
        },
        pagechange(pageindex){  //页码变更时
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();
        },
        search:function () {
          this.getData();
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
      }
    }
</script>

<style scoped>

</style>
