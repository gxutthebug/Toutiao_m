import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue' // 引入VUE是为了定义一个号全局过滤器

dayjs.locale('zh-cn') // use loaded locale globally
dayjs.extend(relativeTime)

// const day1 = new Date()
// console.log(Date)
// console.log(day1)
// console.log(day1.getTime())
// console.log(dayjs().format('DD/MM/YYYY'))

// 相对时间的API
// dayjs().from(dayjs('1990-01-01')) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
Vue.filter('relativeTime', function (value) { // 定义一个全局过滤器,外部组件可以在模版中直接使用(不需要引入)
  // 返回处理后的值
  return dayjs().to(value)
})
