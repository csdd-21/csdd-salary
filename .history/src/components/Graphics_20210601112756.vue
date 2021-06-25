<template>
  <div class="graphics" id="graphics">this is graphics page</div>
</template>

<script>
import * as echarts from "echarts";
var chartDom = document.getElementById("graphics");
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
    
  },
};
</script>

<style lang="less" scoped>
.graphics {
  height: 200px;
  width: 200px;
}
</style>
