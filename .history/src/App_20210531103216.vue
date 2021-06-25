<template>
  <div id="app"></div>
  <router-view />
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
  margin: 0;
  padding: 0;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  #app {
    // height: 100%;
  }
}
</style>
