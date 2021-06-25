<template>
  <div class="home">
    <div class="head">
      <h3>Personal Consumption List Platform 个人消费清单平台</h3>
      <el-select v-model="year" placeholder="请选择">
        <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
      </el-select>
    </div>

    <el-tabs v-model="activeTab" type="border-card" @tab-click="clickTab">
      <el-tab-pane label="表格" name="first">
        <el-button size="mini" type="primary" @click="click_add">新增</el-button>
        <el-form :model="form">
          <el-table :data="form.datas" highlight-current-row style="width: 100%" stripe>
            <el-table-column prop="month" label="月份" width="120">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.month }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.month'">
                    <el-select v-model="scope.row.month" placeholder="">
                      <el-option v-for="i in monthArr" :key="i.value" :label="i.label" :value="i.value" :disabled="i.disabled"> </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="realSalary" label="税后月薪">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.realSalary }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.realSalary'">
                    <el-input size="mini" v-model.number="scope.row.realSalary" style="width: 120px"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="rent" label="房租">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.rent }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.rent'">
                    <el-input size="mini" v-model.number="scope.row.rent" style="width: 120px"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="utilities" label="水电费">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.utilities }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.utilities'">
                    <el-input size="mini" v-model.number="scope.row.utilities" style="width: 120px"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="shop" label="购物+其它">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.shop }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.shop'">
                    <el-input size="mini" v-model.number="scope.row.shop" style="width: 120px"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="deposit" label="存款">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.deposit }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.deposit'">
                    <el-input size="mini" v-model.number="scope.row.deposit" style="width: 120px"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="remark" label="备注">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.remark }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.remark'">
                    <el-input size="mini" v-model.trim="scope.row.remark" style="width: 120px"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="operation" label="操作">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  <el-button size="mini" @click="click_edit(scope.row, scope.$index)">编辑</el-button>
                  <el-button size="mini" @click="click_delete(scope.row, scope.$index)">删除</el-button>
                </template>
                <template v-else>
                  <el-button size="mini" @click="click_save(scope.row, scope.$index)">保存</el-button>
                  <el-button size="mini" @click="click_cancle(scope.row, scope.$index)">取消</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="趋势图" name="second">
        <router-view />
      </el-tab-pane>
      <el-tab-pane label="更多" name="third">
        <router-view />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    const rule = (rule, value, callback) => {
      // console.log("rule", rule);
      if (!value) {
        return callback(new Error("请输入金额"));
      } else if (!value.match(/^[0-9]*$/g)) {
        return callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      activeTab: "first",
      year: "2021",
      yearArr: [
        {
          value: "2019",
          label: "2019年",
        },
        {
          value: "2020",
          label: "2020年",
        },
        {
          value: "2021",
          label: "2021年",
        },
      ],
      monthArr: [
        {
          value: "1",
          label: "1",
          disabled: true,
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
        {
          value: "7",
          label: "7",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "9",
          label: "9",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "11",
          label: "11",
        },
        {
          value: "12",
          label: "12",
        },
      ],
      form: {
        datas: [],
        data: {
          month: "",
          realSalary: "",
          rent: "",
          utilities: "",
          shop: "",
          remark: "",
          deposit: "",
          action: "edit",
        },
        rule: [{ validator: rule, trigger: "blur" }],
      },
      itemClone: {},
      // itemRule: {},
      // ruleArr: [true, true, true, true],
    };
  },
  watch: {
    ruleArr(val) {
      // console.log("ruleArr ---", val);
    },
  },
  methods: {
    clickTab(tab, event) {
      if (tab.index == 0) {
        this.$router.push("/home");
      }
      if (tab.index == 1) {
        this.$router.push("/graphics");
      }
      if (tab.index == 2) {
        this.$router.push("/more");
      }
    },

    //做数字校验步骤较多繁琐，暂时用v-model.number替代
    // validateField(item, index) {},
    // @change="change(scope.$index, 2, scope.row.utilities)"
    // change(index, i, val) {
    //   if (isNaN(Number(val))) {
    //     this.ruleArr[i] = false;
    //   } else {
    //     this.ruleArr[i] = true;
    //   }
    // },

    get_datas() {
      this.axios
        .get("../assets/datas.json")
        .then((res) => {
          console.log("res --", res);
        })
        .catch(function (err) {
          console.log("err", err);
        })
        .then(function () {});

      if (localStorage.hasOwnProperty("costs") == false) {
        let obj = [
          {
            month: 1,
            realSalary: "1",
            rent: "1",
            utilities: "1",
            shop: "1",
            remark: "",
            deposit: "",
            action: "view",
          },
        ];
        localStorage.setItem("costs", JSON.stringify(obj));
      }
      this.form.datas = JSON.parse(localStorage.getItem("costs"));
    },

    click_add() {
      this.form.datas.push(JSON.parse(JSON.stringify(this.form.data)));
    },

    click_edit(item, index) {
      this.itemClone[index] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      console.log("click_save ---", index);

      // if (this.ruleArr.indexOf(false) !== -1) {
      //   return;
      // }

      item.action = "view";
      this.form.datas[index] = item;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
    },

    click_cancle(item, index) {
      this.ruleArr = [true, true, true, true];
      this.form.datas[index].action = "view";
      if (this.itemClone[index]) {
        this.itemClone[index].action = "view";
        this.form.datas[index] = this.itemClone[index];
        localStorage.setItem("costs", JSON.stringify(this.form.datas));
      }
    },

    click_delete(item, index) {
      this.$confirm("确定删除第" + index + "数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.datas.splice(index, 1);
          localStorage.setItem("costs", JSON.stringify(this.form.datas));
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    this.get_datas();
  },
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  .head {
    text-align: right;
    padding: 10px 20px;
    h3 {
      display: inline;
      line-height: 40px;
      text-align: right;
      padding-right: 20px;
    }
    .el-select {
      width: 80px;
    }
    .el-select /deep/ .el-input .el-input__inner {
      margin: 0;
      padding: 0;
      padding-left: 8px;
    }
  }
}
</style>
