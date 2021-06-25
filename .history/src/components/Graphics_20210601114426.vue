<template>
  <div class="graphics">
    <el-dropdown>
      <el-button type="primary" size="mini"> 年份<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>2019</el-dropdown-item>
          <el-dropdown-item>2020</el-dropdown-item>
          <el-dropdown-item>2021</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-button type="primary" size="mini"> 类型<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group></el-dropdown-item>
          
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="one" id="one"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "Graphics",
  components: {},
  props: {},
  data() {
    return {
       checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
    };
  },
  watch: {},
  computed: {},
  methods: {
     handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
  },
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
