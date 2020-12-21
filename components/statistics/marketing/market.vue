<template>
  <div>
  <el-row>
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="gname"  placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select  v-model="fname" placeholder="商品分类">
          <el-option label="--请选择分类" value=""></el-option>
          <el-option v-for="fname in fnames" :label="fname.fname" :value="fname.fname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="8">
      <el-table
        :data="marketData"
        style="width: 100%"
      >
        <el-table-column
          prop="goods.gname"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="dcount"
          label="销售数量"
        >
        </el-table-column>
      </el-table>

      <el-pagination

        @current-change="pagechange"

        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
    <el-col :span="8"><div id="main4" style="width: 350px;height:400px;"></div></el-col>
    <el-col :span="8"><div id="main3" style="width: 400px;height:400px;"></div></el-col>
  </el-row>

  </div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入饼状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

    export default {
        name: "market",
      data () {
        return {
          total:1,
          page:1,
          marketData:[],//营收统计数据
          barName:[],
          barvale:[],
          fnames:[],
          fname:'',
          gname:''
        }
      },
      methods:{
        onSubmit(){
          this.market();
        },
        classify(){
          var _this = this;
          this.$axios.post("/queryClassify.action").
          then(function(result) {
            _this.fnames = result.data;
          }).
          catch(function(error) {
            alert(error)
          });
        },
        market(){
          var length = 10;
          var _this = this;
          _this.barName.splice(0, _this.barName.length)
          _this.barvale.splice(0, _this.barvale.length)
          var params = new URLSearchParams();
          params.append("gname", this.gname);
          params.append("fname", this.fname);
          params.append("page", this.page);

          this.$axios.post("/queryMarketbyCond.action",params).
          then(function(result) {
            _this.marketData = result.data.rows;
            _this.total = result.data.total;
             if(result.data.rows.length<10){
              length=result.data.rows.length
             }
             for (let gg = 0; gg < length; gg++) {
               _this.barName.push(result.data.rows[gg].goods.gname);
               _this.barvale.push(result.data.rows[gg].dcount);
             }

            var myChart = echarts.init(document.getElementById('main3'));
            // 指定图表的配置项和数据
            let option = {
              title: {
                text: "销量前五的商品"
              },
              tooltip: {},
              legend: {
                data: ["销量"]
              },
              xAxis: {
                data: _this.barName
              },
              yAxis: {},
              series: [
                {
                  name: "销售量",
                  type: "bar",
                  data: _this.barvale
                }
              ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          }).
          catch(function(error) {
            alert(error)
          });

        },
        barmarket(){

          var _this = this;
          this.$axios.post("/quryMarketFen.action").
          then(function(result) {
            var myChart = echarts.init(document.getElementById('main4'));
            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '各类型销售情况',
                subtext: '没有出售记录不会显示哦',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                {
                  name: '销售情况',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data:result.data,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          }).
          catch(function(error) {
            alert(error)
          });

        },
        pagechange(pageindex){  //页码变更时
          //console.log(pageindex)
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();

        }

      },
      created(){
        this.classify();
        this.market();
        this.barmarket();
      }
    }
</script>

<style scoped>

</style>
