<template>
  <div class="home">
    <h3>个人消费清单平台 Personal Consumption List Platform</h3>
    <el-button style='position:absolute;top:0;' size="mini" @click="click_add">新增yihang!!!!</el-button>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="表格" name="first">
        <el-form :model="form" ref="form" :rules="form.rule">
          <el-table :data="form.datas" highlight-current-row style="width: 100%">
            <el-table-column prop="date" label="日期" width="60"></el-table-column>

            <el-table-column prop="realSalary" label="工资到手">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.realSalary }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.realSalary'" :rules="form.rule">
                    <el-input size="mini" v-model.trim="scope.row.realSalary" style="width: 120px" @change="change(0, scope.row.realSalary)"></el-input>
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
                  <el-form-item :prop="'datas.' + scope.$index + '.rent'" :rules="form.rule">
                    <el-input size="mini" v-model.number="scope.row.rent" style="width: 120px" @change="change(1, scope.row.rent)"></el-input>
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
                  <el-form-item :prop="'datas.' + scope.$index + '.utilities'" :rules="form.rule">
                    <el-input size="mini" v-model.trim="scope.row.utilities" style="width: 120px" @change="change(2, scope.row.utilities)"></el-input>
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
                  <el-form-item :prop="'datas.' + scope.$index + '.shop'" :rules="form.rule">
                    <el-input size="mini" v-model.trim="scope.row.shop" style="width: 120px" @change="change(3, scope.row.shop)"></el-input>
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

            <el-table-column prop="deposit" label="存款">
              <template v-slot="scope">
                <template v-if="scope.row.action == 'view'">
                  {{ scope.row.deposit }}
                </template>
                <template v-else>
                  <el-form-item :prop="'datas.' + scope.$index + '.deposit'">
                    <el-input size="mini" v-model.trim="scope.row.deposit" style="width: 120px"></el-input>
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
                  <el-button size="mini" @click="click_save(scope.row, scope.$index)">保存edit</el-button>
                  <el-button size="mini" @click="click_cancle(scope.row, scope.$index)">取消edit</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="趋势图" name="second">
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
      activeName: "first",
      form: {
        datas: [],
        data: {
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
      ruleArr: [true, true, true, true],
    };
  },
  watch: {
    ruleArr(val) {
      // console.log("ruleArr ---", val);
    },
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.$router.push("/home");
      }
      if (tab.index == 1) {
        this.$router.push("/graphics");
      }
    },

    validateField(item, index) {},

    change(i, val) {
      if (isNaN(Number(val))) {
        this.ruleArr[i] = false;
      } else {
        this.ruleArr[i] = true;
      }
    },

    get_datas() {
      if (localStorage.hasOwnProperty("costs") == false) {
        let obj = [
          {
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

    // click_add() {
    //   // if (this.ruleArr.indexOf(false) !== -1) {
    //   //   return;
    //   // } else {
    //   //   let month = new Date().getMonth() + 1 < 10 ? "0" + Number(new Date().getMonth() + 1) : new Date().getMonth() + 1;
    //   //   let day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
    //   //   let date = month + "-" + day;
    //   //   let temp = JSON.parse(JSON.stringify(item));
    //   //   temp.date = date;
    //   //   temp.action = "view";
    //   //   this.form.datas.push(temp);
    //   //   this.form.data.action = "add";
    //   //   this.form.datas[0] = this.form.data;
    //   //   localStorage.setItem("costs", JSON.stringify(this.form.datas));
    //   // }
    // },

    click_add() {
      this.form.datas.push(this.form.data);   
      console.log('click_add ---',this.form.datas);
    },

    click_edit(item, index) {
      this.itemClone[index] = JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      console.log('click_save ---',index);
      
      // if (this.ruleArr.indexOf(false) !== -1) {
      //   return;
      // }

      item.action = "view";
      this.form.datas[index] = item;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
    },

    click_cancle(item, index) {
      // this.ruleArr = [true, true, true, true];
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
  .el-tabs {
    .el-tab-pane {
    }
  }
  h3 {
    text-align: center;
    padding-right: 20px;
  }
}
</style>
