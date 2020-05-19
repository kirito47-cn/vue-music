<template>
  <v-scroll
    class="list-view"
    :data="data"
    ref="listView"
    :listenScroll="listenScroll"
    :probeType="probeType"
    click:true
  >
    <ul>
      <li v-for="group in data" class="list-group" :key="group.key" ref="listGroup">
        <h2 class="list-group-title"> {{group.title}} </h2>
        <ul>
          <li @click="selectItem(item)" class="list-group-item" v-for="item in group.items" :key="item.key">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name"> {{item.name}} </span>
          </li>
        </ul>
      </li>
    </ul>


   
  </v-scroll>
</template>

<script>
import scroll from "@/components/scroll";
// import {mapActions,mapGetters} from 'vuex'
export default {
name: 'singer-list',
  created() {
    this.touch = {}
    this.listenScroll = true
    // this.listHeight = []
    this.probeType = 1
    this.click = true
  },
  data() {
    return {
      // scrollY: -1,
      // currentIndex: 0,
      // diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods:{
    selectItem(item){
        this.$emit('select',item)
    }
  },
  components: {
    "v-scroll": scroll
  }
};
</script>

<style lang="scss" scoped>
.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: #222;
  .list-group {
    padding-bottom: 1.875rem;
    .list-group-title {
      height: 1.875rem;
      line-height: 1.875rem;
      padding-left: 1.25rem;
      font-size: .75rem;
      color: rgba(255, 255, 255, 0.5);
      background: #262c50;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 1.25rem 0 0 1.875rem;
      .avatar {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 50%;
      }
      .name {
        margin-left: 1.25rem;
        color: rgba(255, 255, 255, 0.5);
        font-size: .875rem;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    padding: 1.25rem 0;
    border-radius: .625rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
    .item {
      padding: .1875rem;
      line-height: 1;
      color: rgba(255, 255, 255, 0.5);
      font-size: .75rem;
      &.current {
        color: #ea2448;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .fixed-title {
    height: 1.875rem;
    line-height: 1.875rem;
    padding-left: 1.25rem;
    font-size: .75rem;
    color: rgba(255, 255, 255, 0.5);
    background: #262c50;
  }
  // .loading-container {
  //   position: absolute;
  //   width: 100%;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
}
</style>