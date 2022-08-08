import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 引入 三级联动组件——全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 注册 全局组件，第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// element-ui按需引入
import {MessageBox} from 'element-ui'
// 引入element-ui组件【挂载在原型上】
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入mockServe.js----mock数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入inconfont图标
import '@/assets/icon/iconfont.css'

// 统一接收api文件夹里面的全部请求函数
// 统一引入【对象】
import * as API from '@/api'
// console.log(API); //全部请求函数 对象

// 引入gif
import xe from '@/assets/images/1.gif'

// 引入插件
import VueLazyload from 'vue-lazyload'
// 应用vue-lazyload插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:xe
})

// 引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线配置
  beforeCreate(){
    // this => vm
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由：底下的写法KV一致，省略V【router小写的】
  // 注册路由信息：当这里配置router的时候，组件身上就拥有了$route,$router属性
  router,
  // 注册仓库：组件实例的身上会多一个属性——$store
  store

}).$mount('#app')
