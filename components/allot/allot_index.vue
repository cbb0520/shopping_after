<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入用户名" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="did" label="did"></el-table-column>
      <el-table-column prop="user.uname" label="用户名"></el-table-column>
      <el-table-column prop="merchants.mname" label="商户名"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="buytime" label="购买时间"></el-table-column>
      <el-table-column prop="mstate" label="状态">
        <template scope="scope">
          <p v-if="scope.row.hstate=='0'">未发货</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-message" circle @click="particulars(scope.row.did)"></el-button>
          <el-popconfirm title="你确认发货嘛？" @confirm="delivery(scope.row.did)">
            <el-button type="success" icon="el-icon-check" slot="reference" circle></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="50%">
      <checkanorder ref="del_goods01"></checkanorder>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import Checkanorder from "./checkanorder";
    export default {
      data() {
        return {
          tableData:[],
          dialogVisible:false,
          total: 1,
          page: 1,
          name: ""
        }
      },methods: {
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          _this.$axios.post("/queryCountDeliver.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        delivery(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("did",val);
          params.append("did",this.tableData.merchants);
          _this.$axios.post("/updateDeliverState.action", params)
            .then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: 'success'
            });
              _this.getData();
          }).catch(function (error) {
            _this.$message({
              message: '发货失败',
              type: 'success'
            });
          });
        },
        particulars(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("did", val);
          _this.$axios.post("/queryAllDel_goods.action", params).then(function (result) {
            console.log(result.data)
          _this.$refs.del_goods01.del_goods=result.data;
          }).catch(function (error) {
            alert(error)
          });
          this.dialogVisible=true;
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
      },
      components: {
        checkanorder:Checkanorder
      }
    }
</script>

<style scoped>

</style>
