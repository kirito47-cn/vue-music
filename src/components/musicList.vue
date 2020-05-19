<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon">&#xe608;</i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" @click="playAll" class="play" >
          <i class="icon">&#xe606;</i>
          <span class="text">播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <v-scroll
      :data="songs"
      click:true
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <v-song-list :songLists="songs" ></v-song-list>
      </div>
    </v-scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
import songList from '@/components/songList'

export default {
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.probeType = 1
    this.listenScroll = false
    this.dropBalls = []
  
  },
  components:{
      "v-scroll":scroll,
      "v-song-list":songList
  },
  methods:{
    back() {
      this.$router.back()
    },
    playAll(){
      this.$store.dispatch('playAllList',this.songs)
    }
  
  },
  mounted(){
    
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/css/function.scss";
.music-list {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgb(8, 5, 58);
  .back {
    position: absolute;
    top: 0;
    line-height: px2rem(100px);
    z-index: 50;
    .icon {
      display: block;
      padding: 0 px2rem(30px);
      font-size: 1.375rem;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: px2rem(100px);
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: px2rem(100px);
    font-size: 1.125rem;
    color: #fff;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    z-index: 10;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: px2rem(60px);
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: px2rem(240px);
        padding: px2rem(10px) 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ea2448;
        color: #ea2448;
        border-radius: px2rem(200px);
        font-size: 0;
        .icon {
          display: inline-block;
          vertical-align: middle;
          margin-right: .375rem;
          font-size: 1rem;
          color: #ea2448;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: .75rem;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: rgb(8, 5, 58);
  }
  .list {
    position: absolute;
    top: px2rem(475px);
   
    bottom: 0;
    width: 100%;
    background: rgb(8, 5, 58);
    .song-list-wrapper {
      padding: px2rem(30px) px2rem(50px);
       padding-bottom: px2rem(100px);
    }
  }
}
</style>
