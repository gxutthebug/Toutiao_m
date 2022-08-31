import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOUTIAO_USER')// 初始化时直接从本地存储中取出
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      setItem('TOUTIAO_USER', user)
    }
  },
  actions: {
  },
  modules: {
  }
})
