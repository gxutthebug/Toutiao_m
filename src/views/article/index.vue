<template>
    <div class="article-container">
        <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 并列部分1：加载中 -->
      <div class="loading-wrap" v-if="loading===true">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 并列部分2：加载完成-文章详情 -->
      <!-- 判断文章详情有没有请求成功很简单，只需要看this.article是否被赋值成功即可（随便看一个属性值是否为空） -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate}}</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >关注</van-button>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <!-- v-html渲染的标签是没有样式的，要自己添加样式 -->
        <div class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 并列部分3：加载失败：404 -->
      <div  class="error-wrap" v-else-if="errstatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 并列部分4：加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      <!-- 因未知错误（随机）请求失败的，点击按钮重新发起请求 -->
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        name="star-o"
      />
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
      </div>
  </template>

<script>
import { getArticleById } from '@/api/article'
import '@/style/github-markdown.css'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String], // 用props可以截获到路由参数，定义的变量名与传参时定义的一样即可
      // 这里有个细节：路由参数在声明式导航或编程式导航转跳时接收到的是数字类型，当你直接在浏览器通过URL地址转跳时得到是字符串类型
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true,
      errstatus: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    // console.log('进入了生命周期')
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      try {
        if (Math.random() > 0.7) { // 随机制造非404错误（比如一些网络错误什么的，这个错误模拟必须放到this.article赋值前才会有用
          // 因为try{}一旦捕获到错误程序会立即中断，跳到catch{};你只有把这个随机错误放到this.article赋值前，才能在错误发生时阻断this.article的获取
          // 只有阻断this.article的获取才会，使得文章详情部分无法渲染
          console.log('随机错误发生1')
          JSON.parse('askjdkjashdh')
          console.log('随机错误发生2')
        }
        const { data } = await getArticleById(this.articleId)
        console.log(data.data)
        this.article = data.data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errstatus = 404
        }
      }
      this.loading = false // 注意无论是否加载成功你都要结束加载状态
    }
  }
}
</script>

<style scoped>

</style>
<!-- 大数参数失真导致请求失败（404）, 由于服务器返回的都是JSON格式的数据，而axios会自动的帮我们把最原生的JSON响应数据转换成
对象数据再交给我们。平时基本没什么问题，但是一旦这个JSNO数据中含有""9999999999999999999999"这种超过javascript承载范围
的超大数字字符串，那么在转换过程中就会失真（反正就是得不到最原始那个字符串那个数）。
我们拿着这个失真的数字去发请求，自然就请求不到东西 -->
