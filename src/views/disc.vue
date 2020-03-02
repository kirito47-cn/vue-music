<template>
<transition name="slide">
    <v-music-list :title="title" :bg-image="bgImage" :songs="songs"></v-music-list>
</transition>

</template>

<script>
import { SongList } from '../api/index'
import musicList from '../components/musicList'
export default {
    
  name: 'singer-detail',
  components: {
    'v-music-list': musicList,
  },
  data() {
    return {
      songs: [],
      bgImage: '',
      title: '',
    }
  },
  mounted() {
    //   alert(1)
    this._getSongList()
  },
  methods: {
   async _getSongList() {
      if (!this.$route.params.id) {
        this.$router.push('/singer')
        return
      }
        //  Indicator.open()
        let res = await SongList(this.$route.params.id)
       
            this.songs = res.playlist.tracks
            this.bgImage = res.playlist.coverImgUrl
            this.title = res.playlist.name
    },
  },
  beforeRouteEnter:(to,from,next)=>{
    //    this._getSingerMusciList()
        next(vm=>{
            vm._getSongList()
        })
    }

}
</script>

<style scoped lang="scss">

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>