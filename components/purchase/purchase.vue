<template>
    <div>
      <el-form :inline="true" class="demo-form-inline" style="float: left">
        <el-form-item>
          <el-input placeholder="商品名" v-model="sel_pname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="商品类型" v-model="sel_classifyid">
            <el-option label="全部" value="0"></el-option>
            <el-option v-for="c in classifyData" :label="c.fname" :value="c.fid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="purchase_sel">查询</el-button>
          <el-button type="primary" @click="caigou">采购</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        style="width: 100%"
        ref="caigouTable">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column prop="pname" label="商品名">
        </el-table-column>
        <el-table-column prop="classify.fname" label="商品类型">
        </el-table-column>
        <el-table-column prop="pimgs" label="图片">
          <template slot-scope="scope">
            <el-image :src="'./src/assets/'+scope.row.pimgs" style="width: 100px;height: 80px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" sortable>
        </el-table-column>
        <el-table-column label="采购数量">
          <template slot-scope="scope">
          <el-input-number size="mini" @change="handleChange(scope.row.pid)" v-model="scope.row.liang" :min=1  style="width: 90px;"></el-input-number>
          </template>
        </el-table-column>

        <el-table-column label="仓库">
          <template slot-scope="scope">
          <el-select  @change="getchange(scope.row.udele)" placeholder="选择仓库" v-model="scope.row.udele">
            <el-option label="选择仓库" value="0"></el-option>
            <el-option v-for="cang in cangkuData" :label="cang.wname+'/'+cang.classify.fname" :value="cang.wid"></el-option>
          </el-select>
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
    </div>
</template>

<script>
    export default {
        name: "purchase",
      data(){
        return {
          tableData: [],
          classifyData: [],
          cangkuData:[],
          total: 1,
          page: 1,
          dialogFormVisible: false,
          sel_pname: '',
          sel_classifyid: '0',
          cangid: '0',
        }
      },
      methods:{
        caigou(){
          var checks = this.$refs.caigouTable.selection
          var stu_checks = checks.some(function(item){
            return item.udele=='0';
          });
          if(stu_checks) {
            this.$message.error('警告，请选择好仓库！');
          }else if(checks==""){
            this.$message.error('警告，请勾选要采购的商品！');
          }else {
            for (var i = 0;i<checks.length;i++) {
              var params = new URLSearchParams();
              params.append("pid", checks[i].pid);
              params.append("pname", checks[i].pname);
              params.append("pimgs", checks[i].pimgs);
              params.append("liang", checks[i].liang);
              params.append("price", checks[i].price);
              params.append("udele", checks[i].udele);
              params.append("fid", checks[i].classify.fid);
              this.$axios.post("/addpurchase.action", params).then(function (result) {
              }).catch(function (error) {
                alert(error)
              });
              this.$message({
                message: '恭喜你，采购成功',
                type: 'success'
              });
            }

          }
        },
        handleChange(pid) {
          var _this = this;
          var sum = 0
          var stu_tableData = this.tableData.filter(function(item){
            return item.pid==pid;
          });
          if(stu_tableData[0].udele != '0'){
            this.tableData.forEach(function(item){
              if(item.udele==stu_tableData[0].udele) {
                sum = sum+item.liang
              }//值对象，引用对象
            });
            var stu_cangku = this.cangkuData.filter(function(item){
              return item.wid==stu_tableData[0].udele;
            });

            var params = new URLSearchParams();
            params.append("wid", stu_tableData[0].udele);
            this.$axios.post("/getWarehouseAllCount.action", params).then(function (result) {
                if ((stu_cangku[0].liang - result.data - sum) < 0) {
                  var summ =  (result.data + sum)-stu_cangku[0].liang
                  _this.$message.error('警告，该仓库库存放不下了请尝试其他仓库！超出'+summ+"件");
                }

            }).catch(function (error) {
              alert(error)
            });
          }
        },
        getchange(udele){
          var _this = this;
          var sum = 0
          var stu_cangku = this.cangkuData.filter(function(item){
            return item.wid==udele;
          });
          this.tableData.forEach(function(item){
            if(item.udele==udele) {
              sum = sum+item.liang
            }//值对象，引用对象
          });
          var params = new URLSearchParams();
          params.append("wid", udele);
          this.$axios.post("/getWarehouseAllCount.action", params).then(function (result) {
            if(stu_cangku != '') {
              if ((stu_cangku[0].liang - result.data) <= 0) {
                _this.$message.error('警告，该仓库库存已满请尝试其他仓库！');
              }
              if ((stu_cangku[0].liang - result.data - sum) < 0) {
                var summ = (result.data + sum)-stu_cangku[0].liang
                _this.$message.error('警告，该仓库库存已满请尝试其他仓库！超出'+summ+"件");
              }
            }
          }).catch(function (error) {
            alert(error)
          });

        },
        getDataClassify() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("rows", 100);
          this.$axios.post("/queryALlClassify.action", params).then(function (result) {
            _this.classifyData = result.data.rows;
          }).catch(function (error) {
            alert(error)
          });
        },
        getDataCangku() {
          var _this = this;
          var params = new URLSearchParams();
          this.$axios.post("/queryWarehouse.action", params).then(function (result) {
            _this.cangkuData = result.data;
          }).catch(function (error) {
            alert(error)
          });
        },
        getData() { //获取数据方法
          var _this = this;
          var params = new URLSearchParams();
          params.append("qname", _this.sel_pname);
          params.append("fid", _this.sel_classifyid);
          params.append("page", _this.page);
          this.$axios.post("/queryPurchase.action", params).then(function (result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).catch(function (error) {
            alert(error)
          });
        },
        pagechange(pageindex) {  //页码变更时
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();
        },
        purchase_sel() {
          this.getData();
        }
      },
      created() {
        this.getData();
        this.getDataClassify();
        this.getDataCangku();
      }
    }
</script>

<style scoped>
  .el-pagination{

    text-align: center;
  }
</style>
