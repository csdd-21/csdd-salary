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
@import url("./assets/allCss/App.less");
// 消息提示
@color: rgb(135, 137, 138);
@bgColor: rgb(223, 236, 242);
.info {
  background-color: fade(@bgColor, 25%);
  color: @bgColor;
  border-color: fade(@color, 50%);
}
</style>
