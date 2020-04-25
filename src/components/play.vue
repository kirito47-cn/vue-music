<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="mini">
      <div class="mini-player" @click="changefull" v-show="!fullScreen">
        <div class="picture">
          <div class="imgWrapper" ref="miniWrapper">
            <img
              ref="miniImage"
              :class="cdCls"
              width="40"
              height="40"
              v-lazy="
                (currentSong.al && currentSong.al.picUrl) ||
                  (currentSong.artists && currentSong.artists[0].img1v1Url)
              "
            />
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc"></p>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <i class="icon icon-mini" v-if="playing">&#xe60a;</i>
          <i class="icon icon-mini" v-else>&#xe606;</i>
        </div>
        <div class="control" @click.stop="next">
          <i class="icon" style="font-size: 24px">&#xe718;</i>
        </div>
        <div class="control" @click.stop="toggleShowList">
          <i class="icon">&#xe927;</i>
        </div>
        <div class="bottom-progress-bar">
          <div
            class="bottom-progress"
            :style="{ width: (currentTime / duration).toFixed(3) * 100 + '%' }"
          ></div>
        </div>
      </div>
    </transition>
    <transition name="normal">
      <div v-show="fullScreen" class="normal-player">
        <div class="background">
          <img
            width="100%"
            height="100%"
            :src="
              (currentSong.al && currentSong.al.picUrl) ||
                (currentSong.artists && currentSong.artists[0].img1v1Url)
            "
          />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon">&#xe8e2;</i>
          </div>
        </div>
        <div class="middle">
          <div class="mid-img">
            <img
              v-lazy="
                (currentSong.al && currentSong.al.picUrl) ||
                  (currentSong.artists && currentSong.artists[0].img1v1Url)
              "
              class="mid-big-img"
            />
          </div>
        </div>
        <div class="context">
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2
            class="subtitle"
            v-html="
              (currentSong.ar && currentSong.ar[0].name) ||
                (currentSong.artists && currentSong.artists[0].name)
            "
          ></h2>
        </div>
        <div class="controller">
          <div class="icon-box i-left prev-controller">
            <i class="icon" @click="prev">&#xe61e;</i>
          </div>
          <div class=" icon-box play-controller">
            <i class="icon" v-if="playing" @click="togglePlaying">&#xe644;</i>
            <i class="icon icon-pause" v-else @click="togglePlaying"
              >&#xe630;</i
            >
          </div>
          <div class="icon-box i-right next-controller">
            <i @click="next" class="icon">&#xe604;</i>
          </div>
          <!-- <div class="icon-box i-right">
                <i class="icon" style="font-size: 28px">&#xe927;</i>
                <i @click="toggleFavorite(currentSong)" class="icon" :class="favoriteIcon"></i> -->
          <!-- </div> -->
        </div>
      </div>
    </transition>
      <v-playlist ref="playList"></v-playlist>

    <audio
      ref="audio"
      @playing="ready"
      @pause="paused"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { playerMixin } from "@/common/js/mixin";
import { MusicUrl } from "../api/index";
import playlist from "@/components/playList";
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      duration: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
      isPureMusic: false,
      pureMusicLyric: "",
      showlist: true,
    };
  },
  components: {
    "v-playlist": playlist,
  },
  mixins: [playerMixin],
  created() {},
  methods: {
    closeList() {
      this.showlist = false;
    },
    back() {
      this.setFullScreen(false);
    },
    ready() {
      clearTimeout(this.timer);
      // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
      this.songReady = true;
      this.canLyricPlay = true;
      this.duration = this.$refs.audio.duration;
      // console.log('duration'+this.duration)
      this.savePlayHistory(this.currentSong);
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      if (this.currentLyric && !this.isPureMusic) {
        this.currentLyric.seek(this.currentTime * 1000);
      }
    },
    paused() {
      this.setPlaying(false);
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
    },
    end() {
      this.currentTime = 0;
      this.next();
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.setPlaying(true);
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    togglePlaying() {
      this.setPlaying(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    toggleShowList() {
       this.$refs.playList.show()
    },
    changefull() {
      this.setFullScreen(true);
    },
    ...mapMutations([""]),
    ...mapActions(["setPlaying", "savePlayHistory"]),
  },
  computed: {
    cdCls() {
      return this.playing ? "play" : "";
    },
    ...mapGetters([
      "currentIndex",
      "fullScreen",
      "playing",
      "playList",
      "currentSong",
    ]),
  },
  watch: {
    async currentSong(newSong, oldSong) {
      if (!newSong.id || newSong.id === oldSong.id) {
        return;
      }
      if (!newSong.url) {
        const { data, code } = await MusicUrl(newSong.id);
        if (data && code === 200) {
          newSong = { ...newSong, url: data[0].url };
          //   console.log(newSong)
        } else {
          alert("请求音乐出错啦");
        }
      }
      // this.songReady = false
      // this.canLyricPlay = false
      // if (this.currentLyric) {
      //   this.currentLyric.stop()
      //   // 重置为null
      //   this.currentLyric = null
      this.currentTime = 0;
      //   this.playingLyric = ''
      //   this.currentLineNum = 0
      // }
      this.$refs.audio.src = newSong.url;
      this.$refs.audio.play();
      // console.log(this.$refs.audio)
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.songReady = true;
      }, 5000);
      // console.log(newSong)
      // this.getLyric(newSong.id) //获得歌词
    },
    playing(newPlaying) {
      if (!this.songReady) {
        return;
      }
      //  alert(newPlaying)
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
      if (!newPlaying) {
        if (this.fullScreen) {
          //   this.syncWrapperTransform('imageWrapper', 'image')
        } else {
          //   this.syncWrapperTransform('miniWrapper', 'miniImage')
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/function.scss";

.player {
  z-index: 100;
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 500;
    background: rgb(8, 5, 58);
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: px2rem(12px);
        z-index: 50;
        .icon {
          display: block;
          height: px2rem(100px);
          line-height: px2rem(100px);
          padding: 0 px2rem(30px);
          font-size: 22px;
        }
      }
    }
    .middle {
      position: relative;
      top: px2rem(50px);
      width: 100%;
      .mid-img {
        width: px2rem(550px);
        height: px2rem(550px);
        margin: 0 auto;
        .mid-big-img {
          width: 100%;
          height: 100%;
          border-radius: px2rem(30px);
        }
      }
    }
    .context {
      text-align: center;
      position: relative;
      top: px2rem(70px);
      width: px2rem(550px);
      margin: 0 auto;
      .title {
        font-size: 1.875rem;
        margin-bottom: 1.875rem;
      }
    }
    .controller {
      position: relative;
      top: 6rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .play-controller {
        text-align: center;
        background-color: #999;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 50%;
        color: blue !important;
      }
    }

    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: px2rem(5px);
    z-index: 500;
    width: 100%;
    height: px2rem(105px);
    background: #ea2448;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .picture {
      flex: 0 0 px2rem(80px);
      width: px2rem(80px);
      height: px2rem(80px);
      padding: 0 px2rem(20px) 0 px2rem(40px);
      .imgWrapper {
        height: 100%;
        width: 100%;
        img {
          border-radius: 50%;
          &.play {
            animation: rotate 10s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
            // animation: rotate 100000000s linear infinite;
          }
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: px2rem(40px);
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
    .control {
      flex: 0 0 px2rem(60px);
      width: px2rem(60px);
      text-align: center;
      padding: 0 px2rem(20px);
      .icon {
        font-size: 30px;
        color: #fff;
      }
    }
    .bottom-progress-bar {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: px2rem(6px);
      background: #fe7498;
      .bottom-progress {
        height: 100%;
        background: linear-gradient(#902541, #902444);
      }
    }
  }
  .playlist {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 501;
    background-color: rgba($color: #000000, $alpha: 0.3);
    ul {
      position: absolute;
      bottom: 0;
      height: 25rem;
      overflow-y: scroll;
      background-color: #1d232d;
      width: 100%;
      .music {
        box-sizing: border-box;
        color: white;
        display: inline-block;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        border-top: 0.0625rem #292e38 solid;
        padding-left: 0.625rem;
        padding-right: 1.475rem;
      }
    }

    &.playlist-enter-active,
    &.playlist-leave-active {
      transition: all 0.4s;
    }
    &.playlist-enter,
    &.playlist-leave-to {
      opacity: 0;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
