import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.less'
import { Button, NavBar, Form, Field, Toast, CountDown, Tabbar, TabbarItem, Image as VanImage, Grid, GridItem, Cell, CellGroup, Dialog, Tab, Tabs, Icon, List, PullRefresh, Popup, Search, Loading, Divider } from 'vant'
import 'amfe-flexible'
import '@/utils/day'
// import { aa } from '@/utils/mixin'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field) // Button组件全局注册, 真正注册的组件名VanButton
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Search)
Vue.use(Loading)
Vue.use(Divider)
Vue.config.productionTip = false

// console.log('打印VUE')
// console.dir(Vue)
// console.log('打印VUE原型对象')
// console.log(Vue.prototype)
// console.dir(Vue.filter)

// console.log(Vue.filters)
// console.log(Vue.prototype.filter)

// Vue.mixin({
//   created: function () {
//     // const fnthis = JSON.stringify(this)
//     console.log('这个函数调用this的指向是')
//     console.log(this)
//   }
// })

new Vue({
  router,
  store,
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  render: h => h(App)
}).$mount('#app')

// console.log('打印VM实例')
// console.log(vm)
