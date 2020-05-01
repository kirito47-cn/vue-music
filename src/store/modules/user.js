import  * as types from '../types'

/**
 * user通用配置
 */
const state = {
    loginStatus:false,
    token:"",
    userinfo:{
        nickname:"",
        avatarUrl:""
    }
}

const getters = {
     nickname: state =>state.userinfo.nickname,
     avatarUrl:state =>state.userinfo.avatarUrl
  }
const actions  = {
    setLoginStatus({commit,state},payload){
        commit(types.SET_LOGIN_STATUS,payload)
    },
    setUserinfo({commit,state},payload){
        commit(types.SET_USERINFO,payload)
    },
    setToken({commit,state},payload){
        commit(types.SET_TOKEN,payload)
    }
}
const mutations = {
   [types.SET_LOGIN_STATUS](state,status){
       state.loginStatus = status
   },
   [types.SET_USERINFO](state,status){
       state.userinfo = status
   },
   [types.SET_TOKEN](state,status){
       state.token = status
   }


}
export default {
    state,
    actions,
    getters,
    mutations
  }