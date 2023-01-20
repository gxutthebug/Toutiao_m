<template>
    <div class="search-history">

      <van-cell title="历史记录">
    <template v-if="isDeleteShow">
      <span @click="$emit('clear')">全部删除</span>
      <!-- 注意这里要清空数组，但数组是父组件传进来的...又要用$emit.. -->
      &nbsp;&nbsp;
      <span @click="isDeleteShow = false">完成</span>
    </template>
    <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
    </van-cell>

      <van-cell v-for="(item, index) in searchHistories" :key="index" :title="item" @click="$emit('search', item)">
        <van-icon name="close" v-show="isDeleteShow" @click="$emit('delete', index)"/>
         <!-- 注意这里要清空数组，但数组是父组件传进来的...又要用$emit.. -->
      </van-cell>

    </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
