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
    let arr = [
      {
        month: 2,
        rent: 20,
      },
      {
        month: 4,
        rent: 40,
      },
      {
        month: 6,
        rent: 60,
      },
      {
        month: 8,
        rent: 80,
      },
    ];
    let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arr.forEach((i) => {
      console.log("month", i.month);
      temp[Number(i.month) + 1] = i.rent;
      console.log("temp", temp);
    });
  },
};
</script>

<style></style>
