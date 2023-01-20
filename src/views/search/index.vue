<template>
    <div class="search-container">
        <form action="/">
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="focusfn"
  />
</form>
<!-- /搜索栏 -->

    <!-- 搜索结果 -->
<search-result v-if="isResultShow" :searchText = searchText />
<!-- /搜索结果 -->

<!-- 联想建议 -->
<search-suggestion v-else-if="searchText"  :suglist = suggestionlist :keyword = searchText  @search="onSearch" />
<!-- /联想建议 -->
<!-- 联想建议展示的前提是搜索结果未显示（所以结果显示要放前面）,即未按下回车键触发搜索事件;同时还要输入框不为空 -->
<!-- 但是这样写有一个BUG就是你在一次搜索后,你如果删掉文字想进行第二次搜索发现这个结果列表不会消失，永远留在下面了 -->
<!-- 就是在输入框重新获取焦点时，重新显示联想建议,所以我们加了一个焦点事件-->

<!-- 搜索历史记录 -->
<search-history v-else  :searchHistories = searchHistories @clear="searchHistories = []" @delete="delfn()" @search="onSearch"/>
<!-- /搜索历史记录 -->
    </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { getsuggestion } from '@/api/search'
import { debounce } from 'lodash' /* yarn add lodash，并按需导入debounce函数实现防抖功能 */
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },

  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      suggestionlist: [],
      searchHistories: getItem('SearchHistory') || [] // 从本地中将历史搜索数据读取出来,记得要给一个空数组兜底
    }
  },

  computed: {},

  watch: {
    searchText: {
      // handler() {}其实是简化写法,这种给handler配置传一个函数的才是完整写法
      // debounce()有两个参数，第一个参数是正常的逻辑处理函数，第二个参数表示延时调用（如果一秒内重复触发则重新倒计时），函数返回值是防抖之后的函数
      // 即debounce()的返回值是一个会延时调用的函数
      handler: debounce(async function (newValue) {
        this.$store.commit('setFlag', true)
        // console.log('每次搜索输入框内容被改变时，setFlag回正为true')
        if (newValue.length) {
          try {
            const { data } = await getsuggestion(newValue)
            console.log('这是获取回来的搜索建议')
            this.suggestionlist = data.data.options
            console.log(this.suggestionlist)
            // 判断是否有请求回来有效的建议数据，如果没有把setFlag改为false
            if (data.data.options[0] === null || data.data.options.length === 0) {
              this.$store.commit('setFlag', false)
              // console.log('组数长为0,,修改为flase')
            }
          } catch (err) {
            alert(err)
          }
        }
      }, 1000)
    },
    searchHistories: function (val) { // 注意！如果要监听父传子的变量变化，不能在子组件监听，要在父组件监听
      // 对于要存储到本地的数据（数组多，由于无论是新增还是还是删除数组项，我们都不会去操作数组内部
      // 而是直接用新数组覆盖旧值，所以特别适合用监听器，因为两种情况的处理逻辑是一样的
      console.log('监测到了历史记录的变化')
      setItem('SearchHistory', val)
    }
  },

  created () {},

  methods: {
    onSearch (val) { // 注意这个onSearch()有三种触发方式，一种是输入后按回车触发（这个不用我们实现，输入框组件封装了）
    // 另一种是不用按回车，直接在建议列表里点任意一条建议结果触发（子组件的点击事件触发父组件的事件用$emit()
    //  还有一种是点击历史记录列表的任意一条触发
    //   Toast(val)
      this.isResultShow = true // 显示搜索结果列表
      console.log(val)
      this.searchText = val // 点击建议列表时，搜索框内容也跟着变

      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      // 提示：用indexOf()方法可以在判断数组是否存在某个元素的同时返回该元素的索引
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
    },

    onCancel () {
      this.$router.back() // 点击取消按钮路由页面后退
    },

    focusfn () {
      console.log('触发了焦点事件')
      this.isResultShow = false
      this.$store.commit('setFlag', true) // 重新获取焦点时回正
    },

    delfn (index) {
      this.searchHistories.splice(index, 1)
    }
  }
}

</script>
<style scoped lang="less">
  .search-container{
    .van-search{
        background-color: rgb(64, 163, 233);
        .van-search__action{
          color: rgba(242, 246, 245, 0.964);
        }
    }
  }
</style>
