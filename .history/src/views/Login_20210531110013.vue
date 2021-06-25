<template>
  <div class="login">
    <div class="form">
      <div>
        <span>userName: </span>
        <input type="text" v-model="form.userName" />
      </div>
      <div>
        <span>passWord：</span>
        <input type="text" v-model="form.passWord" />
      </div>
      <div>
        <button class="commit" @click="clickCommit">commit!!</button>
      </div>
    </div>
    <Swiper :autoplay="swiper.autoplay" :pagination="swiper.pagination" :loop="true">
      <SwiperSlide>
        <img src="../assets/swiper_1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../assets/swiper_2.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="../assets/swiper_3.jpg" alt="" />
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
      swiper: {
        pagination: {
          clickable: true,
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
      },
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
    background-color: rgba(209,217,217,0.6);
    width: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
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
