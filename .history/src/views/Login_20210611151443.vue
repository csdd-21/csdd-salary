<template>
  <div class="login">
    <div class="form">
      <div>
        <span>用户名: </span>
        <el-input type="text" v-model="form.username"></el-input>
      </div>
      <div>
        <span>密码: </span>
        <el-input type="text" v-model="form.password" show-password></el-input>
      </div>
      <div>
        <el-button @click="click_register">注册</el-button>
        <el-button @click="click_login">登录</el-button>
      </div>
    </div>
    <Swiper>
      <SwiperSlide>
        <img src="../assets/bgImg.jpg" alt="bgImg" />
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
        username: "test_01",
        password: "11",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    click_register() {
      this.axios({
        method: "post",
        url: "/api/register",
        data: JSON.parse(JSON.stringify(this.form)),
      })
        .then((res) => {
          if (res.data.status == 403) {
            this.$alert("该用户名已经注册", "注册失败", {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 401) {
            this.$alert("注册失败", "注册失败", {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 200) {
            this.$alert("注册成功，点击确定按钮前往首页", "注册成功", {
              confirmButtonText: "确定",
              customClass: "infoBox",
              callback: (action) => {
                this.$router.push({ name: "home" });
                sessionStorage.setItem("authorization", res.data.data.token);
              },
            });
          }
          console.log("register res ---", res);
        })
        .catch((err) => {
          console.log("register err ---", err);
        });
    },
    click_login() {
      this.axios({
        method: "post",
        url: "/api/login",
        data: JSON.parse(JSON.stringify(this.form)),
      })
        .then((res) => {
          if (res.data.status == 416) {
            this.$alert("用户未注册", "登录失败", {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 401) {
            this.$alert("密码错误", "登录失败", {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 200) {
            this.$router.push({ name: "home" });
            this.$message({
              message: "登录成功",
              type: "info",
              customClass: "info",
            });
            sessionStorage.setItem("authorization", res.data.data.token);
          }
          console.log("login res -", res);
        })
        .catch((err) => {
          console.log("login err ---", err);
        });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/Login.less");
</style>
