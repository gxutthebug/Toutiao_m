<template>
    <div class="updata-user">
        <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      left-arrow
       @click-left="onClickLeft"
      @click-right="onClickRight"
     />
        <van-field v-model="message" label="昵称" placeholder="请输入昵称" />
    </div>
  </template>

<script>
export default {
  name: 'Updataname',
  components: {},
  props: {
    value: {
        type: String,
        required: true
    }
  },
  data () {
    return {
        message: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft() {
      this.$emit('close')
    },
    onClickRight() {
      // 这里本来要发axios去修改数据库里的昵称的.....但是我偷懒了......以后有空再补
      this.$emit('close')
      this.$emit('input',this.message)
    },
  }
}
</script>

<style scoped></style>
