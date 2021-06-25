<template>
  <div>this is test page !!</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    let obj = {
      month: "月份",
      realSalary: "税后月薪",
      rent: "房租",
      tab: {
        table: "表格",
        graphics: "趋势图",
        more: "更多",
      },
      utilities: "水电费",
      shop: "购物+其它",
      remark: "存款",
      deposit: "备注",
      action: "操作",

      btn: {
        add: "新增",
        edit: "编辑",
        delete: "删除",
        save: "保存",
        cancle: "取消",
        test: {
          test_1: "aaaaa",
          test_2: {
            test_3: "bbbb",
            test_4: {
              test_5: "ccc",
            },
          },
        },
      },
    };
    function transfer(obj) {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] == "object") {
          // console.log("haiyou", obj[key]);
          transfer(obj[key]);
        } else {
          console.log("mieyou", obj[key]);
        }
      });
    }
    transfer(obj);
  },
};
</script>

<style></style>
