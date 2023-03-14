<template>
    <div class="user-follow">
        <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            :disabled="isFollow"
            round
            size="small"
            icon="plus"
            :loading="isLoading"
            @click="userfollow(autID)"
          >{{ isFollow ?"已关注" :"关注" }}</van-button>
    </div>
</template>

<script>
import { following, unfollowing } from '@/api/user'

export default {
  name: 'userFollow',
  components: {},
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    autID: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    console.log('按钮组件creater')
  },
  beforeMount () {
    console.log('按钮组件beforeMount')
  },
  mounted () {
    console.log('按钮组件mounter')
  },
  methods: {
    async follow (target) {
      try {
        const data = await following(target)
        this.$emit('update-isFollow', !this.isFollow) // 关注成功父传子更新视图状态
        return data
      } catch (err) {
        this.$toast(err.response.data.message)
        return err.response.data.message
      }
    },
    async unfollow (target) {
      try {
        const data = await unfollowing(target)
        return data
      } catch (err) {
        return err.response.data.message
      }
    },
    async userfollow (target) {
      this.isLoading = true
      if (this.isFollow === false) {
        const data = await this.follow(target)
        console.log(data)
      } else {
        const data = await this.unfollow(target)
        console.log(data)
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
 .follow-btn {
        width: 170px;
        height: 58px;
      }
</style>
