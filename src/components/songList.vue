<template>
  <div class="song-list">
    <div class="list-item" @click="addToPlaying(item)" v-for="(item, index) in songLists" :key="index">
      <div class="info" >
        <div class="song-name">
          {{item.name}}
        </div>
      <div class="song-desc">{{getDesc(item)}}</div>
      </div>
      <div class="operation" v-show="operate" @click.stop="_showOperation(index)">
        <i class="icon">&#xe605;</i>
      </div>
      <animation-menu @add="onAdd" :song="item" :index="index"></animation-menu>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import {mapActions,mapGetters} from 'vuex'
import animationMenu from '@/components/animationMenu'
export default {
  components: {
     animationMenu,
  },
  props: {
    songLists: {
      type: Array,
      default: []
    },
    operate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
   methods: {
    getDesc(song) {
      const singer = song.ar && song.ar[0].name
      const album = song.al && song.al.name
      return `${singer}·${album}`
    },
    ...mapActions(['selectPlaySong','addPlayList']),
    addToPlaying(song){
        this.selectPlaySong(song)
    },
  
    getDesc(song) {
      const singer = song.ar && song.ar[0].name
      const album = song.al && song.al.name
      return `${singer}·${album}`
    },
    _play(song) {
      this.$store.dispatch('selectPlaySong', song)
    },
    _showOperation(index) {
      for (let i = 0; i < this.songLists.length; i++) {
        if (i !== index) {
          this.songLists[i].menuShow = false
        }
      }
      this.songLists[index].menuShow = !this.songLists[index].menuShow
    },
    onAdd(el) {
      this.$emit('add', el)
    }
  },
  watch: {
    songLists() {
      for (let item of this.songLists) {
        Vue.set(item, 'menuShow', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.song-list {
  position: relative;
  .list-item {
    position: relative;
    height: px2rem(120px);
    font-size: .875rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    .info {
      flex: 1;
      line-height: 1.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .song-name {
        color: #fff;
      }
      .song-desc {
        margin-top: .25rem;
        color: hsla(0,0%,100%,.5);
      }
    }
    .operation {
      width: px2rem(100px);
      height: 100%;
      box-sizing: border-box;
      padding-top: px2rem(25px);
      text-align: right;
    }
  }
}
</style>
