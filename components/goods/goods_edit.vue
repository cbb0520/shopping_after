<template>
  <div style="padding-right: 20px;text-align: center">

    <el-form :model="formGoods" label-width="80px">

      <el-form-item label="id" style="display: none">
        <el-input v-model="formGoods.gid"></el-input>
      </el-form-item>

      <el-form-item label="商品名">
        <el-input v-model="formGoods.gname"></el-input>
      </el-form-item>

      <el-form-item label="商品图片">
        <!--<el-upload class="upload-demo" action="" style="float:left;">
          <el-button size="small" type="primary" style="border: 1px solid darkgrey;background-color: #FFF;padding: 0px;">
            <el-image :src="formGoods.gimgs" style="height: 100px;width: 120px;"></el-image>
          </el-button>
        </el-upload>-->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="height: 120px;width: 130px;"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="height: 120px;width: 130px;">
          <i v-else class="el-icon-plus">
            <el-image :src="formGoods.gimgs" style="height: 120px;width: 130px;margin-top: -20px;"></el-image>
          </i>
        </el-upload>
      </el-form-item>

      <el-form-item label="限购数量" style="float: left">
        <el-input-number v-model="formGoods.limit" :min=1 style="width: 180px"></el-input-number>
      </el-form-item>

      <el-form-item label="商品价格" style="float: right">
        <el-input-number v-model="formGoods.price" :step="0.1" :min=1 style="width: 180px"></el-input-number>
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
          price: ''
        },
        imageUrl: ''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.formGoods.gimgs = URL.createObjectURL(file.raw);
        console.log(this.formGoods)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;

        /*if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }*/
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG || isLt2M;
      }
    }
  }
</script>

<style scoped>
</style>
