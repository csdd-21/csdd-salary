<template>
  <div class="login">
    <div class="form">
      userName: <input type="text" v-model="form.userName" /> passWord： <input type="text" v-model="form.passWord" />
      <button class="commit" @click="clickCommit">commit!!</button>
    </div>
    <Swiper :pagination="true" class="mySwiper">
      <SwiperSlide v-for="i of 3" :key="i">
        <div>{{ i }}</div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
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
  height: 100%;
  width: 100%;
  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    z-index: 2;
    input {
      margin-right: 20px;
      width: 100px;
    }
    .commit {
      margin-top: 20px;
    }
  }

  .swiper-container {
    position: absolute;
    width: 100%;
    height: 100%;
    .swiper-slide {
      background: #fff;
       display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 180px;
    }
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
