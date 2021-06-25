<template>
  <div class="graphics">
    <el-radio-group v-model="show.active" @change="change_label">
      <el-radio-button label="line"> {{ $t("graphics.line") }} </el-radio-button>
      <el-radio-button label="pie"> {{ $t("graphics.pie") }} </el-radio-button>
    </el-radio-group>
    <div class="desc">
      {{ desc }}
    </div>
    <el-select v-model="month" v-show="show.two">
      <el-option v-for="i in monthArr" :label="i.label" :value="i.value" :key="i.value"> </el-option>
    </el-select>
    <div class="wrapper">
      <div id="one"></div>
    </div>
  </div>
</template>

<script>
var myChart;
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
        active: "",
        one: false,
        two: true,
      },
      desc: "",
      month: 1,
    };
  },
  watch: {
    year(val) {
      this.get_datas();
    },
    "$i18n.locale"(newVal, oldVal) {
      switch (this.show.active) {
        case "line":
          this.set_graphics_line();
          break;
        case "pie":
          this.set_graphics_pie();
          break;
      }
    },
    month(val) {
      this.set_graphics_pie();
    },
  },
  computed: {
    ...mapState({
      year: (state) => state.year,
    }),
    monthArr() {
      let arr = [];
      for (let i = 1; i < 13; i++) {
        arr.push({ label: i, value: i });
      }
      return arr;
    },
  },
  methods: {
    change_label(i) {
      switch (i) {
        case "line":
          this.show.one = true;
          this.show.two = false;
          this.set_graphics_line();
          sessionStorage.setItem("graphics", JSON.stringify("line"));
          break;
        case "pie":
          this.show.one = false;
          this.show.two = true;
          this.set_graphics_pie();
          sessionStorage.setItem("graphics", JSON.stringify("pie"));
          break;
      }
    },

    set_graphics_line() {
      console.log("set------line");

      this.desc = this.year.slice(0, 4) + "" + this.$t("graphics.desc_line");
      let { legend, series } = this.set_series_line();

      let chartDom = document.getElementById("one");
      if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
        this.myChart.dispose();
      }
      this.myChart = echarts.init(chartDom);

      let option = {
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

      option && this.myChart.setOption(option);
    },

    set_series_line() {
      let legend = {},
        series = [];

      let realSalary_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let rent_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let utilities_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let shop_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let deposit_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      this.lists[this.year].forEach((i) => {
        realSalary_arr[Number(i.month) - 1] = Number(i.realSalary);
        rent_arr[Number(i.month) - 1] = Number(i.rent);
        utilities_arr[Number(i.month) - 1] = Number(i.utilities);
        shop_arr[Number(i.month) - 1] = Number(i.shop);
        deposit_arr[Number(i.month) - 1] = Number(i.deposit);
      });

      legend = {
        orient: "vertical",
        right: "0",
        data: [this.$t("realSalary"), this.$t("rent"), this.$t("utilities"), this.$t("shop"), this.$t("deposit")],
      };
      series = [
        { name: this.$t("realSalary"), data: realSalary_arr, type: "line", smooth: true },
        { name: this.$t("rent"), data: rent_arr, type: "line", smooth: true },
        { name: this.$t("utilities"), data: utilities_arr, type: "line", smooth: true },
        { name: this.$t("shop"), data: shop_arr, type: "line", smooth: true },
        { name: this.$t("deposit"), data: deposit_arr, type: "line", smooth: true },
      ];

      return { legend, series };
    },

    set_graphics_pie() {
      console.log("set------pie");

      this.desc = this.year.slice(0, 4) + this.$t("graphics.desc_pie");
      let chartDom = document.getElementById("one");

      if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
        this.myChart.dispose(); //销毁
      }
      this.myChart = echarts.init(chartDom);

      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: "0",
        },
        series: [
          {
            name: this.year + this.month + "月",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.lists[this.year][this.month - 1].realSalary || 0, name: this.$t("realSalary") },
              { value: this.lists[this.year][this.month - 1].rent || 0, name: this.$t("rent") },
              { value: this.lists[this.year][this.month - 1].utilities || 0, name: this.$t("utilities") },
              { value: this.lists[this.year][this.month - 1].shop || 0, name: this.$t("shop") },
              { value: this.lists[this.year][this.month - 1].deposit || 0, name: this.$t("deposit") },
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
      option && this.myChart.setOption(option);
    },

    get_datas() {
      if (localStorage.hasOwnProperty(this.year) == false) {
        this.lists[this.year] = [];
      } else {
        this.lists[this.year] = JSON.parse(localStorage.getItem(this.year));
      }
      this.show.active == "line" ? this.set_graphics_line() : this.set_graphics_pie();
    },
  },
  created() {},
  mounted() {
    if (sessionStorage.hasOwnProperty("graphics") == false) {
      this.show.active = "line";
      sessionStorage.setItem("graphics", JSON.stringify("line"));
    } else {
      this.show.active = JSON.parse(sessionStorage.getItem("graphics"));
    }
    this.get_datas();
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Graphics.less");
</style>
