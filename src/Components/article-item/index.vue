<template>
    <div class="article-item">
     <van-cell :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
     }">
       <template #title>
       <div class="title">{{article.title }}</div>
        </template>

        <template #label>
           <div class="cover-wrap" v-if="article.cover.type===3">
            <div class="cover-item-img">
                <van-image
                fit="cover"
                :src="article.cover.images[0]"/>
            </div>
            <div class="cover-item-img">
                <van-image
                cover
                :src="article.cover.images[1]"/>
            </div>
            <div class="cover-item-img">
                <van-image
                cover
                :src="article.cover.images[2]"/>
            </div>
           </div>

        <div class="label-info-wrap">
         <span>{{article.aut_name}}</span>
         <span>{{article.comm_count+'评论'}}</span>
         <span>{{article.pubdate | relativeTime}}</span>
        </div>

        </template>
<!-- 注意这个判断条件要放在template上，如果放在内部无论是否满足条件都会出现右侧一个空的插槽父容器（会影响左侧文字布局） -->
            <template  #default  v-if="article.cover.type===1">
                <div class="right-cover">
                    <van-image
                cover
                :src="article.cover.images[0]"/>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    console.log('这是列表项的create')
  },
  beforeMount () {
    console.log('这是列表项的beforeMount')
  },
  mounted () {
    console.log('这是列表项的mounted')
  },
  methods: {}
}
</script>

<style scoped></style>
