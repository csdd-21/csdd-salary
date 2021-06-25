<template>
  <div class="home">
    <h3>个人消费清单平台 Personal Consumption List Platform</h3>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="表格" name="first">表格</el-tab-pane>
      <el-tab-pane label="趋势图" name="second">趋势图</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeName: "first",
    };
  },
  watch: {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  h3 {
    text-align: center;
    padding-right: 20px;
  }
}
</style>
