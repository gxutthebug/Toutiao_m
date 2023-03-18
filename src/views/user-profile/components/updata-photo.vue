<template>
   <div class="update-photo">
    <img :src="img" id="image">

    <div class="toolbar">
        <div class="cancel" @click="colsefn"> 取消</div>
        <div class="confirm"  @click="confirmfn"> 确认</div>
    </div>
   </div>
</template>

<script>
import "cropperjs/dist/cropper.css"
import { userphoto } from "@/api/user";
import  Cropper from "cropperjs";

export default {
  name: 'Updataphoto',
  components: {},
  props: {
    img: {
        type:[String,Object],
        require: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const image = document.getElementById("image")
    this.cropper = new Cropper(image , {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    console.log('--')
    console.log(this.cropper.getData())
    console.log(this.cropper.getCroppedCanvas())
  },
  methods: {
    colsefn  () {
      this.$emit('input')
    },
    confirmfn () {
    this.cropper.getCroppedCanvas().toBlob( blob =>{
      this.fixphoto (blob)
    })
    this.$emit("input")
    // 发axios只是改变了数据库层面的数据并没有马上 更改当前视图 ,需要手动更改当前视图
    this.$emit('updataphoto',this.img)
    },
    async fixphoto (blob) {
      const formData = new FormData()
      formData.append('photo' ,blob)
      const { data } = await userphoto(formData)
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">

.update-photo {
    background-color: #000;
    height: 100%;
    
    img{
        max-width: 100%;
        display: block;
    }

    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel , .confirm {
            width: 90px;
            height: 90px;
            font-size: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}

</style>
