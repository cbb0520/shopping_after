<template>
  <div>
    <el-form :mode="merchants" :rules="rules" ref="merchants" label-width="80px">
      <el-form-item label="用户id" >
        <el-input v-model="merchants.uid"></el-input>
      </el-form-item>
      <el-form-item label="姓名"  prop="sname">
        <el-input v-model="merchants.sname"></el-input>
      </el-form-item>
      <el-form-item label="商户名"  prop="mname">
        <el-input v-model="merchants.mname"></el-input>
      </el-form-item>
      <el-form-item label="证件号"  prop="certificate">
        <el-input v-model="merchants.certificate"></el-input>
      </el-form-item>
      <el-form-item label="商户图片" >
        <el-image :src="'./src/assets/shanghu/'+imageUrl" style="height: 120px;width: 130px;border: 1px solid gainsboro">
        </el-image>
        <input type="file" @change="getFile($event)" style="position: absolute;z-index: 99;height: 120px;width: 130px;margin-left: -130px;opacity: 0;cursor: pointer">
      </el-form-item>
      <el-form-item label="手机号"  prop="phone">
        <el-input v-model="merchants.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="门店类型"  prop="mtype">
        <el-select v-model="merchants.mtype" placeholder="请选择门店类型">
          <el-option label="宝妈/团长" value="宝妈/团长"></el-option>
          <el-option label="驿站/快递点" value="驿站/快递点"></el-option>
          <el-option label="超市/便利店" value="超市/便利店"></el-option>
          <el-option label="菜店/水果店" value="菜店/水果店"></el-option>
          <el-option label="写字楼/小区物业/便民服务点" value="写字楼/小区物业/便民服务点"></el-option>
          <el-option label="茶楼/麻将馆" value="茶楼/麻将馆"></el-option>
          <el-option label="餐馆/饭店/食堂" value="餐馆/饭店/食堂"></el-option>
          <el-option label="小吃/饮品店" value="小吃/饮品店"></el-option>
          <el-option label="日杂/母婴/鞋服/文具/精品店" value="日杂/母婴/鞋服/文具/精品店"></el-option>
          <el-option label="手机/通讯店/彩票点" value="手机/通讯店/彩票点"></el-option>
          <el-option label="美容/养生/大药房" value="美容/养生/大药房"></el-option>
          <el-option label="绿植花卉店" value="绿植花卉店"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收货地址">
        <select v-model="provincecode" @change="getcity" style="height: 30px;width: 150px">
          <option  v-for="p in sheng"  :value="p.code">{{p.name}}</option>
        </select>
        <select v-model="citycode" @change="getarea" style="height: 30px;width: 150px">
          <option  v-for="c in city"  :value="c.code">{{c.name}}</option>
        </select>
        <select v-model="areacode" style="height: 30px;width: 150px">
          <option  v-for="a in area"  :value="a.code">{{a.name}}</option>
        </select>
      </el-form-item>
      <el-form-item label="详细地址" prop="mddress">
        <el-input v-model="merchants.mddress" placeholder="请填写详细的地址"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        data() {
          return {
            sheng:[],
            city: [],
            area: [],
            provincecode:"",
            citycode:"",
            areacode:"",
            merchants: {
              uid:0,
              sname: "",
              certificate:"",
              mimgs:"",
              mname: "",
              phone: "",
              mtype:"",
              mddress:"",
              provincecode:"",
              citycode:"",
              areacode:""
            },
            imageUrl: '',
            rules: {
              sname: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
              ],
              certificate: [
                { required: true, message: '请输入证件号', trigger: 'blur' }
              ],
              mname: [
                { required: true, message: '请输入商户名', trigger: 'blur' }
              ],
              phone: [
                { required: true, message: '请输入电话', trigger: 'change' },
                { min: 11, max: 11, message: '输入正确的手机号', trigger: 'blur' },
              ],
              mtype: [
                { required: true, message: '请选择门店类型', trigger: 'blur' }
              ],
              mddress: [
                {required: true, message: '请输入地址', trigger: 'blur' }
              ]
            }
          }
        },
      methods:{
        getprovince: function () {
          //将this对象保存到一个临时变量中 (临时变量 指向 vue对象)
          var _this = this;
          //异步获取数据
          this.$axios.post("/queryAllProvince.action")
            .then(function (result) {
              //异步成功，执行then里面的函数
              //result  结果  很多的响应信息
              //获取后端传递的json数据  result.data
              _this.sheng = result.data;
            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        },
        getcity: function () {
          var _this = this;
          var params=new URLSearchParams();
          params.append("provincecode",_this.provincecode)
          //异步获取数据
          this.$axios.post("/queryCity.action", params)
            .then(function (result) {
              //异步成功，执行then里面的函数
              //result  结果  很多的响应信息
              //获取后端传递的json数据  result.data
              _this.city = result.data;
            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        },
        getarea: function () {
          var _this = this;
          var params=new URLSearchParams();
          params.append("citycode",_this.citycode)
          //异步获取数据
          this.$axios.post("/queryArea.action", params)
            .then(function (result) {
              //异步成功，执行then里面的函数
              //result  结果  很多的响应信息
              //获取后端传递的json数据  result.data
              _this.area = result.data;
            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        },
        getFile: function (event) {  //文件每次选中，触发此方法  将选中的文件内容填充到addform中的img  后台通过img获取文件内容
          this.merchants.img = event.target.files[0];
          console.log(this.merchants.img)
          var _this = this;
          let formData = new FormData();
          formData.append("img", event.target.files[0]);
          this.$axios({
            method: 'post',
            url: 'addImage2.action',
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
      },
      created:function () {
        this.getprovince();
      }
    }
</script>

<style scoped>

</style>
