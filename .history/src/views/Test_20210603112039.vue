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
        rent_2: 200,
      },
      {
        month: 4,
        rent: 40,
        rent_2: 400,
      },
      {
        month: 6,
        rent: 60,
        rent_2: 600,
      },
      {
        month: 8,
        rent: 80,
        rent_2: 800,
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
