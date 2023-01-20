<template>
  <div class="search-suggestion">

    <div class="a" v-if="$store.state.suggestionFlag===true">
      <van-cell   v-for="(item, index) in suglist" :key="index"   icon="search" @click="$emit('search', item)" >
      <!-- 卧槽，这里的$emit()用的父级事件名，直接用了那个vant帮你定义好的，妙！ -->
      <template #title>
        <span v-html="highlight (item, keyword)"></span>
        <!-- 如何使字符串高亮？给字符串添加上html css语义符号，然后用v-html渲染出来 -->
        <!-- 如何给字符串添加上html css语义符号？用str.replace结合正则表达式，这里我们封装成函数 -->
        <!-- 注意一个细节这里我们选择把item传进函数而不是直接用item.replace就是为了保留这个原始的item,保留后面方便继续使用 -->
      </template>
    </van-cell>
    </div>

    <van-cell v-else>没有相关建议</van-cell>

  </div>
</template>
<script>
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    suglist: {
      type: Array,
      required: true
    },
    keyword: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  // 参数 source: 原始字符串
  // 参数 keyword: 需要高亮的关键词
  // 返回值：替换之后的高亮字符串
    highlight (source, keyword) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用,如果想要动态的用变量定义正则表达式就必须 new RegExp
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：要匹配的字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(keyword, 'gi') // 有个小BUG待处理，就是source可能为空（没有建议结果时）
      if (source) {
        return source.replace(reg, `<span style="color: #3296fa">${keyword}</span>`)
      } else {
        console.log('没有相关建议')
        // 注意一个逻辑：是先请求回来有戏的建议列表才有这个高亮处理函数的执行
        // 如果请求回来的数据为空，setFlag被改为false,展示的是无建议列表部分，根本不会有这个高亮函数的执行
        // 所以 if (source) 这个判断实际上有逻辑重复
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
