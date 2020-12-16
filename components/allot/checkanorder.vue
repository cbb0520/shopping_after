<template>
    <div>
      <el-table :data="del_goods" style="width: 100%">
        <el-table-column prop="dgid" label="dgid"></el-table-column>
        <el-table-column prop="did" label="订单号"></el-table-column>
        <el-table-column
          prop="gimgs"
          label="图片">
          <template slot-scope="scope">
            <img  :src="scope.row.gimgs" style="width: 30px"/>
          </template>
        </el-table-column>
        <el-table-column prop="goods.gname" label="商品名"></el-table-column>
        <el-table-column prop="goods.price" label="价格"></el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          del_goods:[]
        }
      }
    }
</script>

<style scoped>

</style>
