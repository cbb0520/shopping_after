<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入商户名" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="mid" label="商户id"></el-table-column>
      <el-table-column prop="uid" label="用户"></el-table-column>
      <el-table-column prop="sname" label="姓名"></el-table-column>
      <el-table-column prop="mddress" label="商户地址"></el-table-column>
      <el-table-column prop="mname" label="商户名"></el-table-column>
      <el-table-column prop="certificate" label="证件号"></el-table-column>
      <el-table-column label="门店图片">
      <template slot-scope="scope">
      　　　　<img :src="scope.row.mimgs" width="40" height="40" class="head_pic"/>
      </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="mtype" label="门店类型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-edit" circle @click="editmerchants(scope.row.mid)"></el-button>
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="delmerchants(scope.row.mid)">
            <el-button type="info" icon="el-icon-delete" slot="reference" circle></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="pagechange" layout="prev, pager, next" :total="total" :page-size="5">
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <merchants_add ref="merchants_add"></merchants_add>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <merchants_update ref="editmerchant"></merchants_update>
      <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
  import Merchants_update from "./merchants_update";
  import Merchants_add from "./merchants_add";
  export default {
    data() {
      return {
        tableData:[],
        total: 1,
        page: 1,
        dialogVisible: false,
        editDialogVisible: false,
        name: ""
      }
    }, methods: {
      getData() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("page", this.page);
        /*params.append("mname", this.name);*/
        _this.$axios.post("/queryCountMerchants.action", params).then(function (result) {
          _this.tableData = result.data.rows;
          _this.total = result.data.total;
        }).catch(function (error) {
          alert(error)
        });
      },
      delmerchants(val) { //删除数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("mid", val);
        _this.$axios.post("/deleteMerchants.action", params).
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
            message: '删除失败',
            type: 'success'
          });
        });
      },
      editmerchants(val) { //编辑按钮按下  打开编辑模态框
        //获取到要编辑的巨记录  通过val（id）
        this.editDialogVisible = true;
        var _this = this;
        var params = new URLSearchParams();
        params.append("mid",val)
        this.$axios.post("/queryMerchantsBYId.action",params)
          .then(function (result) {
            _this.$refs.editmerchant.merchants.mid = result.data.mid;
            _this.$refs.editmerchant.merchants.uid = result.data.uid;
            _this.$refs.editmerchant.merchants.sname = result.data.sname;
            _this.$refs.editmerchant.merchants.mname = result.data.mname;
            _this.$refs.editmerchant.merchants.certificate = result.data.certificate;
            _this.$refs.editmerchant.merchants.mimgs = result.data.mimgs;
            _this.$refs.editmerchant.merchants.phone = result.data.phone;
            _this.$refs.editmerchant.merchants.mtype = result.data.mtype;
            _this.$refs.editmerchant.merchants.mddress = result.data.mddress;
          })
          .catch(function (error) {
            //异步如果出现错误  触发catch里面的函数
            alert(error);
          });
      },
      update(event){
        var _this = this;
        _this.$refs.editmerchant.merchants.provincecode = _this.$refs.editmerchant.provincecode
        _this.$refs.editmerchant.merchants.citycode = _this.$refs.editmerchant.citycode
        _this.$refs.editmerchant.merchants.areacode = _this.$refs.editmerchant.areacode
        event.preventDefault();
        let  formData = new FormData();
        // formData.append("img",this.addform.img);
        //将需要提交的表单数据 快速组装为H5定义的类型FormData
        Object.keys(_this.$refs.editmerchant.merchants).forEach((key) => {
          formData.append(key,_this.$refs.editmerchant.merchants[key]);
        });
       /*var params = new URLSearchParams();
        params.append("uid",this.$refs.editmerchant.merchants.uid);
        params.append("sname",this.$refs.editmerchant.merchants.sname);
        params.append("mname",this.$refs.editmerchant.merchants.mname);
        params.append("certificate",this.$refs.editmerchant.merchants.certificate);
        params.append("mimgs",this.$refs.editmerchant.merchants.mimgs);
        params.append("phone",this.$refs.editmerchant.merchants.phone);
        params.append("mtype",this.$refs.editmerchant.merchants.mtype);
        params.append("mddress",this.$refs.editmerchant.merchants.mddress);
        params.append("provincecode",this.$refs.editmerchant.provincecode);
        params.append("citycode",this.$refs.editmerchant.citycode);
        params.append("areacode",this.$refs.editmerchant.areacode);
        _this.$axios.post("/updateMerchants.action",params)*/
        this.$axios({
          method: 'post',
          url: 'updateMerchants.action',
          data:formData,
          headers: {
            'Content-Type':'multipart/form-data'
          }
        })
          .then(function(result) {
          _this.$message({
            message: result.data.msg,
            type: 'success'
          });
          _this.editDialogVisible = false;
            //刷新数据
            _this.getData();
        }).
        catch(function(error) {
          _this.$message({
            message: '修改失败',
            type: 'success'
          });
        });
      },
        onSubmit(event) {   //添加模态框上执行添加操作 出发该方法
          var _this =this;
          _this.$refs.merchants_add.merchants.provincecode = _this.$refs.merchants_add.provincecode
          _this.$refs.merchants_add.merchants.citycode = _this.$refs.merchants_add.citycode
          _this.$refs.merchants_add.merchants.areacode = _this.$refs.merchants_add.areacode
          //阻止元素发生默认的行为
          event.preventDefault();
          let  formData = new FormData();
          // formData.append("img",this.addform.img);
          //将需要提交的表单数据 快速组装为H5定义的类型FormData
          Object.keys(_this.$refs.merchants_add.merchants).forEach((key) => {
            formData.append(key,_this.$refs.merchants_add.merchants[key]);
          });
          this.$axios({
            method: 'post',
            url: 'addMerchants.action',
            data:formData,
            headers: {
              'Content-Type':'multipart/form-data'
            }
          })
            .then(function(result) {
              _this.$message({
                message: result.data.msg,
                type: 'success'
              });
              _this.dialogVisible = false;
            }).
          catch(function(error) {
            _this.$message({
              message: '添加失败',
              type: 'success'
            });
          });
          //刷新数据
          _this.getData();
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
      merchants_update: Merchants_update,
      merchants_add: Merchants_add
    }
  }
</script>

<style scoped>

</style>
