<template>
  <div class="search" ref="search">
    <div class="search-box-wrapper">
      <div class="search-box">
        <i class="icon icon-search">&#xe638;</i>
        <input ref="query" v-model="query" class="box" :placeholder="placeholder" />
        <i @click="clear" v-show="query" class="icon icon-dismiss">&#xe656;</i>
      </div>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <div class="hot-key">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li class="item"  v-for="(item, index) in hotKey" @click="addQuery(item.first)" :key="index">
            <span>{{item.first}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <v-suggest  ref="suggest" :query="query" :result='result'></v-suggest>
    </div>
  </div>
</template>

<script>
import { debounce } from "../common/js/util";
import suggest from '../components/suggest'
import { HotSearchKey,MusicSearch } from "../api/index";
const limit = 20;
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  components:{
      "v-suggest":suggest
  },
  data() {
    return {
      query: "",
      hotKey: [],
      page:1,
      result:[]
    };
  },
  methods: {
    clear() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    },
    blur() {
      this.$refs.query.blur();
    },
    addQuery(query){
       this.setQuery(query)
    },
    async _getHotKey() {
      this.limit = 10;
      let result = await HotSearchKey(this.limit);
      this.hotKey = result.result.hots;
    },
    async _getKeyWordSongs(page,query){
        const params = {
            limit,
            offset: page - 1,
            keywords: query
        }
        let res = await MusicSearch(params)
        this.result = res.result.songs
     
    }
  },
  mounted() {
    this._getHotKey();
  },
  created() {
    this.$watch(
      "query",
      debounce(newQuery => {
          if(newQuery.trim()){
                 this._getKeyWordSongs(this.page,newQuery)
          }
       
      }, 200)
    );
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/css/function.scss";
.search {
  overflow: hidden;
  .search-box-wrapper {
    margin: px2rem(40px);
    
    .search-box {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 px2rem(8px);
        height: px2rem(74px);
        background: #2f3054;
        border-radius: .375rem;
        .icon-search {
        font-size: 1.5rem;
        color: #6b6a6a;
        }
        .box {
        flex: 1;
        margin: 0 .3125rem;
        line-height: px2rem(36px);
        background: #2f3054;
        color: #fff;
        font-size: .875rem;
        outline: 0;
        &::placeholder {
            color: hsla(0, 0%, 100%, 0.3);
        }
        }
        .icon-dismiss {
        font-size: 1.25rem;
        margin-right: px2rem(10px);
        color: #6b6a6a;
        }
  }
  }
  .shortcut-wrapper {
    position: fixed;
    top: px2rem(360px);
    bottom: 0;
    width: 100%;
    .hot-key{
        margin: 0 px2rem(40px) px2rem(40px) px2rem(40px);
        .title {
          margin-bottom: px2rem(40px);
          font-size: .875rem;
          color: hsla(0,0%,100%,.5);
        }
        .item {
          display: inline-block;
          padding: px2rem(10px) px2rem(20px);
          margin: 0 px2rem(20px) px2rem(20px) 0;
          border-radius: 6px;
          background: #2f3054;
          font-size: .875rem;
          color: hsla(0,0%,100%,.3);
        }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: px2rem(360px);
    bottom: 0;
  }
}
</style>