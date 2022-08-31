import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.less'
import { Button, NavBar, Form, Field, Toast, CountDown } from 'vant'
import 'amfe-flexible'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field) // Button组件全局注册, 真正注册的组件名VanButton
Vue.use(Toast)
Vue.use(CountDown)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
