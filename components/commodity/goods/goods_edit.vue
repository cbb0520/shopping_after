<template>
  <div style="padding-right: 20px;text-align: center">

    <el-form :model="formGoods" label-width="80px">

      <el-form-item label="id" style="display: none">
        <el-input v-model="formGoods.gid"></el-input>
      </el-form-item>

      <el-form-item label="商品名">
        <el-input v-model="formGoods.gname"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" style="text-align: left">
        <el-image :src="'./src/assets/'+imageUrl" style="height: 120px;width: 130px;border: 1px solid gainsboro">
        </el-image>
        <input type="file" @change="getFile($event)"
               style="position: absolute;z-index: 99;height: 120px;width: 130px;margin-left: -130px;opacity: 0;cursor: pointer">
      </el-form-item>

      <el-form-item label="限购数量" style="float: left">
        <el-input-number v-model="formGoods.limit" :min=1 style="width: 180px"></el-input-number>
      </el-form-item>

      <el-form-item label="商品价格" style="float: right">
        <el-input-number v-model="formGoods.gprice" :step="0.1" :min=1 style="width: 180px"></el-input-number>
      </el-form-item>
      <br>
    </el-form>

  </div>

</template>

<script>
  export default {
    name: "goods_edit",
    data() {
      return {
        formGoods: {
          gid: '',
          gname: '',
          gimgs: '',
          limit: '',
          gprice: ''
        },
        imageUrl: ''
      }
    },
    methods: {
      getFile(event) {
        //将文件赋给对象，用于修改
        this.formGoods.gimgs = event.target.files[0];
        var _this = this;
        let formData = new FormData();
        formData.append("img", event.target.files[0]);
        this.$axios({
          method: 'post',
          url: 'addImage.action',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          //修改图片直接上传到本地，再显示图片
          _this.imageUrl = response.data.imgurl;
        }).catch(function (error) {
          console.log("上传失败"+error);
        });
      }
    }
  }
</script>
<style scoped>
</style>
