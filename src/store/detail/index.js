// detail模块的小仓库
import {reqGoodsInfo,reqAddOrUpdataShopCart} from '@/api'
// 封装游客身份的模块uuid----》生成一个随机的字符串（只要生成一次就不会再改变了）
import {getUUID} from '@/utils/uuid_token'

const actions = {
  // 获取商品信息的action
   async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId)
    if(result.code==200){
      commit('GETGOODINFO',result.data)
    }
  },
  // 将产品添加到购物车||修改某个产品的个数
  async addOrUpdataShopCart({commit},{skuId,skuNum}){
    // 假如购物车返回的解构
    // 加入购物车以后（发请求），前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只返回了code=200,代表这次操作成功
    // 因为服务器没有返回其余数据，因此不需要三连环存储数据
    let result = await reqAddOrUpdataShopCart(skuId,skuNum)
    // console.log(result);
    // 代表服务器加入购物车成功
    if(result.code == 200){
      return 'ok'
    }else{
      // 返回的是失败的标记
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo
  }
}
const state = {
  goodInfo:{},
  // 游客临时身份
  uuid_token:getUUID()
}

// 计算属性：在项目中，为了简化仓库中的数据
// 可以把我们将来在组件当中要用的数据简化一下【组件使用数据就方便了】
const getters = {
  // 路径导航简化的数据
  categoryView(state){
    // 比如：state.goodInfo初始状态为空对象，空对象的categoryView属性值为undefined
    // 当前计算出来的属性值categoryView至少是一个空对象，假的报错不会有了
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  }

}

export default {
  actions,
  mutations,
  state,
  getters
}