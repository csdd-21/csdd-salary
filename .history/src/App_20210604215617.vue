<template>
  <div id="app">
    <router-view style="height: 100%; width: 100%" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
html,
body {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
body {
  // background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  #app {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
</style>
