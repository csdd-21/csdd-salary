<template>
  <div class="login">
    <div class="form">
      userName: <input type="text" v-model="form.userName" /> passWord： <input type="text" v-model="form.passWord" />
      <button class="commit" @click="clickCommit">commit!!</button>
    </div>
    <swiper :pagination="true" class="mySwiper">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.less";
export default {
  name: "Login",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {},
  data() {
    return {
      form: {
        userName: "test_01",
        passWord: "11",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange(val) {
      console.log("slide change", val);
    },
    clickCommit() {
      this.$router.push("/home");

      // this.axios({
      //     method: 'post',
      //     url: '/api/login',
      //     data:  JSON.parse(JSON.stringify(this.form))
      //   }).then(res => {
      //     console.log("req", JSON.parse(JSON.stringify(this.form)));
      //     console.log("res",res.data);
      //     // _this.userToken = 'Bearer ' + res.data.data.body.token;
      //   }).catch(error => {
      //     console.log(error);
      //   });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.login {
  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    input {
      margin-right: 20px;
      width: 100px;
    }
    .commit {
      margin-top: 20px;
    }
  }
}
.div1 {
  background-color: gray;
  height: 100%;
  width: 100%;
}
</style>
