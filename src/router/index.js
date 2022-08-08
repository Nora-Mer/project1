// 配置路由

// 引入Vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入路由配置
import routes from './routes'

// 引入store
import store from '@/store'

// 应用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push保存一份
const originPush = VueRouter.prototype.push

// 重写push||replace
// 第一个参数location：告诉原来的push方法，要往哪里跳转
// 第二个参数resolve：成功的回调
// 第三个参数reject：失败的回调
// call与apply区别：
// 相同点：都可以调用函数一次，都可以篡改函数的上下文(this)一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行需要传递数组。

VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve || reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,() => {},() => {})
  }
}
/* VueRouter.prototype.push = function(location){
  return originPush.call(this,location).catch(err => err)
} */
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve || reject){
    originPush.careplacell(this,location,resolve,reject)
  }else{
    originPush.replace(this,location,() => {},() => {})
  }
}


// 配置路由
let router = new VueRouter({
  // 配置路由
  // routes:routes
  routes,
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 始终滚动到顶部 top:0 4版本写法，vue2使用3版本
    return { y: 0 }
  }
})

// 全局前置守卫(路由跳转之前进行判断)
router.beforeEach(async(to,from,next)=>{
  // to:可以获取到你要跳转到那个路由的信息
  // from:可以获取到你从那个路由来
  // next:放行的函数 next()全部放行 next(path)放行到指定路由 next(false)
  // /用户登陆了才会有token
  let token = store.state.user.token
  // 用户信息
  // 不能用userInfo来判断，空对象为真
  let name = store.state.user.userInfo.name
  if(token){
    // 用户已经登陆了，还想去login，不行
    if(to.path=='/login'){
      next('/home')
    }else{
      // 登录了，但是去的不是/login
      // 如果有用户信息
      if(name){
        next()
      }else{
        // 如果没有用户信息
        // 派发action获取用户登录信息在首页展示
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 用户信息获取失败，token过期了,重新登录
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{
    // 未登录
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      // 把未登录的时候想去但没去成的信息，存储到路由中【地址栏中】
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
  
  
})

export default router