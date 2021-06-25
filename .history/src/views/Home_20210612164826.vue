<template>
  <div class="home">
    <div class="head">
      <div class="left">
        <el-dropdown>
          <span class="iconfont icon-yonghuming1"></span>
          <template #dropdown>
            <el-dropdown-menu class="user">
              <el-dropdown-item>{{ $t("changePwd") }}</el-dropdown-item>
              <el-dropdown-item>{{ $t("quit") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="iconfont icon-zhongwen" @click="change_language" v-if="$i18n.locale == 'cn'"></span>
        <span class="iconfont icon-yingwen" @click="change_language" v-if="$i18n.locale == 'en'"></span>
        <el-dropdown>
          <span class="iconfont icon-theme-palette-fill"></span>
          <template #dropdown>
            <el-dropdown-menu class="theme" @click="click_theme">
              <el-dropdown-item class="one">Bright</el-dropdown-item>
              <el-dropdown-item class="two">Warm</el-dropdown-item>
              <el-dropdown-item class="three">Dark</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="iconfont icon-shezhi"></span>
      </div>
      <div class="right">
        <span>Personal Consumption List Platform 个人消费清单平台</span>
        <el-select v-model="yearValue" @change="change_year(yearValue)">
          <el-option v-for="i in yearArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
        </el-select>
      </div>
    </div>

    <el-tabs v-model="activeTab" type="border-card" @tab-click="click_tab">
      <el-tab-pane :label="$t('tab.table')" name="home">
        <el-button class="add" size="mini" @click="click_add">{{ $t("btn.add") }}</el-button>
        <!-- <el-button size="mini" type="primary" @click="click_sort">排序</el-button> -->
        <!-- <el-form :model="form"> -->
        <el-form>
          <el-table ref="table" :data="lists[year]">
            <el-table-column class="month" prop="month" :label="$t('month')">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.month }}
                </template>
                <template v-else>
                  <el-form-item>
                    <el-select v-model="scope.row.month">
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
                    <el-input size="mini" v-model.number="scope.row.realSalary"></el-input>
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
                    <el-input size="mini" v-model.number="scope.row.rent"></el-input>
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
                    <el-input size="mini" v-model.number="scope.row.utilities"></el-input>
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
                    <el-input size="mini" v-model.number="scope.row.shop"></el-input>
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
                    <el-input size="mini" v-model.number="scope.row.deposit"></el-input>
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
                    <el-input size="mini" v-model.trim="scope.row.remark"></el-input>
                  </el-form-item>
                </template>
              </template>
            </el-table-column>

            <el-table-column prop="action" :label="$t('action')">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  <el-button size="mini" class="edit" @click="click_edit(scope.row, scope.$index)">
                    <i class="iconfont icon-17"></i>
                  </el-button>
                  <el-button size="mini" class="edit" @click="click_delete(scope.row, scope.$index)">
                    <i class="iconfont icon-shanchu"></i>
                  </el-button>
                </template>
                <template v-else>
                  <el-button class="save" size="mini" @click="click_save(scope.row, scope.$index)">{{ $t("btn.save") }}</el-button>
                  <el-button class="save" size="mini" @click="click_cancle(scope.row, scope.$index)">{{ $t("btn.cancle") }}</el-button>
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
import { init } from "../datas.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      activeTab: "home",
      yearValue: "2020",
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
      form: "",
      itemClone: {},
      order: "descending",
    };
  },
  computed: {
    ...mapState({
      lists: (state) => state.lists,
      year: (state) => state.year,
    }),
  },
  watch: {
    yearValue(val) {
      this.get_datas();
    },
  },
  methods: {
    ...mapMutations(["CHANGE_YEAR", "SET_LISTS"]),
    change_language() {
      let locales = ["cn", "en"];
      this.$i18n.locale = locales[2 - (Number(locales.indexOf(this.$i18n.locale)) + 1)];
      switch (this.$i18n.locale) {
        case "cn":
          this.$message({
            message: "已切换至中文模式 !",
            type: "info",
            customClass: "info",
          });
          break;
        case "en":
          this.$message({
            message: "change language to English successfully !",
            type: "info",
            customClass: "info",
          });
          break;
      }
    },
    click_tab(tab, event) {
      switch (Number(tab.index)) {
        case 0:
          this.activeTab = "home";
          this.$router.push("/home");
          sessionStorage.setItem("activeTab", JSON.stringify("home"));
          break;
        case 1:
          this.activeTab = "graphics";
          this.$router.push({ name: "graphics" });
          sessionStorage.setItem("activeTab", JSON.stringify("graphics"));
          break;
        case 2:
          this.activeTab = "more";
          this.$router.push({ name: "more" });
          sessionStorage.setItem("activeTab", JSON.stringify("more"));
          break;
      }
    },
    change_year() {
      console.log('sessionStorage.getItem("year") == false)', sessionStorage.getItem("year"));

      if (sessionStorage.getItem("year") == null) {
        sessionStorage.setItem("year", JSON.stringify(this.yearValue));
      } else {
        this.yearValue = sessionStorage.getItem("year");
      }
    },
    set_monthArr() {
      this.monthArr = [];
      let tempArr = [];
      this.lists[this.yearValue].forEach((i) => {
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
      if (localStorage.hasOwnProperty(this.yearValue) == false) {
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
        localStorage.setItem(this.yearValue, JSON.stringify(obj));
      }
      this.lists[this.yearValue] = JSON.parse(localStorage.getItem(this.yearValue));
      this.set_monthArr();
    },

    click_sort() {
      // 排序会影响add或者edit数据，因此暂时禁用，以后在解决
      // let arr = ["descending", "ascending"];
      // this.order = arr[2 - (Number(arr.indexOf(this.order)) + 1)];
      // this.$refs.table.sort("month", this.order);
    },

    click_add() {
      this.lists[this.yearValue].push(JSON.parse(JSON.stringify(this.newItem)));
    },

    click_edit(item, index) {
      this.itemClone[index] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      console.log("click_save index---", index);
      item.action = "view";
      this.lists[this.yearValue][index] = item;
      localStorage.setItem(this.yearValue, JSON.stringify(this.lists[this.yearValue]));
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
        this.lists[this.yearValue].pop();
        return;
      }

      this.lists[this.yearValue][index].action = "view";
      if (this.itemClone[index]) {
        this.itemClone[index].action = "view";
        this.lists[this.yearValue][index] = this.itemClone[index];
        localStorage.setItem(this.yearValue, JSON.stringify(this.lists[this.yearValue]));
      }
    },

    click_delete(item, index) {
      this.$confirm("确定删除第" + (index + 1) + "数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.lists[this.yearValue].splice(index, 1);
          localStorage.setItem(this.yearValue, JSON.stringify(this.lists[this.yearValue]));
          this.set_monthArr();
        })
        .catch(() => {});
    },
    click_theme(i) {},
  },
  created() {},
  mounted() {
    if (localStorage.hasOwnProperty("2019") == false && localStorage.hasOwnProperty("2020") == false && localStorage.hasOwnProperty("2021") == false) {
      init().then((res) => {
        if (res) {
          console.log("init successed");
          this.change_year();
          this.get_datas();
        } else {
          console.error("init failed");
        }
      });
    }
    if (sessionStorage.hasOwnProperty("activeTab") == false) {
      sessionStorage.setItem("activeTab", JSON.stringify("home"));
    } else {
      this.activeTab = JSON.parse(sessionStorage.getItem("activeTab"));
    }
    this.change_year();
    this.get_datas();
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Home.less");
</style>
