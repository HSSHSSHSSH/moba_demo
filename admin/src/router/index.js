import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
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

      {path: '/articles/create', component:ArticleEdit}, //新建文章
      {path: '/articles/edit/:id', component:ArticleEdit,props:true}, //编辑文章
      {path:'/articles/list',component:ArticleList},  //英雄文章

      {path: '/ads/create', component:AdsEdit}, //新建广告位
      {path: '/ads/edit/:id', component:AdsEdit,props:true}, //编辑广告位
      {path:'/ads/list',component:AdsList},  //英雄广告位

      {path: '/admin_users/create', component:AdminUserEdit}, //新建广告位
      {path: '/admin_users/edit/:id', component:AdminUserEdit,props:true}, //编辑广告位
      {path:'/admin_users/list',component:AdminUserList},  //英雄广告位

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
