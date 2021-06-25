<template>
  <div class="home">
    <div class="head">
      <h3>Personal Consumption List Platform 个人消费清单平台</h3>
      <el-select v-model="year" @change="changeYear">
        <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
      </el-select>
    </div>

    <el-tabs v-model="activeTab" type="border-card" @tab-click="clickTab">
      <el-tab-pane label="表格" name="first">
        <el-button size="mini" type="primary" @click="click_add">新增</el-button>
        <el-form :model="form">
          <el-table :data="lists[year]" highlight-current-row style="width: 100%" stripe>
            <el-table-column prop="month" label="月份" width="120">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.month }}
                </template>
                <template v-else>
                  <el-form-item>
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
                  <el-form-item>
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
                  <el-form-item>
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
                  <el-form-item>
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
                  <el-form-item>
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
                  <el-form-item>
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
                  <el-form-item>
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
import { mapState, mapMutations, mapActions } from "vuex";
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
      year: "2019",
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
        // {
        //   value: 1,
        //   label: 1,
        //   disabled: false,
        // },
        // {
        //   value: 2,
        //   label: 2,
        //   disabled: false,
        // },
        // {
        //   value: 3,
        //   label: 3,
        //   disabled: false,
        // },
        // {
        //   value: 4,
        //   label: 4,
        //   disabled: false,
        // },
        // {
        //   value: 5,
        //   label: 5,
        //   disabled: false,
        // },
        // {
        //   value: 6,
        //   label: 6,
        //   disabled: false,
        // },
        // {
        //   value: 7,
        //   label: 7,
        //   disabled: false,
        // },
        // {
        //   value: 8,
        //   label: 8,
        //   disabled: false,
        // },
        // {
        //   value: 9,
        //   label: 9,
        //   disabled: false,
        // },
        // {
        //   value: 10,
        //   label: 10,
        //   disabled: false,
        // },
        // {
        //   value: 11,
        //   label: 11,
        //   disabled: false,
        // },
        // {
        //   value: 12,
        //   label: 12,
        //   disabled: false,
        // },
      ],
      newItem: {
        month: "",
        realSalary: "",
        rent: "",
        utilities: "",
        shop: "",
        remark: "",
        deposit: "",
        action: "edit",
      },
      form: {},
      itemClone: {},
      rule: [{ validator: rule, trigger: "blur" }],
      // ruleArr: [true, true, true, true],
      // itemRule: {},
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
    }),
  },
  watch: {
    ruleArr(val) {
      // console.log("ruleArr ---", val);
    },
    lists(val) {
      console.log("vuex lists ---", val);
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
    set_datas() {
      this.axios
        .get("/2019.json")
        .then((res) => {
          localStorage.setItem("2019", JSON.stringify(res.data["2019"]));
          this.lists["2019"] = res.data["2019"];
        })
        .catch(function (err) {})
        .then(function () {});

      this.axios
        .get("/2020.json")
        .then((res) => {
          localStorage.setItem("2020", JSON.stringify(res.data["2020"]));
          this.lists["2020"] = res.data["2020"];
        })
        .catch(function (err) {})
        .then(function () {});

      this.axios
        .get("/2021.json")
        .then((res) => {
          localStorage.setItem("2021", JSON.stringify(res.data["2021"]));
          this.lists["2021"] = res.data["2021"];
        })
        .catch(function (err) {
          console.log("err", err);
        })
        .then(function () {});
    },

    changeYear() {
      this.get_datas();
    },

    set_monthArr() {
      let tempArr = [];
      this.lists[this.year].forEach((i) => {
        if (i.month) {
          tempArr.push(i.month);
        }
      });
      for (let i = 1; i < 13; i++) {
        if (tempArr.indexOf(i) !== -1) {
          this.monthArr.push({
            value: i,
            label: i,
            disabled: true,
          });
        } else {
          this.monthArr.push({
            value: i,
            label: i,
            disabled: false,
          });
        }
      }
    },

    get_datas() {
      if (localStorage.hasOwnProperty(this.year) == false) {
        let obj = [
          {
            month: 1,
            realSalary: "",
            rent: "",
            utilities: "",
            shop: "",
            remark: "test data",
            deposit: "",
            action: "view",
          },
        ];
        localStorage.setItem(this.year, JSON.stringify(obj));
      }
      this.lists[this.year] = JSON.parse(localStorage.getItem(this.year));
      this.set_monthArr();
    },

    click_add() {
      this.lists[this.year].push(JSON.parse(JSON.stringify(this.newItem)));
    },

    click_edit(item, index) {
      this.itemClone[index] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      console.log("click_save index---", index);
      item.action = "view";
      this.lists[this.year][index] = item;
      localStorage.setItem(this.year, JSON.stringify(this.lists[this.year]));
      this.set_monthArr();
      console.log("vuex lists ---", this.lists);
    },

    click_cancle(item, index) {
      this.lists[this.year][index].action = "view";
      if (this.itemClone[index]) {
        this.itemClone[index].action = "view";
        this.lists[this.year][index] = this.itemClone[index];
        localStorage.setItem(this.year, JSON.stringify(this.lists[this.year]));
      }
    },

    click_delete(item, index) {
      this.$confirm("确定删除第" + index + "数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.lists[this.year].splice(index, 1);
          localStorage.setItem(this.year, JSON.stringify(this.lists[this.year]));
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    // this.set_datas();
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
