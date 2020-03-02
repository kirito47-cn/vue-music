// import api from '../../api'
import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  banners: [],
  searchHistory: [],
  showPlayList: false,
  showSidebar: false,
}

const getters = {
    banners: state => state.banners,
    searchHistory: state => state.searchHistory,
    showPlayList: state => state.showPlayList,
    showSidebar: state => state.showSidebar,
  }
const actions  = {
    setShowSidebar({ commit }, status) {
        commit(types.COM_SHOW_SIDE_BAR, status)
    }
}
const mutations = {
    [types.COM_SHOW_SIDE_BAR](state, status) {
        state.showSidebar = status
    }
}
export default {
    state,
    actions,
    getters,
    mutations
  }