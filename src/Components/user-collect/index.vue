<template>
    <div class="user-collect" @click="clickfn(articleID)">
        <van-icon
        :color="isCollect ? '#ffa500' : ''"
        :name="isCollect ? 'star':'star-o'"
      />
    </div>
  </template>

<script>
import { unCollect, Collect } from '@/api/user';

export default {
  name: 'userCollect',
  components: {},
  model: {
    prop: 'isCollect',
    event: 'change'
  },
  props: {
    isCollect: {
      type: Boolean,
      required: true
    },
    articleID: {
      type:[Number, String, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async userCollect (target) {
      try {
        const data = await Collect(target)
        return data
      } catch (err) {
        console.log("?")
        console.log(err)
        return err
      }
    },
    async userUnCollect (target) {
      try {
        const data = await unCollect(target)
        // console.log("成了2")
        return data
      } catch (err) {
        return err
      }
    },
    clickfn (target) {
      if (this.isCollect===false) {
        const data = this.userCollect(target)
        console.log(data)
        this.$emit("change", !this.isCollect)
        this.$toast.success('收藏成功')
      } else {
        const data = this.userUnCollect(target)
        console.log(data)
        this.$emit("change", !this.isCollect)
        this.$toast.success('取消收藏')
      }
    }
  }
}
</script>

<style scoped></style>
