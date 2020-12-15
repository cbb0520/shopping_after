<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
};
</script>

<style>
  body{
    font-family: "微软雅黑";  /*  设置字体 */
    margin: 0px auto /* 去除上下的边距*/
  }

</style>
