<template>
  <div class="home">
    <h3>vue+ElementUI的简单消费清单系统，端口9099，采用localStorage本地存储</h3>
    <p>2020</p>

    <el-form :model="form" ref="form" :rules="form.rules">
      <el-table :data="form.datas" highlight-current-row style="width: 100%">
        <el-table-column prop="date" label="日期" width="60"></el-table-column>

        <el-table-column prop="realSalary" label="工资到手">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.realSalary }}
            </template>
            <template v-else>
              <el-form-item :prop="'datas.' + scope.$index + '.realSalary'" :rules="form.rules.realSalary">
                <el-input size="mini" v-model.trim="scope.row.realSalary" style="width: 120px"></el-input>
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
              <el-form-item :prop="'datas.' + scope.$index + '.rent'" :rules="form.rules.rent">
                <el-input size="mini" v-model.number="scope.row.rent" style="width: 60px"></el-input>
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
              <el-form-item :prop="'datas.' + scope.$index + '.utilities'" :rules="form.rules.utilities">
                <el-input size="mini" v-model.trim="scope.row.utilities" style="width: 120px"></el-input>
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
              <el-form-item :prop="'datas.' + scope.$index + '.shop'" :rules="form.rules.shop">
                <el-input size="mini" v-model.trim="scope.row.shop" style="width: 120px"></el-input>
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
    const rule_1 = (rule, value, callback) => {
      // console.log("rule",rule);
      if (!value) {
        return callback(new Error("请输入金额11"));
      } else if (!value.match(/^[0-9]*$/g)) {
        return callback(new Error("请输入数字值11"));
      } else {
        callback();
      }
    };
    const rule_2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入金额22"));
      } else if (!value.match(/^[0-9]*$/g)) {
        return callback(new Error("请输入数字值22"));
      } else {
        callback();
      }
    };
    const rule_3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入金额33"));
      } else if (!value.match(/^[0-9]*$/g)) {
        return callback(new Error("请输入数字值33"));
      } else {
        callback();
      }
    };
    const rule_4 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入金额44"));
      } else if (!value.match(/^[0-9]*$/g)) {
        return callback(new Error("请输入数字值44"));
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
        rules: {
          realSalary: [{ validator: rule_1, trigger: "blur" }],
          rent: [{ validator: rule_2, trigger: "blur" }],
          utilities: [{ validator: rule_3, trigger: "blur" }],
          shop: [{ validator: rule_4, trigger: "blur" }],
        },
      },
      itemClone: {},
      validRes: true,
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.get_datas();
  },
  methods: {
    validateField(item,index) {
      let result = true;
      console.log('item',item);
      
      // for (let item of this.$refs['form'].validate) {
      //   console.log('fields',this.$refs['form']);
        
      //   // if (item.prop.split(".")[1] == index) {
      //   //   this.$refs['form'].validateField(item.prop, (error) => {
      //   //     if (error != "") {
      //   //       result = false;
      //   //     }
      //   //   });
      //   // }
      //   // if (!result) break;
      // }
      return result;
    },
    validateField1(item, index) {
      this.$refs["form"].validate((valid) => {
        console.log("valid ---- ", valid);

        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$refs["form"].validateField("datas.0.realSalary", (valid, error) => {
      //   console.log("11111", valid, "2222", error);
      //   if (valid) {
      //     console.log("submit!");
      //   }
      // });
      //  this.$refs['form'].validate((valid) => {
      //    console.log('this.$refs',this.$refs['form']);
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // for (let item of this.$refs.form.model.datas) {
      //   console.log('666',item);
      //   if (item.prop.split(".")[1] == index) {
      //     this.$refs['form'].validateField(item.prop, (error) => {
      //       if (error != "") {
      //         // result = false;
      //       }
      //     });
      //   }
      //   if (!result) break;
      // }
      // return result;
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
      // if (!this.validateField('form', index)) return;

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
      this.validateField(temp, 0);
    },

    click_reset(item, index) {
      this.form.data.action = "add";
      this.form.datas[0] = this.form.data;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
    },

    click_edit(item, index) {
      this.itemClone = JSON.parse(JSON.stringify(item));
      item.action = "edit";
    },

    click_save(item, index) {
      item.action = "view";
      this.form.datas[index] = item;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
    },

    click_cancle(item, index) {
      this.itemClone.action = "view";
      this.form.datas[index] = this.itemClone;
      localStorage.setItem("costs", JSON.stringify(this.form.datas));
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
};
</script>

<style>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
