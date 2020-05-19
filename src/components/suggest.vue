<template>
  <v-scroll
    ref="suggest"
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
   
  >
    <ul class="suggest-list">
      <li class="suggest-item" @click="addToPlaying(item)" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i class="icon">&#xe641;</i>
        </div>
        <div class="name">
          <p class="text" >{{item.name}}-{{item.artists[0].name}}</p>
        </div>
      </li>
      <loading v-show="hasMore" class="loading-wraper"></loading>
    </ul>
    <div v-show="!hasMore&&!result.length" class="no-result-wrapper">
      <span>抱歉，暂无搜索结果</span>
    </div>
  </v-scroll>
</template>

<script type="text/ecmascript-6">
import scroll from '@/components/scroll'
import load from '@/components/load'
import api from '@/api'


import { playerMixin } from '@/common/js/mixin'
import { mapGetters, mapActions, mapMutations } from "vuex";
import { MusicUrl } from '../api/index'


export default {
  name: 'suggest',
  mixins:['playerMixin'],
  props: {
    query: {
      type: String,
      default: ''
    },
    result:{
        type:Array,
        default:[]
    }
  },
  data() {
    return {

      pullup: true,
      beforeScroll: true,
      hasMore: true
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    ...mapActions(['selectPlaySong','addPlayList']),
    addToPlaying(song){
        this.selectPlaySong(song)
    }
  },
    created(){
        // console.log(this.result+'内部。。。。。')
    },
  watch: {
   
  },
  components: {
    'v-scroll': scroll,
    'loading':load
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/function.scss";
.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 px2rem(60px);
    padding-bottom: px2rem(200px);
    .suggest-item {
      display: flex;
      align-items: center;
      line-height: px2rem(80px)
    }

    .icon {
      flex: 0 0 px2rem(60px);
      width: px2rem(60px);
      font-size: .875rem;
      color: hsla(0,0%,100%,.3);
    }

    .name {
      flex: 1;
      font-size: .875rem;
      color: hsla(0,0%,100%,.3);
      overflow: hidden;

      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .loading-wraper {
      height: px2rem(80px);
    }
  }
  

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateX(20%);
    span {
      font-size: .875rem;
      color: hsla(0,0%,100%,.3);
    }
  }
}
</style>