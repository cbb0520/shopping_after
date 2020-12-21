<template>
<div>
  <el-row>
    <el-col :span="8">
      <el-form :inline="true"class="demo-form-inline">
        <el-form-item label="年份">
          <el-date-picker
            v-model="year"
            type="year"
            value-format="yyyy"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="seleyear">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="revnueData"
        style="width: 100%"
        >
        <el-table-column
          prop="mothen"
          label="月份/总年度"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="营收额"
        >
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="8"><div id="main2" style="width: 380px;height:400px;"></div></el-col>
    <el-col :span="8"><div id="main" style="width: 400px;height:400px;"></div></el-col>
  </el-row>

</div>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入柱状图
  require('echarts/lib/chart/pie');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

    export default {
        name: "market",
      data () {
        return {
          year:'',
          revnueData:[],
          mothed:[],
          price:[],
          zong_sum:[],
          }
      },
      methods: {
        getData() { //获取数据方法

          var _this = this;

          var params = new URLSearchParams();
          params.append("year", this.year);
          this.$axios.post("/queryshouru.action",params).
          then(function(result) {
            _this.revnueData = result.data;

            _this.zong_sum.splice(0, _this.zong_sum.length)
            for(var i=result.data.length-1 ;i>result.data.length-5;i--){
              _this.zong_sum.push({value:result.data[i].price,name:result.data[i].mothen});
            }
            _this.revnueData.splice(_this.revnueData.length-4,4)
            var myChart = echarts.init(document.getElementById('main2'));
            // 指定图表的配置项和数据
            var option = {
              title: {
                text: '公司总营收/佣金总发放量',
                subtext: '',
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
                  name: '营销收入',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data:_this.zong_sum ,
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
        getDataqianwu() { //获取数据方法
         var length = 0;
          var _this = this;

          var params = new URLSearchParams();
          params.append("year", this.year);
          this.$axios.post("/queryqinwu.action",params).
          then(function(result) {
            _this.mothed.splice(0, _this.mothed.length)
            _this.price.splice(0, _this.price.length)
           length = result.data.length
            if(result.data.length>5){
              length=5
            }
            for(var i=0;i<length;i++){
              _this.mothed.push(result.data[i].mothen);
              _this.price.push(result.data[i].price);
            }

            var myChart = echarts.init(document.getElementById('main'));
            // 指定图表的配置项和数据
            let option = {
              title: {
                text: "收入前五的月份"
              },
              tooltip: {},
              legend: {
                data: ["销量"]
              },
              xAxis: {
                data: _this.mothed
              },
              yAxis: {},
              series: [
                {
                  name: "营收额",
                  type: "bar",
                  data: _this.price
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
        seleyear(){
          this.getData();
          this.getDataqianwu();
        }
      },
      created(){
        this.getData();
        this.getDataqianwu();

      }

  }
</script>

<style scoped>

</style>
