import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/categories/create', component:CategoryEdit}, //新建分类
      {path: '/categories/edit/:id', component:CategoryEdit,props:true}, //编辑分类
      {path:'/categories/list',component:CategoryList},  //分类列表

      {path: '/items/create', component:ItemEdit}, //新建物品
      {path: '/items/edit/:id', component:ItemEdit,props:true}, //编辑物品
      {path:'/items/list',component:ItemList},  //物品列表

      {path: '/heros/create', component:HeroEdit}, //新建英雄
      {path: '/heros/edit/:id', component:HeroEdit,props:true}, //编辑英雄
      {path:'/heros/list',component:HeroList},  //英雄列表

    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
