<template>
  <div class="home">
    <div class="head">
      <div class="left">
        <span class="iconfont icon-yonghu"></span>
        <span class="iconfont icon-zhongwen" @click="change_language" v-if="$i18n.locale == 'cn'"></span>
        <span class="iconfont icon-yingwen" @click="change_language" v-if="$i18n.locale == 'en'"></span>
        <span class="iconfont icon-theme-palette-fill"></span>
        <span class="iconfont icon-shezhi"></span>
      </div>
      <div class="right">
        <h3>Personal Consumption List Platform 个人消费清单平台</h3>
        <el-select v-model="yearParam" @change="changeYear">
          <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
        </el-select>
      </div>
    </div>

    <el-tabs v-model="activeTab" type="border-card" @tab-click="clickTab">
      <el-tab-pane :label="$t('tab.table')" name="home">
        <el-button size="mini" type="primary" @click="click_add">{{ $t("btn.add") }}</el-button>
        <!-- <el-button size="mini" type="primary" @click="click_sort">排序</el-button> -->
        <el-form :model="form">
          <el-table ref="table" :data="lists[year]" stripe>
            <el-table-column prop="month" :label="$t('month')" width="120">
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

            <el-table-column prop="realSalary" :label="$t('realSalary')">
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

            <el-table-column prop="rent" :label="$t('rent')">
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

            <el-table-column prop="utilities" :label="$t('utilities')">
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

            <el-table-column prop="shop" :label="$t('shop')">
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

            <el-table-column prop="deposit" :label="$t('deposit')">
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

            <el-table-column prop="remark" :label="$t('remark')">
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

            <el-table-column prop="operation" :label="$t('action')">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  <el-button size="mini" @click="click_edit(scope.row, scope.$index)">{{ $t("btn.edit") }}</el-button>
                  <el-button size="mini" @click="click_delete(scope.row, scope.$index)">{{ $t("btn.delete") }}</el-button>
                </template>
                <template v-else>
                  <el-button size="mini" @click="click_save(scope.row, scope.$index)">{{ $t("btn.save") }}</el-button>
                  <el-button size="mini" @click="click_cancle(scope.row, scope.$index)">{{ $t("btn.cancle") }}</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('tab.graphics')" name="graphics">
        <router-view name="graphics" />
      </el-tab-pane>
      <el-tab-pane :label="$t('tab.more')" name="more">
        <router-view name="more" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { json } from "body-parser";
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
      activeTab: "home",
      yearParam: "2020",
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
      monthArr: [],
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
      order: "descending",
      rule: [{ validator: rule, trigger: "blur" }],
      // ruleArr: [true, true, true, true],
      // itemRule: {},
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
      year: (state) => state.year,
    }),
  },
  watch: {
    ruleArr(val) {
      // console.log("ruleArr ---", val);
    },
    activeTab(val) {
      if (val == "home") {
        this.$router.push("/home");
        sessionStorage.setItem("activeTab", JSON.stringify("home"));
      }
      if (val == "graphics") {
        this.$router.push({ name: "graphics" });
        sessionStorage.setItem("activeTab", JSON.stringify("graphics"));
      }
      if (val == "more") {
        this.$router.push({ name: "more" });
        sessionStorage.setItem("activeTab", JSON.stringify("more"));
      }
    },
  },
  methods: {
    ...mapMutations(["CHANGE_YEAR", "SET_LISTS"]),

    change_language() {
      let locales = ["cn", "en"];
      this.$i18n.locale = locales[2 - (Number(locales.indexOf(this.$i18n.locale)) + 1)];
    },

    clickTab(tab, event) {
      switch (tab.index) {
        case 0:
          this.activeTab = "home";
          break;
        case 1:
          this.activeTab = "graphics";
          break;
        case 2:
          this.activeTab = "more";
          break;
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
      this.CHANGE_YEAR(this.yearParam);
      this.get_datas();
    },

    set_monthArr() {
      this.monthArr = [];
      let tempArr = [];
      this.lists[this.year].forEach((i) => {
        if (i.month) {
          tempArr.push(Number(i.month));
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

    click_sort() {
      // 排序会影响add或者edit数据，因此暂时禁用，以后在解决
      // let arr = ["descending", "ascending"];
      // this.order = arr[2 - (Number(arr.indexOf(this.order)) + 1)];
      // this.$refs.table.sort("month", this.order);
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
      function isEmpty() {
        let i = 0;
        for (let key in item) {
          if (!item[key]) {
            i++;
          }
        }
        if (i == 7) {
          return true;
        }
        return false;
      }
      if (isEmpty()) {
        this.lists[this.year].pop();
        return;
      }

      this.lists[this.year][index].action = "view";
      if (this.itemClone[index]) {
        this.itemClone[index].action = "view";
        this.lists[this.year][index] = this.itemClone[index];
        localStorage.setItem(this.year, JSON.stringify(this.lists[this.year]));
      }
    },

    click_delete(item, index) {
      this.$confirm("确定删除第" + (index + 1) + "数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.lists[this.year].splice(index, 1);
          localStorage.setItem(this.year, JSON.stringify(this.lists[this.year]));
          this.set_monthArr();
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    // this.set_datas();
    if (sessionStorage.hasOwnProperty("activeTab") == false) {
      sessionStorage.setItem("activeTab", JSON.stringify("home"));
    } else {
      this.activeTab = JSON.parse(sessionStorage.getItem("activeTab"));
    }
    this.get_datas();
    console.log("language 11", this.$i18n.locale);
  },
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .head {
    background-color: rgba(89, 170, 249, 0.4);
    position: fixed;
    display: flex;
    justify-content: space-between;
    height: 42px;
    width: 100%;
    z-index: 2;
    .left {
      line-height: 42px;
      padding-left: 20px;
      span {
        padding-right: 10px;
        cursor: pointer;
      }
    }
    .right {
      line-height: 42px;
      padding-right: 20px;
      h3 {
        display: inline;
        text-align: right;
        padding-right: 20px;
      }
      .el-select {
        width: 80px;
      }
      .el-select /deep/ .el-input .el-input__inner {
        height: 26px;
        line-height: 26px;
        margin: 0;
        padding: 0;
        padding-left: 8px;
      }
    }
  }
  .el-tabs {
    z-index: 1;
    padding-top: 42px;
  }
}
</style>
