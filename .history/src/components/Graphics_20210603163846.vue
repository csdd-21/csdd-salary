<template>
  <div class="graphics">
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
    "$i18n.locale"(newValue) {
      console.log("newValue", newValue);
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
      let { legend, series } = this.set_series();

      var chartDom = document.getElementById("one");
      var myChart = echarts.init(chartDom);
      var option;

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

    set_series() {
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

      this.lists[this.year].forEach((i) => {
        realSalary_arr[Number(i.month) - 1] = Number(i.realSalary);
        rent_arr[Number(i.month) - 1] = Number(i.rent);
        utilities_arr[Number(i.month) - 1] = Number(i.utilities);
        shop_arr[Number(i.month) - 1] = Number(i.shop);
        deposit_arr[Number(i.month) - 1] = Number(i.deposit);
      });

      console.log("legend --", legend);
      console.log("series --", series);
      return { legend, series };
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
    console.log("language 22", this.$i18n.locale);
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
}
</style>
