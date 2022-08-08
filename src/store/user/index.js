// 登录和注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { setToken,getToken,removeToken } from '@/utils/token'

const actions = {
  // 获取验证码
  async getCode({commit},phone){
    let result = await reqGetCode(phone)
    // console.log(result);
    // 有后台下面的就不用写了
    if(result.code==200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user)
    console.log(result);
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 登录
  async userLogin({commit},data){
    let result = await reqUserLogin(data)
    // console.log(result);
    // 服务器下发的token，用户的唯一标识符
    // 将来经常带token找服务器要用户的信息进行展示
    if(result.code == 200){
      // 用户已经登录成功且获取到了token
      commit('USERLOGIN',result.data.token)
      // 持久化存储token
      localStorage.setItem('TOKEN',result.data.token)
      // 外部封装函数调用
      // setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let result = await reqUserInfo()
    // console.log(result);
    if(result.code == 200){
      commit('GETUSERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async userLogout({commit}){
    // 向服务器发请求，通知服务器清除token
    let result = await reqLogout()
    // actions里面不能操作state，要去mutations里面修改state
    if(result.code == 200){
      commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}

const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state){
    // 把仓库中用户相关信息清空
    state.token = '',
    state.userInfo={},
    // 本地存储数据清空
    // removeToken()
    localStorage.removeItem('TOKEN')
  }
}

const getters = {}

const state = {
  code:'',
  token:localStorage.getItem('TOKEN'),
  // token:getToken(),
  userInfo:{}
}

export default {
  actions,
  mutations,
  getters,
  state
}