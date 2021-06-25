<template>
  <div class="graphics">
    <el-select v-model="checked.types" multiple placeholder="请选择">
      <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <div class="wrapper">
      <div id="one"></div>
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
      lists: {},
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
    year(val) {
      console.log("change year --", val);
      this.get_datas();
    },
  },
  computed: {
    ...mapState({
      year: (state) => state.year,
    }),
  },
  methods: {
    set_graphics() {
      let series = this.set_series();

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
        series: series,
      };

      option && myChart.setOption(option);
    },

    set_series() {
      let realSalary_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let rent_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let utilities_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let shop_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let deposit_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      let series = [
        {
          data: { value: realSalary_arr, name: "访问来源" },
          type: "line",
          smooth: true,
        },
        {
          data: rent_arr,
          type: "line",
          smooth: true,
        },
        {
          data: utilities_arr,
          type: "line",
          smooth: true,
        },
        {
          data: shop_arr,
          type: "line",
          smooth: true,
        },
        {
          data: deposit_arr,
          type: "line",
          smooth: true,
        },
      ];

      this.lists[this.year].forEach((i) => {
        realSalary_arr[Number(i.month) - 1] = i.realSalary;
        rent_arr[Number(i.month) - 1] = i.rent;
        utilities_arr[Number(i.month) - 1] = i.utilities;
        shop_arr[Number(i.month) - 1] = i.shop;
        deposit_arr[Number(i.month) - 1] = i.deposit;
      });

      console.log("series --", series);
      return series;
    },

    get_datas() {
      if (localStorage.hasOwnProperty(this.year) == false) {
        this.lists[this.year] = [];
      } else {
        this.lists[this.year] = JSON.parse(localStorage.getItem(this.year));
      }
      this.set_graphics();
    },
  },
  created() {},
  mounted() {
    console.log(" this is graphics page !!");
    this.get_datas();
  },
};
</script>

<style lang="less" scoped>
.graphics {
  height: 100%;
  width: 100%;
  .wrapper {
    display: flex;
    justify-content: center;
    #one {
      height: 400px;
      width: 600px;
    }
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
