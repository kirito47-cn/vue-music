<template>
  <div class="recommend" ref="recommend">
    <!-- <h1 >recommend</h1> -->
    <v-scroll ref="scroll" class="recommend-content" :data="discList" :pullup="true" @scrollToEnd='scrollToEnd'>
      <div>
        <v-banner :imgList="bannerSrc"></v-banner>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              @click="selectItem(item)"
              v-for="(item, index) in discList"
              :key="index"
              class="item"
            >
              <div class="icon">
                <img  v-lazy="item.coverImgUrl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.description"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </v-scroll>
     <router-view></router-view>
  </div>
</template>

<script>
import slide from "../components/slide";
// import axios from 'axios'
import scroll from "@/components/scroll";
import banner from "@/components/banner";

import { getBanner, getDisc } from "../api/index";
export default {
  name: "recommend",
  data() {
    return {
      bannerSrc: [],
      discList: []
    };
  },
 async  mounted() {
    this.limit = 10;
    this._getBanner();
    this._getDiscList(this.limit);
    
  },
  components: {
    "v-slide": slide,
    "v-scroll": scroll,
    "v-banner": banner
  },
  methods: {
    async _getBanner() {
      let result = await getBanner();
      
      this.bannerSrc = result.banners;
    },
    async _getDiscList(params) {
      let descList = await getDisc(params);
      this.discList = descList.playlists;
    },
    selectItem(item){
      this.$router.push({
        path: `/recommend/${item.id}`
      })
    },
    scrollToEnd() {
      this.limit += 10;
      this._getDiscList(this.limit);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/function";
@import "../assets/css/function.scss";
.recommend {
  position: fixed;
  width: 100%;
  top: px2rem(176px);
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .recommend-list {
      .list-title {
        height: px2rem(120px);
        line-height: px2rem(130px);
        text-align: center;
        font-size: .875rem;
        color: #ea2448;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 px2rem(40px) px2rem(40px) px2rem(40px);
        img{
          width: 5rem;
          height: 5rem;
        }
        .icon {
          flex: 0 0 px2rem(120px);
          width: 7.5rem;
          padding-right: px2rem(40px);
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: px2rem(40px);
          overflow: hidden;
          font-size: .875rem;
          .name {
            margin-bottom: px2rem(20px);
            color: #fff;
          }
          .desc {
            color: hsla(0, 0%, 100%, 0.3);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>