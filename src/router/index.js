import Vue from 'vue'
import VueRouter from 'vue-router'
//路由懒加载 // webpack js解析成一个个模块
const Msite = () => import('../pages/Msite/Msite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')
const Login = () => import('../pages/Login/Login.vue')

const Shop = () => import('../pages/Shop/Shop/Shop.vue')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
const ShopInfo = () => import('../pages/Shop/ShopInfo/ShopInfo.vue')
const ShopRating = () => import('../pages/Shop/ShopRating/ShopRating.vue')

Vue.use(VueRouter)

export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/msite',
      component:Msite,
      meta:{
        isShowFooter:true
      },
    },
    {
      path:'/search',
      component:Search,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'',
          redirect:'goods',
        },
        {
          path:'goods',
          component:ShopGoods
        },
        {
          path:'info',
          component:ShopInfo
        },
        {
          path:'ratings',
          component:ShopRating
        }
      ]
    }
  ]
})