<template id="4444">
    <div class="qa-container">问答</div>
</template>

<script>
import { mixobj2 } from '@/utils/mixin'

export default {
  name: 'QaPage',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    console.log('问答组件1')
    console.log(this.$el)
  },
  beforeMount () {
    console.log('问答组件2')
    console.log(this.$el)
  },
  mounted () {
    console.log('问答组件3')
    console.log(this.$el)
  },
  methods: {},
  mixins: [mixobj2]
}
</script>

<style scoped></style>
