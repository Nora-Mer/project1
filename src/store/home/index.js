// home模块的小仓库
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'



// state：仓库-存储数据的地方
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取数据
  async categoryList({commit}){
    let result = await reqCategoryList()
    // console.log(result);
    if (result.code === 200){
      commit('CATEGORYLIST',result.data)
    }
  },
  async getBannerList({commit}){
    let result = await reqGetBannerList()
    // console.log(result);
    if(result.code === 200){
      commit('GETBANNERLIST',result.data)
    }
  },
  async getFloorList({commit}){
    let result = await reqFloorList()
    if(result.code === 200){
      commit('GETFLOORLIST',result.data)
    }
  }
}

// mutations:修改state的唯一手段
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList
  }
}

// actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const state = {
  // state中数据初始值别瞎写，服务器返回的是对象，服务器返回数组。【根据接口的返回值去初始化】
  categoryList:[],
  bannerList:[],
  floorList:[],
}

// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  
}

export default {  
  actions,
  mutations,
  state,
  getters
}