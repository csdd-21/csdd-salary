<template>
  <div class="graphics">
    <div class="one" id="one"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Graphics",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    var chartDom = document.getElementById("one");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
        {
          data: [820, 932, 901, 934, 1290, 1330, 2000],
          type: "line",
          smooth: true,
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style lang="less" scoped>
.graphics {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .one {
    height: 400px;
    width: 600px;
    // padding: 20px 0;
  }
}
</style>
