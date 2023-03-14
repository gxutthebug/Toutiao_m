<template>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
</template>

<script>
import { commentlist } from '@/api/comment'

export default {
  name: 'CommentList',
  components: {},
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await commentlist({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        // 将数据添加到列表
        const { results } = data.data
        this.list.push(...results)

        // 将loading改为false
        this.loading = false

        // 判断是否掏空
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
