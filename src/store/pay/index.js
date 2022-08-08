// import {reqSubmitTrade} from '@/api'

const state = {
  // 获取订单信息
  async getSubmitTrade({commit},data){
    let result = await reqSubmitTrade()
    console.log(result);
  }
}

const actions = {

}

const mutations = {

}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}