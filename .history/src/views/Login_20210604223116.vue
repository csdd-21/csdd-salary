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
        <el-button class="commit" @click="clickRegister">注册</el-button>
        <el-button class="commit" @click="clickLogin">登录</el-button>
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
    clickRegister() {
      this.axios({
        method: "post",
        url: "/api/register",
        data: JSON.parse(JSON.stringify(this.form)),
      })
        .then((res) => {
          if (res.data.status == 403) {
            this.$alert("该用户名已经注册", "注册失败", {
              confirmButtonText: "确定",
            });
          }
          if (res.data.status == 401) {
            this.$alert("注册失败", "", {
              confirmButtonText: "确定",
            });
          }
          if (res.data.status == 200) {
            this.$alert("注册成功，点击确定按钮前往首页", "", {
              confirmButtonText: "确定",
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
    clickLogin() {
      this.axios({
        method: "post",
        url: "/api/login",
        data: JSON.parse(JSON.stringify(this.form)),
      })
        .then((res) => {
          if (res.data.status == 416) {
            this.$alert("用户未注册", "登录失败", {
              confirmButtonText: "确定",
            });
          }
          if (res.data.status == 401) {
            this.$alert("密码错误", "登录失败", {
              confirmButtonText: "确定",
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
          console.log("register err ---", err);
        });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@color: rgb(255, 255, 255);
@bgColor: rgb(199, 209, 222);
.login {
  height: 100%;
  width: 100%;
  .form {
    background-color: fade(@bgColor, 60%);
    width: 420px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    color: @color;
    div {
      margin: 0 auto;
      margin-top: 20px;
      &:last-child {
        margin-bottom: 32px;
      }
      span {
        display: inline-block;
        width: 60px;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        text-align: center;
      }
      /deep/ .el-input {
        height: 20px;
        width: 200px;
        border-radius: 4px;
      }
      /deep/ .el-button {
        background-color: @bgColor;
        height: 20px;
        width: 60px;
        line-height: 20px;
        padding: 0;
        color: rgba(255, 255, 255);
        margin-left: 38px;
      }
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
