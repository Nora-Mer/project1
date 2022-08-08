// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockRequest'

// 三级联动的接口
// /api/product/getBaseCategoryList  get请求 没有参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求、获取三级菜单数据。
// 切记：当前函数执行需要把服务器返回结果返回
// 发送请求：axios发送请求返回结果是promise对象
/* export const reqCategoryList = ()=>  requests({url:'/product/getBaseCategoryList',method:'get'}) */
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取search数据  
// 当前这个函数需要接受外部传递的参数
// 当前这个接口（获取search模块的数据），给服务器传递一个默认参数【至少是一个空对象】，否则请求失败
export const reqGetSearchInfo = (params) => requests({
  url:"/list",
  method:"post",
  // 传参：post -> data  get -> params
  data:params
}) 

// 获取商品详情信息的接口  /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({
  url:`/item/${ skuId }`,
  method:"get",
}) 

// 将产品添加到购物车中或更新购物车中某一个产品的数量
 export const reqAddOrUpdataShopCart = (skuId,skuNum) => requests({
  url:`/cart/addToCart/${ skuId }/${ skuNum }`,
  method:'post'
  }) 

  // 获取购物车列表数据的接口
  export const reqCartList = () => requests({
    url:'/cart/cartList',
    method:'get'
  })

  // 删除购物车产品的接口
  export const reqDeleteCartById = (skuId) => requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })

  // 切换商品选中状态
  export const reqUpdataCheckedById = (skuId,isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
  })

  // 获取验证码
  export const reqGetCode = (phone) => requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
  })

  // 注册接口
  export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method:'post'
  })

  // 登录接口
  export const reqUserLogin = (data) => requests({
    url:'/user/passport/login',
    data,
    method:'post'
  })

  // 获取用户信息【需要带着用户的token向服务器要用户信息】
  export const reqUserInfo = () => requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })

  // 退出登录
  export const reqLogout = () => requests({
    url:'/user/passport/logout',
    method:"get"
  })

  // 获取用户地址信息
  export const reqAddressInfo = () => requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
  })

  // 获取订单交易页信息接口
  export const reqGetTradeInfo = () => requests({
    url:'/order/auth/trade',
    method:'get'
  })

  // 获取提交订单信息接口
  export const reqSubmitTrade = (tradeNo,data) => requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
  })

  // 获取订单支付信息
  export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method:'get'
  })

  // 获取支付订单状态
  export const reqPayStatus = (orderId) => requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })

  // 获取我的订单【个人中心】列表接口
  export const reqMyOrderList = (page,limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method:'get'
  })
 




