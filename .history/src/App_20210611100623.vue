<template>
  <div id="app">
    <router-view />
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
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}
body {
  #app {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
</style>
