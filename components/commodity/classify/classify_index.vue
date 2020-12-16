<template>

  <div>

    <el-form :inline="true">
      <el-form-item style="float: left">
        <el-input placeholder="商品名" v-model="sel_fname"></el-input>
      </el-form-item>
      <el-form-item style="float: left">
        <el-button type="primary" @click="classify_sel">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="classify_add">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="classifyData"
      style="width: 100%">
      <el-table-column prop="fid" label="id">
      </el-table-column>
      <el-table-column prop="fname" label="商品名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="classify_bianji(scope.row.fid)" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" @click="classify_del(scope.row.fid)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>

    <!--编辑模态框-->
    <el-dialog title="编辑商品类型" :visible.sync="dialogFormVisible">
      <classify_upt ref="classifyupt"></classify_upt>
      <div slot="footer" class="dialog-footer" style="padding: 0px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="classify_bianjiOk">编辑</el-button>
      </div>
    </el-dialog>

    <!--添加模态框-->
    <el-dialog title="添加商品类型" :visible.sync="dialogFormAdd">
      <classify_upt ref="classifyadd"></classify_upt>
      <div slot="footer" class="dialog-footer" style="padding: 0px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="classify_addOk">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import classify_upt from './classify_upt'
  import classify_add from './classify_add'

  export default {
    name: "classify_index",
    data() {
      return {
        classifyData: [],
        sel_fname: '',
        total: 1,
        page: 1,
        dialogFormVisible: false,
        dialogFormAdd: false,
        oldfname: ''
      }
    },
    methods: {
      getDataClassify() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("fname", _this.sel_fname);
        params.append("page", _this.page);
        this.$axios.post("/queryALlClassify.action", params).then(function (result) {
          _this.classifyData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        });
      },
      classify_bianji(fid) {
        var _this = this;
        var params = new URLSearchParams();
        params.append("fid", fid);
        this.$axios.post("/queryClassifyById.action", params).then(function (result) {
          _this.$refs.classifyupt.formclassify.fid = result.data.fid;
          _this.$refs.classifyupt.formclassify.fname = result.data.fname;
          _this.oldfname = result.data.fname;
        }).catch(function (error) {
          alert(error)
        });
        this.dialogFormVisible = true
      },
      classify_bianjiOk() {
        //判断非空
        let fname = this.$refs.classifyupt.formclassify.fname;
        if(fname == "" || fname == null){
          this.$message({
            message: '类型名不能为空！',
            type: 'info'
          });
          this.dialogFormVisible = false;
          return;
        }
        //判断名字是否相同
        if(fname == this.oldfname){
          this.dialogFormVisible = false;
          return;
        }
        var _this = this;
        var params = new URLSearchParams();
        params.append("fid", this.$refs.classifyupt.formclassify.fid);
        params.append("fname", this.$refs.classifyupt.formclassify.fname);
        params.append("oldfname", this.oldfname);
        this.$axios.post("uptClassify.action", params)
          .then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: result.data.type
            });
            _this.getDataClassify();
          })
          .catch(function (error) {
            //异步如果出现错误  触发catch里面的函数
            alert(error);
          });
        this.dialogFormVisible = false;
      },
      classify_del(fid) {
        var _this = this;
        _this.$confirm('前确认是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确认方法
          var params = new URLSearchParams();
          params.append("fid", fid);
          this.$axios.post("/delclasifyById.action", params).then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: result.data.type
            });
            _this.getDataClassify();
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
      classify_sel() {
        this.getDataClassify();
      },
      classify_add() {
        this.dialogFormAdd = true
      },
      classify_addOk() {
        //判断非空
        let fname = this.$refs.classifyadd.formclassify.fname;
        if(fname == "" || fname == null){
          this.$message({
            message: '类型名不能为空！',
            type: 'info'
          });
          this.dialogFormVisible = false;
          return;
        }
        var _this = this;
        var params = new URLSearchParams();
        params.append("fid", this.$refs.classifyadd.formclassify.fid)
        params.append("fname", this.$refs.classifyadd.formclassify.fname)
        this.$axios.post("addClassify.action", params)
          .then(function (result) {
            _this.$message({
              message: result.data.msg,
              type: result.data.type
            });
            _this.getDataClassify();
          })
          .catch(function (error) {
            //异步如果出现错误  触发catch里面的函数
            alert(error);
          });
        this.dialogFormAdd = false
      },
      pagechange(pageindex) {
        this.page = pageindex;
        //根据pageindex  获取数据
        this.getDataClassify();
      }
    },
    components: { //子组件
      classify_upt,
      classify_add
    },
    created() {
      this.getDataClassify();
    }
  }
</script>

<style scoped>

</style>
