<template>
  <div class="graphics">
    <el-select v-model="se" placeholder="请选择">
      <el-option v-for="item in yearArr" :key="item.value" :label="item.label" :value="checked.year"> </el-option>
    </el-select>
    <el-select v-model="value1" multiple placeholder="请选择">
      <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="checked.types"> </el-option>
    </el-select>
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
    return {
      yearArr: [
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2020",
          label: "2020",
        },
        {
          value: "2021",
          label: "2021",
        }
      ],
      typeArr:[
        {
          value: "rent",
          label: "房租",
        },
        {
          value: "utilities",
          label: "水电费",
        },
        {
          value: "shop",
          label: "购物",
        },
        {
          value: "deposit",
          label: "存款",
        },
      ],
      checked:{
        year:"",
        types:[]
      }
    };
  },
  watch: {
    checked: {
      handler(newVal, oldVal) {
        console.log('checked ---',newVal);
        
      },
      immediate: false,
      deep: true,
    },
  },
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
  // display: flex;
  // justify-content: center;
  .one {
    height: 400px;
    width: 600px;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
