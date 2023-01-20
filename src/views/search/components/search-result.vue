<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getresult } from '@/api/search/'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 15,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 触发onLoad事件（触底时渲染，然而因为list[]一开始为空，所以在首次进入list组件时会触发第一次）
      //  ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      // 即单次请求结束后要把loading改回false,保证下一次触底还能触发load事件（靠时间戳或者页码数来保证每一次请求不重复，不断向后请求）
      // 当数据请求完（或者足够多到不在需要时）把finished改成ture彻底禁用load事件不给他触底再次请求数据
      try {
        const { data } = await getresult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log('搜索结果')
        this.list.push(...data.data.results)
        console.log(this.list)
        this.loading = false

        if (data.data.results.length) { // 如果请求回来的不为空，说明还有数据，下次继续请求
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.loading = false
        this.error = true // 错误交互,点击错误提示文字可以重新触发load事件（尝试重新加载）
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
