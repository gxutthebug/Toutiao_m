<template>
    <div class="article-list" >
      <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text='refreshSuccessText'
      success-duration="1500">

  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
  <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
  <ArticleItem  v-for="(item,index) in list" :key="index" :article="item"  ref="test"></ArticleItem>
</van-list>

</van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/Components/article-item'

export default {
  name: 'articleList',
  components: {
    ArticleItem
  },
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      refreshSuccessText: '',
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log('列表组件诞生了')
  },
  mounted () {
    // this.$nextTick(() => {
    //   console.log('打印vc对象')
    //   console.log(this)
    //   console.log(this.$refs.test[1])
    // })
  },
  destroyed () {
    console.log('列表组件被销毁了')
  },
  updata () {
    // console.log('打印vc对象')
    // console.log(this)
    // console.log(this.$refs.test)
  },
  methods: {
    async onLoad () {
      // 触发onLoad事件（触底时渲染，然而因为list[]一开始为空，所以在首次进入list组件时会触发第一次）
      //  ajax 请求
      // 加载状态结束
      // 数据全部加载完成
      // 即单次请求结束后要把loading改回false,保证下一次触底还能触发load事件（靠时间戳或者页码数来保证每一次请求不重复，不断向后请求）
      // 当数据请求完（或者足够多到不在需要时）把finished改成ture彻底禁用load事件不给他触底再次请求数据
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now() // 因为this.timestamp的初始值为null所以只有首批数据的请求才用获取当前获取的时间戳
          // 这里this.timestamp和Date.now()不能写反
        })
        console.log(data.data.pre_timestamp)
        console.log('这是文章列表信息')
        console.log(data.data)
        this.list.push(...data.data.results)
        // 注意这里不能能用this.list= data.data.results，因为我们要的是在屁股后面接上去，而不是重新覆盖
        // 加载状态结束
        this.loading = false
        this.timestamp = data.data.pre_timestamp // 首批（10条）请求完后，将下一批数据的时间戳赋值上去，不然回重复请求这一批
        // 数据全部加载完成
        if (this.list.length >= 80) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
        // 加载失败也要把加载状态标记为结束，否则无法重新加载
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now() // 下拉刷新应该获取的是最新的文章,所以应该使用最新的时间戳
          // 这里this.timestamp和Date.now()不能写反
        })
        console.log('这是刷新的')
        console.log(data.data)
        this.list.unshift(...data.data.results) // 下拉刷新获取的最新文章应该拼接到头部
        // 加载状态结束
        this.isLoading = false

        this.refreshSuccessText = `刷新成功,更新了${data.data.results.length}条数据`
      } catch (err) {
        console.log(err)
        this.refreshSuccessText = '刷新失败'
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped></style>
