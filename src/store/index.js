import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOUTIAO_USER'), // 将token储存在user里，后续判断用户是否登录只需要判断user是否为空值
    // 初始化时直接从本地存储中取出
    suggestionFlag: true // 判断是否有相关联想建议，默认是true,请求失败设置为false,再次请求联想列表前改回true
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user // 将token保存到VUEX中的user中
      setItem('TOUTIAO_USER', user) // 保存到VUEX的同时，备份到本地存储中，实现数据持久化
    },
    setFlag (state, value) {
      state.suggestionFlag = value
    }
  },
  actions: {
  },
  modules: {
  }
})

// 关于token的用处,①用户在发起有权限的请求时我们都需要在请求头添加token（用请求拦截器添加）；②判断用户是否登录
// 关于token的保存，我们想要尽可能的把token保存到一个公共数据块。有两种选择一是本地存储（缺点是读取麻烦）
// 另一种是VUEX(缺点是不可持久化，刷新页面或重新打开应用数据就清空)
// 我们这里采用两种方式结合来保存token,在登录拿到token后先把token存到VUEX中的一个变量中，但此时刷新页面你的token还是会丢失
// 因为你这个变量值初始值是空每次刷新页面VUEX都会重新初始化 ，所以我们在把token存到VUEX中的同时将token备份到本地储存中
// 之后只需要使UEX中保存token的变量初始值从本地存储中读取而不是null即可
