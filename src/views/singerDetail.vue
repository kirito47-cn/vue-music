<template>
<transition name="slide">
    <v-music-list :title="title" :bg-image="bgImage" :songs="songs"></v-music-list>
</transition>

</template>

<script>
import { SingerMusciList } from '../api/index'
import musicList from '../components/musicList'
import { Indicator } from 'mint-ui';
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
    this._getSingerMusciList()
  },
  methods: {
   async _getSingerMusciList() {
      if (!this.$route.params.id) {
        this.$router.push('/singer')
        return
      }
        //  Indicator.open()
        let res = await SingerMusciList(this.$route.params.id)
       
            this.songs = res.hotSongs
            this.bgImage = res.artist.img1v1Url
            this.title = res.artist.name
    },
  },
  beforeRouteEnter:(to,from,next)=>{
    //    this._getSingerMusciList()
        next(vm=>{
            vm._getSingerMusciList()
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