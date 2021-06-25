<template>
  <div class="graphics">
    <el-button
      @click="
        show.one = true;
        show.two = false;
      "
      >折图形</el-button
    >
    <el-button
      @click="
        show.one = false;
        show.two = true;
      "
      >饼图</el-button
    >
    <div class="wrapper">
      <div id="one" v-show="show.one"></div>
      <div id="two" v-show="show.two"></div>
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
      show: {
        one: false,
        two: true,
      },
    };
  },
  watch: {
    year(val) {
      console.log("666");

      this.get_datas();
    },
    "$i18n.locale"(newVal, oldVal) {
      // this.set_graphics();
    },
  },
  computed: {
    ...mapState({
      year: (state) => state.year,
    }),
  },
  methods: {
    ...mapMutations(["CHANGE_YEAR"]),

    set_graphics_1() {
      let { legend, series } = this.set_series_1();

      let chartDom = document.getElementById("one");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        legend: legend,
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

    set_series_1() {
      let legend = {
        data: [this.$t("realSalary"), this.$t("rent"), this.$t("utilities"), this.$t("shop"), this.$t("deposit")],
      };
      let realSalary_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let rent_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let utilities_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let shop_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let deposit_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      let series = [
        { name: this.$t("realSalary"), data: realSalary_arr, type: "line", smooth: true },
        { name: this.$t("rent"), data: rent_arr, type: "line", smooth: true },
        { name: this.$t("utilities"), data: utilities_arr, type: "line", smooth: true },
        { name: this.$t("shop"), data: shop_arr, type: "line", smooth: true },
        { name: this.$t("deposit"), data: deposit_arr, type: "line", smooth: true },
      ];

      console.log("333", this.lists[this.year]);

      this.lists[this.year].forEach((i) => {
        realSalary_arr[Number(i.month) - 1] = Number(i.realSalary);
        rent_arr[Number(i.month) - 1] = Number(i.rent);
        utilities_arr[Number(i.month) - 1] = Number(i.utilities);
        shop_arr[Number(i.month) - 1] = Number(i.shop);
        deposit_arr[Number(i.month) - 1] = Number(i.deposit);
      });
      return { legend, series };
    },
    set_graphics_2() {
      let chartDom = document.getElementById("two");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    get_datas() {
      if (localStorage.hasOwnProperty(this.year) == false) {
        this.lists[this.year] = [];
      } else {
        this.lists[this.year] = JSON.parse(localStorage.getItem(this.year));
      }
      this.set_graphics_1();
    },
  },
  created() {},
  mounted() {
    this.CHANGE_YEAR(JSON.parse(sessionStorage.getItem("year")));
    this.get_datas();
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Graphics.less");
</style>
