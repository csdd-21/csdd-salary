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
      utilities: "水电费",
      shop: "购物+其它",
      remark: "存款",
      deposit: "备注",
      action: "操作",
      tab: {
        table: "表格",
        graphics: "趋势图",
        more: "更多",
      },
      btn: {
        add: "新增",
        edit: "编辑",
        delete: "删除",
        save: "保存",
        cancle: "取消",
      },
    };
    // for (i of obj) {
    //   console.log("i", i);
    // }
    console.log("", Object.keys(obj));
    Object.keys(obj).forEach((i) => {
      if (Object.keys(i)) {
        console.log("haiyou"，Object.keys(i));
      } else {
        console.log("mieyou");
      }
    });
  },
};
</script>

<style></style>
