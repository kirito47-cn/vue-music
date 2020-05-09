<template>
  <div class="singer" ref="singer">
    <singer-list :data="singers" @select='selectSinger'></singer-list>
  </div>
</template>

<script>
import singerList from "@/components/singerList";

import { getSingerList } from "../api/index";
import Singer from '@/common/js/singer'
// import { playlistMixin } from '@/common/js/mixin'
import { getPinYinFirstCharacter } from '@/common/js/pinyin'
const MUSIC_SIZE = 300
const HOT_NAME = '热门'
export default {
  data() {
    return {
      singers: []
    };
  },
  components: {
    "singer-list": singerList
  },
  created() {
    this._getSinger();
  },
 
  methods: {
    async _getSinger() {
      let singers = await getSingerList();
      this.singers = this._normalizeSinger(singers.artists)
        // this.singers = singers.artists
    },
 selectSinger(singer) {
    this.$router.push({
      path: `/detail/${singer.id}`
    });
  },
  //对获得的歌手的数据进行拼音的排序
  _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (item.musicSize > MUSIC_SIZE) {
          map.hot.items.push(new Singer({
            name: item.name,
            id: item.id,
            avatar: item.img1v1Url
          }))
        }
        const key = getPinYinFirstCharacter((item.name).charAt(0), '', true);
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.name,
          id: item.id,
          avatar: item.img1v1Url
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }

  },
  
};
</script>

<style lang="scss" scoped >
@import "../assets/css/function.scss";
.singer {
  position: fixed;
  top: px2rem(176px);
  bottom: 0;
  width: 100%;
}
</style>