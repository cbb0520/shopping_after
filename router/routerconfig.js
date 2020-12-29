import Vue from 'vue'
import VueRouter from "vue-router";
import Index from "../components/index.vue";
import Login from "../components/logins";

Vue.use(VueRouter)

export  default  new VueRouter({
  routes:[
    {path:"/",redirect:'login'},
    {path:"/index",component:Index,name:"indexs" , meta: { requiresAuth: true }},
    {path:"/login",component:Login, meta: { requiresAuth: true }},
  ]
})
