import {reqGetTradeInfo,reqAddressInfo} from '@/api'

const actions = {
  // 获取地址信息
  async getUserAddress({commit}){
    let result = await reqAddressInfo()
    // console.log(result);
    if(result.code == 200){
      commit('GETUSERADDRESS',result.data)
    }
  },
  // 获取商品订单详细信息
  async getTradeInfo({commit}){
    let result = await reqGetTradeInfo()
    // console.log(result);
    if(result.code == 200){
      commit('GETTRADEINFO',result.data)
    }
  }
}

const mutations = { 
  GETUSERADDRESS(state,userAddress){
    state.userAddress = userAddress
  },
  GETTRADEINFO(state,tradeInfo){
    state.tradeInfo = tradeInfo
  },
}

const getters = {
  detailArrayList(state){
    return state.tradeInfo.detailArrayList
  },
  totalAmount(state){
    return state.tradeInfo.totalAmount
  },
  totalNum(state){
    return state.tradeInfo.totalNum
  }
}

const state = {
  userAddress:[],
  tradeInfo:{}
}

export default {
  actions,
  mutations,
  getters,
  state
}