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
        <el-table-column prop="did" label="did">
        </el-table-column>
        <el-table-column prop="user.uname" label="用户名"></el-table-column>
        <el-table-column prop="merchants.mname" label="商户名"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="buytime" label="购买时间"></el-table-column>
          <el-table-column prop="fulfiltime" label="付款时间">
            <template scope="scope">
              <p v-if="scope.row.fulfiltime==null">交易进行中</p>
              <p v-if="scope.row.fulfiltime!=null">{{scope.row.fulfiltime}}</p>
            </template>
          </el-table-column>
        <el-table-column prop="hstate" label="状态">
          <template scope="scope">
            <p v-if="scope.row.mstate!='0'">已发货</p>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="备注">
          <template scope="scope">
            <p v-if="scope.row.text==null">无</p>
            <p v-if="scope.row.text!=null">{{scope.row.text}}</p>
          </template>
        </el-table-column>
        <el-table-column label="查看详情">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-message" circle @click="particulars(scope.row.did)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
      </el-pagination>
      <el-dialog title="订单详情" :visible.sync="dialogVisible" width="50%">
        <goods ref="del_goods01"></goods>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
      </el-dialog>
    </div>
</template>

<script>
  import Goods from "./goods";
    export default {
        data() {
          return {
            tableData: [],
            total: 1,
            page: 1,
            name: "",
            dialogVisible:false,
          }
        },methods:{
        getData() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("user.uname", this.name);
          _this.$axios.post("/queryDeliverstate.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        particulars(val){
          var _this = this;
          var params = new URLSearchParams();
          params.append("did", val);
          _this.$axios.post("/queryAllDel_goods.action", params).then(function (result) {
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
      },created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
      },
      components: {
        goods:Goods
      }
    }
</script>

<style scoped>

</style>
