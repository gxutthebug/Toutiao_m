<template>
    <div class="channel-edit">
        <van-cell   :border="bk"  >
          <template #title >
            <div class="title-text">
              我的频道
            </div>
          </template>
            <template #right-icon>
                <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit=!isEdit">
                 {{isEdit ? '完成' : '编辑'}}
                </van-button>
            </template>
        </van-cell>

        <van-grid :column-num="3" :border="bk"  class="my-grid" :gutter="10">
  <van-grid-item v-for="(obj,index) in  myChannel" :key="obj.id"  class="grid-item"  @click="deleteANDactive(obj,index)">
    <van-icon name="close" v-show="isEdit&&!felxChannel.includes(index)" />
    <!-- 删除图标显示条件：编辑按钮被点击 + 不可删除数组内没有对应的编号（返回值为false）;这里用的是数组索引控制也可以用obj.id -->
    <span class="van-grid-item__text"  :class="{gaoliang:index===active}" >{{obj.name}}</span>
  </van-grid-item>
</van-grid>

        <van-cell   :border="bk" >
          <template #title>
            <div class="title-text">
              推荐频道
            </div>
          </template>
        </van-cell>

        <van-grid :column-num="3" :border="bk"  class="recommend-grid" :gutter="10">
  <van-grid-item v-for="obj in recommendChannel" :key="obj.id"
   @click="add(obj)"
   icon="plus" :text="obj.name" class="grid-item" />
  <!-- icon选项可以直接用vant内置图标，直接用字符串作参数 -->
</van-grid>
    </div>
 </template>

<script>
import { getAllChannel } from '@/api/channel'
import { addChannel, deleteChannel } from '@/api/changechannel'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      bk: false,
      allchannel: [],
      isEdit: false,
      felxChannel: [0, 1, 2, 3]
      // look: []
    }
  },
  computed: {
    recommendChannel () {
      return this.allchannel.filter(item => {
        return !this.myChannel.find(item2 => item.name === item2.name)
        // find()函数返回的是匹配上的值，如果找不到是undefined,取反成了true
        // if (flag === false) {
        //   return item
        // }
      })
    }
  },
  watch: {},
  async created () {
    const { data } = await getAllChannel()
    this.allchannel = data.data.channels
    console.log('所有频道')
    console.log(this.allchannel)
    console.log('这是计算属性里的推荐频道')
    console.log(this.recommendChannel)
    // 按理说打印出来的推荐属性应该是  总的频道数 - 用户关注的频道数
    // 但是经过实际打印发现有时候会 推荐数量 = 总频道数，这说明这句打印代码，在计算属性计算之前执行
    // created中计算属性已经被挂载完毕只要，说明上述情况是用户关注的频道数未获取到， 总的频道数 - 0 = 总的频道数
    // 总频道数的获取和打印在父级的生命周期，说明子组件的created有时候会比父级先执行？
  },
  mounted () {},
  methods: {
    async add (channel) {
      if (this.isEdit) {
        this.$emit('addChannel', channel)
        if (this.$store.state.user) { // 如果用户登录,数据添加到数据库
          try {
            const res = await addChannel({ // 其实这里如果不接收响应结果，可以不用 async await
              id: channel.id,
              seq: this.myChannel.length + 1
            })
            console.log(res.data.message)
          } catch (err) {
            console.log(err)
          }
        } else {
          // console.log('应该保存到本地')
          setItem('Toutiao_Channel', this.myChannel) // 我们储存到本地时因为本地存储是以键值对的形式存的，应该整个数组当做一对键值传进去
          console.log('添加成功，保存到本地')
        }
      }
    },

    async deleteANDactive (channel, index) {
      // 当按钮选中了编辑状态，并且不可删除数组内不包含本次点击按钮的index触发删除功能
      if (this.isEdit && !this.felxChannel.includes(index)) {
        this.$emit('reduceChannel', index)
        if (this.$store.state.user) { // 如果用户已登录，删除数据库数据上对应数据作持久化
          try {
            const res = await deleteChannel(channel.id) // 其实这里如果不接收响应结果，可以不用 async await
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // console.log('应该本地')
          setItem('Toutiao_Channel', this.myChannel) // 注意虽然是删除，但是我们还是应该整个数组去覆盖
          console.log('删除成功，保存到本地')
        }
      } else {
        this.$emit('on-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  margin: 85px 0;

  .title-text{
    font-size: 32px;
    color: #333333;
  }

  .edit-btn{
    width: 104px; //这种是设计图上量多少写多少？
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

   /deep/.grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
      background-color: #f4f5f6;
      white-space: nowrap;//所有文字一行显示，不自动换行（当文字实在装不下时会超出容器，但我们不会允许输入过长的文字）
      .van-grid-item__text  {
        font-size: 28px;
        color: #222;
      }
    }
  }

  /deep/.my-grid{
    .grid-item{
      .van-icon-close{
        position: absolute;
        right: 10px; // 注意你在浏览器直接上调试时的的px值（-5）是未经过编译的，你写到这里的px值要按照750的设备尺寸写，要翻倍（-10）
        top: -5px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
      .van-grid-item__text{
      margin-top: 0;//不去掉这上边距，文字不能跟那个图标一样居中对齐
    }
    .gaoliang{
      color: #f85959;
    }
    }
  }

/deep/.recommend-grid {
  .grid-item{
  .van-grid-item__content{
    flex-direction: row;
    .van-icon-plus{
      font-size: 28px;
      margin-left: 6px;
    }
    .van-grid-item__text{
      margin-top: 0;//不去掉这上边距，文字不能跟那个图标一样居中对齐
    }

  }
  }
}

}
</style>
