<template>
    <div class="home-container">

      <van-nav-bar id="头部搜索"
  title="搜索" fixed>
  <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="search"
      >搜索</van-button>
</van-nav-bar>

<!-- active绑定的高亮的序号,可以通过代码改名active实现转跳 -->
<div id="tab导航栏+内容下拉列表">
  <van-tabs v-model="active" swipeable animated id="list主体" >

     <!-- 这是横向滑动条和每个滑动块对应的内容部分 -->
     <!-- 虽然是这样写但是内容区只有在对应滑块 首次 高亮时才会渲染,一次渲染后数据会被保留，再次选中不用重新开始加载-->
    <van-tab v-for="obj in channels" :key="obj.id"  :title="obj.name" >
      <articleList :channels="obj" ref="aa" id="测试用的" ></articleList>
    </van-tab>

    <template  #nav-right>
    <div class="blank"></div>
    <div class="hb-btn" @click="isChannelEditshow = true">
      <!-- 点击汉堡按钮弹出编辑频道界面 -->
    <van-icon name="wap-nav" />
    </div>
    </template>
  </van-tabs>

  <!-- 弹出层 -->
  <van-popup v-model="isChannelEditshow" position="bottom" id="弹出层"
  :style="{ height: '100%' }"
  close-icon-position="top-left"
   closeable >
  <ChannelEdit :myChannel="channels" :active="active"  class="aa"
  @addChannel="addfunction" @on-active="activefn"  @reduceChannel="reducefn">
  </ChannelEdit>
  </van-popup>
</div>

    </div>
</template>

<script>
import { getChannels } from '@/api/user'
import articleList from './components/article-list.vue'
import ChannelEdit from '@/Components/channel-edit'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomePage',
  components: {
    articleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditshow: false
    }
  },
  computed: {},
  watch: {},
  async created () {
    console.log('这是首页的create')
    if (this.$store.state.user) {
      const { data } = await getChannels()
      this.channels = data.data.channels
      console.log('用户关注频道')
      // console.log(data)
      console.log(this.channels)
    } else { // 如果用户未登录
      const localChannels = getItem('Toutiao_Channel')
      // 先判断，本地是否保存有频道列表;如果有直接拿来赋值，如果没有请求默认列表
      if (localChannels) {
        this.channels = localChannels
        console.log('获取了本地存储的用户关注频道') // 这个是相当于该用户以前进行过非登录状态下的频道编辑
      } else {
        const { data } = await getChannels()
        this.channels = data.data.channels
        console.log('用户关注频道(非登录状态默认值)') // 这个是用户从来没有进行过非登录状态下的频道编辑，历史信息为空，后台给他些默认值
        console.log(this.channels)
      }
    }
  },
  beforeMount () {
    console.log('这是首页的beformounted')
  },
  mounted () {
    console.log('这是首页的mounted')
    setTimeout(() => {
      console.log('$refs打印vc对象')
      console.log(this)
      console.log(this.$refs.aa[0])
      // console.log(this.$refs.aa[0])
    }, 3000)
  },
  methods: {
    addfunction (channel) {
      // console.log('进入了父级自定义事件')
      this.channels.push(channel)
    },

    activefn (index) {
      this.active = index
      this.isChannelEditshow = false
    },

    reducefn (index) {
      this.channels.splice(index, 1)
      if (index <= this.active) {
        this.active = this.active - 1
      }
    },

    search () {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>

<style scoped>
.aa{
  color: #000;
}
</style>
