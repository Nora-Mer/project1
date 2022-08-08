import {reqCartList,reqDeleteCartById,reqUpdataCheckedById} from '@/api'

const actions ={
  // 获取购物车列表的数据
  async getCartList({commit}){
    let result = await reqCartList()
    // console.log(result);
    if(result.code==200){
      commit('GETCARTLIST',result.data)
    }
  },
  // 删除购物车某产品
  async deleteCartById({commit},skuId){
    let result = await reqDeleteCartById(skuId)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 切换购物车商品选中状态
  async updataCheckedById({commit},{skuId,isChecked}){
    let result = await reqUpdataCheckedById(skuId,isChecked)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({dispatch,getters}){
    // context:shopcart小仓库————commit【提交mutations修改state】 getter【计算属性】 dispatch【派发action】 state【当前仓库数据】
    // 获取购物车中全部的产品【数组】
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartById',item.skuId) : '';
      // console.log(promise);  //promise是个Promise对象
      // 将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise)
    });
    // 每一个都是Promise对象，如果有一个Promise失败，都失败；如果成功，返回成功
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({dispatch,state},isChecked){
    // 数组
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updataCheckedById',{skuId:item.skuId,isChecked})
      return PromiseAll.push(promise)
    })
    // 最终返回结果
    return Promise.all(PromiseAll)
  }
}

const mutations = {
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
}

const state = {
  cartList:[]
}

const getters = {
  cartList(state){
    return state.cartList[0]||{}
  }
}

export default  {
  actions,
  mutations,
  state,
  getters
}