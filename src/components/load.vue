<template>
  <div class="loading-container">
    <img src="../assets/img/load.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'
export default {
  name: COMPONENT_NAME
}
</script>
<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }
}
</style>