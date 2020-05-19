<template>
  <div class="slide-wrapper">
        <mt-swipe :auto="3000" class="slide-content">
        <mt-swipe-item v-for="(img,index) in imgList" :key="index">
          <img :src="img.imageUrl" class="image" @click="jumpTo()" />
        </mt-swipe-item>
      </mt-swipe>
  </div>
</template>

<script>
export default {
    props:{
        imgList:{
            type:Array,
            require:true
        }
    }
}
</script>

<style lang="scss">
@import "../assets/css/function";
.slide-wrapper {
  position: relative;
  width: 100%;
  height: px2rem(350px);
  background: rgba(8, 5, 58, 0.9);
  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    .image{
        height: 100%;
        width:100%;
    }
  }
}
</style>