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
      </el-table>
      <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
          return {
            tableData: [],
            total: 1,
            page: 1,
            name: ""
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
      }
    }
</script>

<style scoped>

</style>
