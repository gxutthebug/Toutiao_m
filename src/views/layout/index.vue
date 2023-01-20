<template>
    <div class="layout-container">

    <router-view/>

    <van-tabbar  route>
<van-tabbar-item class="layout-tabbar" to="/layout/home" >
  <template #icon>
    <i class="iconfont icon-shouye"></i> <br>
    <span class="text">首页</span>
    </template>
</van-tabbar-item>
<van-tabbar-item class="layout-tabbar"  to="/layout/qa">
  <template #icon>
    <i class="iconfont icon-shouye "></i> <br>
    <span class="text">问答</span>
    </template>
</van-tabbar-item>
<van-tabbar-item class="layout-tabbar"  to="/layout/video">
  <template #icon>
    <i class="iconfont icon-shouye "></i> <br>
    <span class="text">视频</span>
    </template>
</van-tabbar-item>
<van-tabbar-item class="layout-tabbar"   to="/layout/my">
  <template #icon>
    <i class="iconfont icon-shouye "></i> <br>
    <span class="text">{{$store.state.user ? '我的':'未登录'}}</span>
    <!-- 用三元表达式判断是否登录，若登录显示我的，若未登录显示未登录 -->
    </template>
</van-tabbar-item>
</van-tabbar>
   </div>
</template>

<script>
// import { mixobj1 } from '@/utils/mixin'

export default {
  name: 'LayoutPage',
  components: {},
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
  // mixins: [mixobj1]
}
</script>

<style scoped lang="less"></style>
