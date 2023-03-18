<template>
    <div class="user-profile">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- /导航栏 -->


      <!-- 表单控件,这个控件随便放,反正最后都隐藏,我们通过单击头像来触发这个input的点击事件,从而弹出文件选择框 -->
     <input type="file" hidden ref="file" @change="onFileChange" />
     <!-- 表单控件 -->
  
      <!-- 个人信息 -->
      <van-cell class="avatar-cell" title="头像" @click="onChangePhoto"  is-link center>
        <van-image
          class="avatar"
          round
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <van-cell :title="user.name" value="修改" is-link  @click="showPopup"/>
      <van-cell :title="user.gender==1 ? '男':'女'" value="修改" is-link  @click="showPopup"/>
      <van-cell :title="user.birthday" value="修改" is-link  @click="showPopup"/>
      <!-- /个人信息 -->

      <!-- 弹出层 -->
      <van-popup 
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }">
        <Updatauser @close="show = !show" @input="user.name = $event" v-model="user.name"></Updatauser>
      </van-popup>
       <!-- 弹出层 -->


        <!-- 弹出层 -->
      <van-popup 
      v-model="show2"
      v-if="this.show2" 
      position="bottom"
      :style="{ height: '100%' }">
           <Updataphoto  :img="img" @input="show2 = !show2" @updataphoto="user.photo = $event"></Updataphoto>
      </van-popup>
       <!-- 弹出层 -->
    </div>
  </template>
  

<script>
import { getuserdata } from "@/api/user"
import Updatauser from "./components/updata-name.vue"
import Updataphoto from "./components/updata-photo.vue"

  export default {
  name: 'UserProfile',
  components: {
    Updatauser,
    Updataphoto
  },
  props: {},
  data () {
    return {
      user: {},
      show: false,
      show2: false,
      img: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getuser()
  },
  mounted () {},
  methods: {
    async getuser () {
      try {
        const { data } = await getuserdata()
        console.log(data)
        this.user = data.data
        console.log(this.user)
      } catch (err) {
        console.log(err)
      }
    },
    showPopup() {
      this.show = true;
    },
    onChangePhoto () {
        this.$refs.file.click()
      },
    onFileChange () {
        // 选择图片触发input的@change方法
        const fileObj = this.$refs.file.files[0]
        if (fileObj) {

        // this.img 是接收这个选择的图片然后传给子组件去剪裁 + 发 axios
        this.img = window.URL.createObjectURL(fileObj)

          this.show2 = true
        // 如果获取到图片对象后你不清空这个value,那在下一次选择同样的照片时将不会触发Change()事件
          this.$refs.file.value = ''
        }
    }
  }
}
</script>


<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
</style>