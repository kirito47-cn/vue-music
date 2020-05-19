<template>
  <div class="rank" ref="rank">
    <!-- <h1>rank</h1> -->
    <v-scroll :data="rankList" class="ranklist" ref="ranklist">
      <ul>
        <li  @click="selectItem(item)" class="item" v-for="(item, i) in rankList" :class="itemClass(i)" :key="item.id">
          <div class="img">
            <img :src="item.coverImgUrl" alt />
          </div>
          <ul class="songlist" v-if="item.tracks.length > 0">
            <li class="song" v-for="(song, index) in item.tracks" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.first}}-{{song.second}}</span>
            </li>
          </ul>
          <div class="songlist" v-else>
            <div class="title">{{item.name}}</div>
            <div class="say">{{item.updateFrequency}}</div>
          </div>
        </li>
      </ul>
    </v-scroll>
  </div>
</template>

<script>
import { getRankList } from "../api/index";
import scroll from "@/components/scroll";
export default {
  name: "rank",
  data() {
    return {
      rankList: []
    };
  },
  created() {
    this._getRankList();
  },
  methods: {
    async _getRankList() {
      this.$showLoading();
      let rankList = await getRankList();
      this.$hideLoading();
      this.rankList = rankList.list;
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      });
    },
    itemClass() {
      const random = Math.floor(Math.random() * 4 + 1);
      const obj = {
        "1": "red",
        "2": "green",
        "3": "purple",
        "4": "blue"
      };
      return obj[random];
    }
  },
  watch: {
    rankList() {
      setTimeout(() => {
        this.$refs.ranklist.refresh();
      }, 20);
    }
  },
  components: {
    "v-scroll": scroll
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/css/function.scss";
.rank {
  position: fixed;
  width: 100%;
  top: px2rem(176px);
  bottom: 0;
  .ranklist {
    height: 100%;
    overflow: hidden;
    margin: 0 px2rem(20px);
    .item {
      height: px2rem(200px);
      margin-top: px2rem(20px);
      border-radius: px2rem(20px);
      display: flex;
      align-items: center;
      &.red {
        background: linear-gradient(
          -45deg,
          rgba(237, 46, 97, 0.5),
          rgba(237, 46, 97, 1)
        );
      }
      &.green {
        background: linear-gradient(
          -45deg,
          rgba(69, 196, 166, 0.5),
          rgba(69, 196, 166, 1)
        );
      }
      &.purple {
        background: linear-gradient(
          -45deg,
          rgba(122, 61, 253, 0.5),
          rgba(122, 61, 253, 1)
        );
      }
      &.blue {
        background: linear-gradient(
          -45deg,
          rgba(19, 122, 253, 0.5),
          rgba(19, 122, 253, 1)
        );
      }

      .img {
        width: px2rem(180px);
        height: px2rem(180px);
        border-radius: px2rem(10px);
        overflow: hidden;
        margin-left: px2rem(10px);
        img {
          width: 100%;
        }
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 px2rem(30px);
        color: hsla(0, 0%, 100%, 0.6);
        overflow: hidden;
        font-size: .75rem;
        .song {
          line-height: px2rem(50px);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .title {
          font-size: px2rem(38px);
          line-height: px2rem(60px);
          margin-bottom: px2rem(20px);
          color: rgba(255, 255, 255, 0.9);
        }
        .say {
          font-size: px2rem(26px);
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}
</style>