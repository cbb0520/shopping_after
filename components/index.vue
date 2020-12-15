<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        <el-col :span="3" :offset="10">
          <el-menu-item index="5">当前用户{{this.$store.getters.getmsg.account}}</el-menu-item>

        </el-col>
        <el-menu-item index="6"><i class="el-icon-unlock"></i>退出登录</el-menu-item>

      </el-menu>

    </el-header>
    <el-container>

      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu v-for="menus in menu" :index="menus.id+''">
            <template slot="title" >
              <i :class="menus.iconCls"></i>
              <span> {{menus.label}}</span>
            </template>
            <el-menu-item-group v-for="childrens in menus.children"
            >
              <el-menu-item @click="handleSelect(childrens.label,childrens.url)" :index="childrens.label">{{childrens.label}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit">
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
            <component v-bind:is="item.content"></component>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Staff_index from "./systems/staff/staff_index"
  import Role_index from "./systems/role/role_index"
  import Emp_power from "./systems/emp_role/emp_power"
  import Goods_index from "./commodity/goods/goods_index"
  import Classify_index from "./commodity/classify/classify_index"
  import Menu_empower from "./systems/role_meun/menu_empower"

    export default {
        name: "index.vue",
      data () {
        return {
          menu:[],
          editableTabs: [],
          editableTabsValue: '2',
          tabIndex: 2,
          activeIndex2: '1'
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        handleSelect(label, url) {

          var res = this.editableTabs.some(function(item){
            return item.title==label;
          });
          if(!res){
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
              title: label,
              name: label,
              content: url

            });
            this.editableTabsValue = label;
          }else {
            this.editableTabsValue = label;
          }



        },
        getdata: function () {
          var _this = this;
          this.$axios.post("meuncc.action")
            /*{params:{name:_this.username,page:_this.pageindex,rows:5}})*/
            .then(function (result) {

              _this.menu =  result.data;
            })
            .catch(function (error) {
              //异步如果出现错误  触发catch里面的函数
              alert(error);
            });
        },
        handleTabsEdit(targetName, action) {
          if (action === 'remove') {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
              tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab) {
                    activeName = nextTab.name;
                  }
                }
              });
            }

            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          }
        },
        loginout(){
          sessionStorage.removeItem("store");  //从浏览器session清空数据
          this.$parent.$store.commit("setmsg",'');
          this.$router.push("/login");   //跳转 登录页面
        }
      },
      components: { //子组件
        staff_index:Staff_index,
        role_index:Role_index,
        emp_power:Emp_power,
        goods_index:Goods_index,
        menu_empower:Menu_empower,
        classify_index:Classify_index,
      },
      created(){
          console.log(this.$store.getters.getmsg)
        if(this.$store.getters.getmsg==''){
          this.$router.push("/login");
        }
        this.getdata();
      },
    }
</script>

<style scoped>
  .el-header, .el-footer {

    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 40px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
