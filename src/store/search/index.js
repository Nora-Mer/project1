// search模块的小仓库
import {reqGetSearchInfo} from '@/api'

const actions = {
  async getSearchList({commit},params={}){
    let result = await reqGetSearchInfo(params)
    if(result.code === 200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}
const state = {
  searchList:{}
}

// 计算属性：在项目中，为了简化仓库中的数据
// 可以把我们将来在组件当中要用的数据简化一下【组件使用数据就方便了】
const getters = {
  // 当前形参state，表示当前仓库search中的state,并非大仓库里的那个state
  goodsList(state){
    // state.searchList.goodsList如果服务器数据回来了，返回的是一个数组
    // 假如网络不给力，state.searchList.goodsList返回的是undefined
    // 计算新的属性的属性值至少要返回一个数组
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList
  },
  attrsList(state){
    return state.searchList.attrsList
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}