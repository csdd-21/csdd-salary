<template>
  <div class="login">
    <div class="form">
      userName: <input type="text" v-model="form.userName" /> passWord： <input type="text" v-model="form.passWord" />
      <button class="commit" @click="clickCommit">commit!!</button>
    </div>
    <swiper :pagination="true" class="mySwiper">
      <swiper-slide>
        <img src="../assets/swiper_1.png" alt="">
      </swiper-slide>
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
// import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.less";
import "swiper/components/pagination/pagination.less";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

export default {
  name: "Login",
  components: {
    // Swiper,
    // SwiperSlide,
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

#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
