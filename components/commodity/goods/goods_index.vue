<template>
  <div>

    <el-form :inline="true" class="demo-form-inline" style="float: left">
      <el-form-item>
        <el-input placeholder="商品名" v-model="sel_gname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="商品类型" v-model="sel_classify">
          <el-option label="全部" value="0"></el-option>
          <el-option v-for="c in classifyData" :label="c.fname" :value="c.fid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goods_sel">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column prop="gid" label="id">
      </el-table-column>
      <el-table-column prop="gname" label="商品名">
      </el-table-column>
      <el-table-column prop="classify.fname" label="商品类型">
      </el-table-column>
      <el-table-column prop="code" label="编号">
      </el-table-column>
      <el-table-column prop="gimgs" label="图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.gimgs"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="limit" label="限购数量">
      </el-table-column>
      <el-table-column prop="soid" label="已售数量" sortable>
      </el-table-column>
      <el-table-column prop="price" label="单价" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="goods_bianji(scope.row.gid)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="goods_del(scope.row.gid)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>

    <!--编辑模态框-->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
      <goodsEdit ref="goodupt"></goodsEdit>
      <div slot="footer" class="dialog-footer" style="padding: 0px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="goods_bianjiOk">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import goodsEdit from "./goods_edit"

  export default {
    name: "goods_index",
    data() {
      return {
        tableData: [],
        classifyData: [],
        total: 1,
        page: 1,
        dialogFormVisible: false,
        sel_gname: '',
        sel_classify: '0',
        oldgname: ''
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
      getData() { //获取数据方法
        var _this = this;
        var params = new URLSearchParams();
        params.append("gname", _this.sel_gname);
        params.append("classify", _this.sel_classify);
        this.$axios.post("/queryAllGoods.action", params).then(function (result) {
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
      goods_bianji(gid) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("gid", gid);
        this.$axios.post("/queryGoodsById.action", params).then(function (result) {
          _this.$refs.goodupt.formGoods.gid = result.data.gid;
          _this.$refs.goodupt.formGoods.gname = result.data.gname;
          //点击修改将图片设置成空
          _this.$refs.goodupt.formGoods.gimgs = '';
          _this.$refs.goodupt.formGoods.limit = result.data.limit;
          _this.$refs.goodupt.formGoods.price = result.data.price;
          //赋值修改前的商品名
          _this.oldgname = result.data.gname;
          //显示预浏览图片路径
          _this.$refs.goodupt.imageUrl = result.data.gimgs;
        }).catch(function (error) {
          alert(error)
        });
        this.dialogFormVisible = true
      },
      goods_bianjiOk(event) {
        //判断非空
        let gname = this.$refs.goodupt.formGoods.gname;
        if(gname == "" || gname == null){
          this.$message({
            message: '商品名不能为空！',
            type: 'info'
          });
          this.dialogFormVisible = false;
          return;
        }
        var _this = this;
        let formData = new FormData();
        formData.append("img", this.$refs.goodupt.formGoods.gimgs);
        formData.append("gid",this.$refs.goodupt.formGoods.gid)
        formData.append("gname",gname)
        formData.append("limit", this.$refs.goodupt.formGoods.limit)
        formData.append("price", this.$refs.goodupt.formGoods.price)
        formData.append("oldgname", this.oldgname)
        this.$axios({
          method: 'post',
          url: 'uptGoods.action',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (result) {
          _this.$message({
            message: result.data.msg,
            type: result.data.type
          });
          _this.getData();
        }).catch(function (error) {
          console.log("上传失败"+error);
        });
        this.dialogFormVisible = false;
      },
      goods_del(gid) {
        var _this = this;
        _this.$confirm('前确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认方法
          var params = new URLSearchParams();
          params.append("gid", gid);
          this.$axios.post("/delGoods.action", params).then(function (result) {
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
      goods_sel() {
        this.getData();
      }
    },
    components: { //子组件
      goodsEdit
    },
    created() {
      this.getData();
      this.getDataClassify();
    }
  }
</script>

<style scoped>

</style>
