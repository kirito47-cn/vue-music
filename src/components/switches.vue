<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in switches"
      :key="index"
      :class="{'active': currentIndex === index}"
      @click="switchItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    switches: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang="scss">
.switches {
  display: flex;
  align-items: center;
  width: 15rem;
  margin: 0 auto;
  border: 1px solid #2f3054;
  border-radius: .3125rem;
  .switch-item {
    flex: 1;
    padding: .5rem;
    text-align: center;
    font-size: .875rem;
    color: hsla(0,0%,100%,.3);
    &.active {
      background: #2f3054;
      color: #fff;
    }
  }
}
</style>