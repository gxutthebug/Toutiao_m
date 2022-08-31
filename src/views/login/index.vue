<template>
<div class="login-container">
    <van-nav-bar
  title="登录"
/>
<van-form @submit="onSubmit" ref="loginForm"   :show-error-message="false">
  <van-field
    v-model="user.mobile"
     :rules="userFormRules.mobile"
     type="number"
     maxlength="11"
    name="手机号"
    placeholder="请输入手机号">
    <i slot="left-icon" class="iconfont icon-shanchu"></i>
    </van-field>
  <van-field
     v-model="user.code"
     :rules="userFormRules.code"
     type="number"
    maxlength="6"
    name="验证码"
    placeholder="请输入验证码">
   <!-- <i slot="left-icon" class="iconfont icon-shanchu"></i> -->
    <template #left-icon>
      <i class="iconfont icon-shoucang"></i>
    </template>
  <template #button>
    <van-count-down :time="time" format="ss 秒" v-if="isCountDownShow"  @finish="isCountDownShow = false">
      <template #default="timeData">
    <span class="block">
      {{ timeData.seconds }}s
    </span>
  </template>
</van-count-down>
          <van-button class="send-sms-btn"  native-type="button" v-else
           @click="onSendSmsCode" round size="small" type="default">发送验证码</van-button>
        </template></van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { login, getSmsCode } from '@/api/login'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      time: 60 * 1000,
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 开始转圈圈
      this.$toast.loading({
        duration: 1, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const res = await login(this.user)
        const { data } = res // 拿到成功响应数据中的token与refresh_token数据
        console.log('登录成功', res)
        console.log(data.data)
        // console.log(res.data.data)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或者验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else { // 如果状态码不是400说明可能是其他错误（没有网络..等等）
          console.log('登录失败,请稍后重试')
        }
      }
    },
    async onSendSmsCode () {
      try { // 该实例方法的返回值是一个promise(看文档)
        await this.$refs.loginForm.validate('手机号')
      } catch (err) {
        this.$toast.fail('手机号错误')
        return console.log('验证失败', err) // 如果验证失败，获取并打印验证失败原因后直接退出该事件方法
      }
      this.isCountDownShow = true // 显示倒计时组件

      try { // 发送请求获取手机验证码
        await getSmsCode(this.user.mobile)
        console.log('验证码发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
        // 发送失败，关闭倒计时
          this.isCountDownShow = false
          this.$toast.fail('发送太频繁了，请稍后重试')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
