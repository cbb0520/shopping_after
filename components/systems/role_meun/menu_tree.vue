<template>
    <div>
      <el-tree
        :data="menudata"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="rolemenu"
        :props="defaultProps">
      </el-tree>
    </div>
</template>

<script>
    export default {
        name: "menu_tree",
      data() {
        return {
          menudata: [],
          rolemenu:[],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          mids:''
        };
      },
      methods:{
        getData() { //获取数据方法
          var _this = this;
          var params = new URLSearchParams();
            params.append("eid",this.$store.getters.getmsg.eid)
          this.$axios.post("/meuncc.action",params).
          then(function(result) {
              _this.menudata = result.data;

          }).
          catch(function(error) {
            alert(error)
          });

        },
        menurid (rid) { //获取角色数据方法
          this.rolemenu.splice(0, this.rolemenu.length)
          var _this = this;
          var params = new URLSearchParams();
          params.append("rid",rid)
          this.$axios.post("/queryMenuByrid.action",params).
          then(function(result) {
            result.data.map(function (items, index, arr) {
              _this.rolemenu.push(items.id)
            });
            _this.getData()
            }).catch(function (error) {
              alert(error)
            });


        },
        seletCheck(){
          var mids ="";
          //获取半选中
         var HalfCheck =  this.$refs.tree.getHalfCheckedNodes();
         //获取选中
          var checks = this.$refs.tree.getCheckedKeys()
          //判断是否含有半选中
          if (HalfCheck!=''){
            for (var i =0;i<HalfCheck.length;i++){
              mids+= HalfCheck[i].id+",";
            }
          }
          //获取选中id
          for (var i =0;i<checks.length;i++){
            mids+= checks[i]+",";
          }
          console.log(mids)
          this.mids = mids
        }
      },
      created(){
        this.getData();
      }
    }
</script>

<style scoped>

</style>
