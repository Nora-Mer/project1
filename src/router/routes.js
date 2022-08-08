// 路由配置信息

// 引入路由组件
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSucess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'

// 引入二级路由
import MyOrder from '@/views/Center/MyOrder'
import GroupOrder from '@/views/Center/GroupOrder'

/* const Foo = () => {
  return import('@/views/Foo')
} */
// 简写
// const Foo = () =>  import('@/views/Foo')

// 路由懒加载
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对于的组件，这样就更加高效了。

export default [
  {
    path:'/home',
    component:()=>import('@/views/Home'),
    meta:{showFooter:true}
  },
  {
    name:'search',
    path:'/search/:keyword?',
    component:()=>import('@/views/Search'),
    meta:{showFooter:true},
    // 让路由组件Search更加方便收到参数（只能传递params参数）
    props:true
  },
  {
    path:'/login',
    component:()=>import('@/views/Login'),
    meta:{showFooter:false}
  },
  {
    path:'/register',
    component:()=>import('@/views/Register'),
    meta:{showFooter:false}
  },
  {
    path:'/detail/:skuid?',
    component:()=>import('@/views/Detail'),
    meta:{showFooter:false}
  },
  {
    name:'addcartsucess',
    path:'/addcartsucess',
    component:()=>import('@/views/AddCartSuccess'),
    meta:{showFooter:true}
  },
  {
    name:'shopcart',
    path:'/shopcart',
    component:()=>import('@/views/ShopCart'),
    meta:{showFooter:true}
  },
  {
    name:'trade',
    path:'/trade',
    component:()=>import('@/views/Trade'),
    meta:{showFooter:true},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从shopcart而来
      if(from.path=='/shopcart'||from.path=='/'){
        next()
      }else{
        // 其他的路由组件而来，停留在当前
        next(false)
      }
    }
  },
  {
    path:'/pay',
    component:()=>import('@/views/Pay'),
    meta:{showFooter:true},
    // 路由独享守卫
    /* beforeEnter: (to, from, next) => {
      // 去支付页面，必须是从trade而来
      if(from.path=='/trade'||from.path=='/'){
        next()
      }else{
        next(false)
      }
    } */

    //组件内守卫 
  },
  {
    path:'/paysuccess',
    component:()=>import('@/views/PaySuccess'),
    meta:{showFooter:true},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // ...
      if(from.path=='/pay'||from.path=='/'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/center',
    component:()=>import('@/views/Center'),
    meta:{showFooter:true},
    // 二级路由
    children:[
      {
        path:'myorder',
        component:()=>import('@/views/Center/MyOrder'),
      },
      {
        path:'grouporder',
        component:()=>import('@/views/Center/GroupOrder')
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path:'/',
    redirect:'/home'
  },   
]