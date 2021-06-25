<template>
  <div class="home">
    <h3>vue+ElementUI的简单消费清单系统，端口9099，采用localStorage本地存储</h3>
    <p>2020</p>
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
            <template v-else-if="scope.row.action == 'add'">
              <el-button size="mini" @click="click_add(scope.row, scope.$index)">新增</el-button>
              <el-button size="mini" @click="click_reset(scope.row, scope.$index)">重置</el-button>
            </template>
            <template v-else>
              <el-button size="mini" @click="click_save(scope.row, scope.$index)">保存</el-button>
              <el-button size="mini" @click="click_cancle(scope.row, scope.$index)">取消</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Home",
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
      form: {
        datas: [],
        data: {
          realSalary: "",
          rent: "",
          utilities: "",
          shop: "",
          remark: "",
          deposit: "",
          action: "add",
        },
        rule: [{ validator: rule, trigger: "blur" }],
      },
      itemClone: {},
      ruleArr: [true, true, true, true],
    };
  },
  watch: {
    ruleArr(val) {
      console.log("ruleArr ---", val);
    },
  },
  methods: {
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
            realSalary: "",
            rent: "",
            utilities: "",
            shop: "",
            remark: "",
            deposit: "",
            action: "add",
          },
        ];
        localStorage.setItem("costs", JSON.stringify(obj));
      }
      this.form.datas = JSON.parse(localStorage.getItem("costs"));
    },

    click_add(item, index) {
      if (this.ruleArr.indexOf(false) !== -1) {
        return;
      } else {
        let month = new Date().getMonth() + 1 < 10 ? "0" + Number(new Date().getMonth() + 1) : new Date().getMonth() + 1;
        let day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
        let date = month + "-" + day;

        let temp = JSON.parse(JSON.stringify(item));
        temp.date = date;
        temp.action = "view";
        this.form.datas.push(temp);

        this.form.data.action = "add";
        this.form.datas[0] = this.form.data;
        localStorage.setItem("costs", JSON.stringify(this.form.datas));
      }
    },

    click_reset(item, index) {
      this.$refs["form"].resetFields();
      this.ruleArr = [true, true, true, true];
      this.form.data.action = "add";
      this.form.datas[0] = this.form.data;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
    },

    click_edit(item, index) {
      this.itemClone[index]= JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      if (this.ruleArr.indexOf(false) !== -1) {
        return;
      }
      item.action = "view";
      this.form.datas[index] = item;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
    },

    click_cancle(item, index) {
      this.ruleArr = [true, true, true, true];
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

<style lang='less' scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  h3{

  }
}
</style>
