<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item style="float: left">
        <el-input placeholder="仓库名" v-model="sel_wname"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-button type="primary" @click="warehouse_sel">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="warehouse_add">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="wid" label="id">
      </el-table-column>
      <el-table-column prop="wname" label="商品名">
        <template slot-scope="scopes">
          <el-popover trigger="hover" placement="top">
            <el-table
              :data="scopes.row.goods"
              stripe
              style="width: 100%">
              <el-table-column
                prop="gname"
                label="商品名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="gimgs"
                label="图片"
                width="150">
                <template slot-scope="scope">
                  <el-image :src="'./src/assets/'+scope.row.gimgs" style="width: 100px;height: 60px"></el-image>
                </template>
              </el-table-column>

              <el-table-column
                prop="count"
                label="数量"
                width="80">
              </el-table-column>

              <el-table-column label="仓库"  width="180">>
                <template slot-scope="scope">
                  <el-select   placeholder="选择仓库" v-model="scope.row.wid">
                    <el-option label="选择仓库" value="0"></el-option>
                    <el-option v-for="cang in cangkuDatas" :label="cang.wname+'/'+cang.classify.fname" :value="cang.wid"></el-option>
                  </el-select>
                </template>
              </el-table-column>

              <el-table-column label="操作"  width="100">>
                <template slot-scope="scope">
                  <el-button type="success"  @click="zhuanyi(scope.row.gid,scope.row.wid,scopes.row.wid,scope.row.count)"  round>转移</el-button>
                </template>
              </el-table-column>
            </el-table>


            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scopes.row.wname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="classify.fname" label="仓库类型">
      </el-table-column>
      <el-table-column prop="liang" label="仓库容量">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scopes">
          <el-button type="primary" @click="warehouse_bianji(scopes.row.wid)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="warehouse_del(scopes.row.wid)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>

    <!--编辑模态框-->
    <el-dialog title="编辑仓库" :visible.sync="dialogFormVisible">
      <warehouse_upt ref="warehouseupt"></warehouse_upt>
      <div slot="footer" class="dialog-footer" style="padding: 0px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="warehouse_bianjiOk">编辑</el-button>
      </div>
    </el-dialog>

    <!--添加模态框-->
    <el-dialog title="添加仓库" :visible.sync="dialogFormAdd">
      <warehouse_add ref="warehouseadd"></warehouse_add>
      <div slot="footer" class="dialog-footer" style="padding: 0px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="warehouse_addOk">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import warehouse_add from "./warehouse_add";
  import warehouse_upt from "./warehouse_upt";

  export default {
    name: "warehouse",
    data() {
      return {
        tableData: [],
        sel_wname: '',
        cangkuDatas:[],
        total: 1,
        page: 1,
        dialogFormVisible: false,
        dialogFormAdd: false,
        oldwname: '',
        oldfid: ''
      }
    },
    methods: {
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("wname", _this.sel_wname);
        params.append("page", _this.page);
        this.$axios.post("/queryCountWarehouse.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        });
      },
      getDataCangku() {
        var _this = this;
        var params = new URLSearchParams();
        this.$axios.post("/queryWarehouse.action", params).then(function (result) {
          _this.cangkuDatas = result.data;
        }).catch(function (error) {
          alert(error)
        });
      },
      zhuanyi(gid,noewid,olewid,count){
        if(noewid==olewid){
          this.$message.error('警告，该商品已存在该仓库 ！');
        }else {
          var _this = this;
          var params = new URLSearchParams();
          params.append("gid", gid);
          params.append("lodwid", olewid);
          params.append("noewid", noewid);
          params.append("count", count);
          this.$axios.post("/zhuanGoods.action", params).then(function (result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
          }).catch(function (error) {
            alert(error)
          });
        }
      },
      warehouse_bianji(wid) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("wid", wid);
        this.$axios.post("/queryWarehouseById.action", params).then(function (result) {
          _this.$refs.warehouseupt.formWarehouse.wid = result.data.wid;
          _this.$refs.warehouseupt.formWarehouse.wname = result.data.wname;
          _this.$refs.warehouseupt.formWarehouse.classifyId = result.data.classify.fid;
          _this.$refs.warehouseupt.formWarehouse.liang = result.data.liang;

          _this.oldwname = result.data.wname;
          _this.oldfid = result.data.classify.fid;
        }).catch(function (error) {
          alert(error)
        });
        this.dialogFormVisible = true
      },
      warehouse_bianjiOk() {
        let wid =  this.$refs.warehouseupt.formWarehouse.wid;
        let wname =  this.$refs.warehouseupt.formWarehouse.wname;
        let fid =  this.$refs.warehouseupt.formWarehouse.classifyId;
        let liang =  this.$refs.warehouseupt.formWarehouse.liang;

        //判断名字非空
        if(wname == "" || wname == null || wname == undefined){
          this.$message({
            message: '仓库名不能为空！',
            type: 'info'
          });
          this.dialogFormVisible = false;
          return;
        }

        var _this = this;
        var params = new URLSearchParams();
        params.append("wid", wid);
        params.append("wname", wname);
        params.append("fid", fid);
        params.append("liang", liang);
        params.append("oldwname", this.oldwname);
        params.append("oldfid", this.oldfid);
        this.$axios.post("uptWarehouse.action", params)
          .then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: result.data.type
            });
            _this.getData();
          })
          .catch(function (error) {
            alert(error);
          });
        this.dialogFormVisible = false;
      },
      warehouse_add() {
        this.dialogFormAdd = true;
      },
      warehouse_addOk() {
        let wname = this.$refs.warehouseadd.formWarehouse.wname;
        let fid = this.$refs.warehouseadd.formWarehouse.fid;
        let liang = this.$refs.warehouseadd.formWarehouse.liang;
        if(wname == "" || wname == null){
          this.$message({
            message: '仓库名不能为空不能为空！',
            type: 'info'
          });
          this.dialogFormVisible = false;
          return;
        }
        var _this = this;
        var params = new URLSearchParams();
        params.append("wname", wname)
        params.append("fid", fid)
        params.append("liang", liang)
        this.$axios.post("addWarehouse.action", params)
          .then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: result.data.type
            });
            _this.getData();
          })
          .catch(function (error) {
            //异步如果出现错误  触发catch里面的函数
            alert(error);
          });
        this.dialogFormAdd = false
        this.dialogFormAdd = false;
      },
      warehouse_del(wid) {
        var _this = this;
        _this.$confirm('前确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认方法
          var params = new URLSearchParams();
          params.append("wid", wid);
          this.$axios.post("/delwarehouseById.action", params).then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: result.data.type
            });
            _this.getData();
          }).catch(function (error) {
            alert(error)
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      warehouse_sel() {
        this.getData();
      },
      pagechange(pageindex) {
        this.page = pageindex;
        this.getData();
      }
    },
    components: {
      warehouse_add,
      warehouse_upt
    },
    created() {
      this.getData();
      this.getDataCangku();
    }
  }
</script>

<style scoped>

</style>
