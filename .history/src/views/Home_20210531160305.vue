<template>
  <div class="home">
    <h3>vue+ElementUI的简单消费清单系统，端口9099，采用localStorage本地存储</h3>
    <p>2020</p>

    <el-form :model="form" ref="form">
      <el-table :data="form.datas" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>

        <el-table-column prop="date" label="日期" width="60"></el-table-column>

        <el-table-column prop="realSalary" label="工资到手">
          <template v-slot="scope">
            <template v-if="scope.row.action == 'view'">
              {{ scope.row.realSalary }}
            </template>
            <template v-else>
              <el-form-item :prop="'datas.' + scope.$index + '.realSalary'">
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
              <el-form-item :prop="'datas.' + scope.$index + '.rent'">
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
              <el-form-item :prop="'datas.' + scope.$index + '.utilities'">
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
              <el-form-item :prop="'datas.' + scope.$index + '.shop'">
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
    return {
      form: {
        data: {
          realSalary: "",
          rent: "",
          utilities: "",
          shop: "",
          remark: "",
          deposit: "",
          action: "add",
        },
        datas: [],
      },
      itemClone: {},
      //表单验证规则
      rules: {
        name: [
          {
            type: "string",
            required: true,
            trigger: "blur",
            message: "请输入姓名",
          },
        ],
        age: [
          {
            type: "number",
            required: true,
            trigger: "blur",
            message: "请输入年龄",
          },
          {
            type: "number",
            trigger: "blur",
            min: 0,
            max: 120,
            message: "年龄最小0，最大120",
          },
        ],
      },
    };
  },
  watch: {},
  created() {
    //处理数据，为已有数据添加action:'view'
    console.log("1111", this.form);
    this.form.datas.map((item) => {
      this.$set(item, "action", "view");
      return item;
    });

    //再插入一条添加操作的数据
    // this.form.datas.unshift({
    //     date: undefined,
    //     name: undefined,
    //     age: undefined,
    //     action: "add"
    // });
  },
  mounted() {
    this.getData();
  },
  methods: {
    //对部分表单字段进行校验
    validateField(form, index) {
      let result = true;
      // for (let item of this.$refs.form.model.datas) {
      //   if (item.prop.split(".")[1] == index) {
      //     this.$refs[form].validateField(item.prop, (error) => {
      //       if (error != "") {
      //         result = false;
      //       }
      //     });
      //   }
      //   if (!result) break;
      // }
      return result;
    },

    //对部分表单字段进行重置
    resetField(form, index) {
      // this.$refs.form.model.datas.forEach((item) => {
      //   if (item.prop.split(".")[1] == index) {
      //     item.resetField();
      //   }
      // });
    },

    getData() {
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
      this.$confirm("确定删除该条数据(ID" + index + ")吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //模拟删除一条数据
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
