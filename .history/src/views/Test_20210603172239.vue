<template>
  <div class="wrapper">
    <div class="top">this is test page !!</div>
    <div class="one">11111111111111111</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
}
.top {
  height: 100px;
  width: 100%;
  background-color: green;
  position: fixed;
}
.one {
  height: 1000px;
  width: 100%;
  background-color: gray;
}
</style>
