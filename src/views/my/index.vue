<template>

  <div class="my-container">

<div class="after-login" v-if="$store.state.user">
  <div class="user-info">
        <div class="base-info">
          <div class="left">
            <van-image
            class="avater"
            fit="cover"
             round
            :src="userimge"/>
            <span class="name">黑马头条</span>
          </div>
          <div class="right">
            <van-button round type="success"  size="mini" class="fix-data">编辑资料</van-button>
          </div>
        </div>

        <div class="data-item">
          <div class="item">
            <span class="count">10</span>
            <span class="text">头条</span>
          </div>
          <div class="item">
            <span class="count">10</span>
            <span class="text">关注</span>
          </div>
          <div class="item">
            <span class="count">10</span>
            <span class="text">粉丝</span>
          </div>
          <div class="item">
            <span class="count">10</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>

      <div class="grid-nav">
        <van-grid :column-num="2">
  <van-grid-item icon="star-o" text="收藏" />
  <van-grid-item icon="coupon-o" text="历史" />
        </van-grid >
      </div>
</div>

<div class="not-login" v-else>
        <div class="middle">
          <img src="~@/assets/mobile.png" class="mobile">
          <span class="login-btn" @click="$router.push( '/login')">登录/注册</span>
        </div>
</div>

<van-cell-group inset>
  <van-cell title="消息通知"   is-link/>
  <van-cell title="小智同学"  is-link />
  <van-cell title="退出登录"  clickable  class="out-login"   @click="onlogout" v-if="$store.state.user"/>
  <!-- 添加clickable属性可以为按钮增加一个点击变深色的特效，有is-link属性的本身就有不需要加 -->
</van-cell-group>

    </div>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyPage',
  components: {},
  props: {},
  data () {
    return {
      userimge: ''
    }
  },
  computed: {},
  watch: {},
  async created () {
    if (this.$store.state.user) { // 在生命周期创建函数中发起请求，但要先做一个判断，只有已经登录才发起请求
      try {
        const { data } = await getUserInfo() // 这里用结构赋值直接剥离出data了
        console.log(data)
        this.userimge = data.data.photo
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {},
  methods: {
    onlogout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '是否要退出登录'
      })
        .then(() => {
          console.log('确认退出登录')
          this.$store.commit('setUser', null) // 调用“setUser”同时把state和本地内存中的token值变为null,从而通过state.user影响视图变为未登录状态
        })
        .catch(() => {
          console.log('取消退出登录')
        })
    }
  }
}
</script>

<style scoped></style>
