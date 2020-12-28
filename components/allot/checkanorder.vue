<template>
    <div>
      <el-table :data="del_goods" style="width: 100%">
        <el-table-column prop="dgid" label="dgid"></el-table-column>
        <el-table-column prop="did" label="订单号"></el-table-column>
        <el-table-column
          prop="gimgs"
          label="图片">
          <template slot-scope="scope">
            <el-image :src="'./src/assets/'+scope.row.goods.gimgs" style="width: 100px;height: 90px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="goods.gname" label="商品名"></el-table-column>
        <el-table-column prop="goods.gprice" label="价格"></el-table-column>
        <el-table-column prop="dcount" label="数量"></el-table-column>
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
