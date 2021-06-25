<template>
  <div class="graphics">
    <el-select v-model="checked.types" multiple placeholder="请选择">
      <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <div>
      <div class="one" id="one"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import * as echarts from "echarts";
export default {
  name: "Graphics",
  components: {},
  props: {},
  data() {
    return {
      typeArr: [
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
      checked: {
        types: [],
      },
    };
  },
  watch: {
    checked: {
      handler(newVal, oldVal) {
        console.log("checked ---", newVal);
      },
      immediate: false,
      deep: true,
    },
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
    }),
  },
  methods: {},
  created() {},
  mounted() {
    var chartDom = document.getElementById("one");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: "category",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
  // .el-dropdown {
  //   vertical-align: top;
  // }
  // .el-dropdown + .el-dropdown {
  //   margin-left: 15px;
  // }
  // .el-icon-arrow-down {
  //   font-size: 12px;
  // }
}
</style>
