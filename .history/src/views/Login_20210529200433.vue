<template>
  <div class="login">
    <div class="form">
    userName:  <input type="text" v-model="form.userName" />
     passWord： <input type="text" v-model="form.passWord" />
      <button class='commit' @click="clickCommit">commit!!</button>
    </div>
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
        userName: "",
        passWord: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    clickCommit() {
      console.log("form", JSON.parse(JSON.stringify(this.form)));
      this.$axios({
          method: 'post',
          url: '/user/login',
          data: this.form
        }).then(res => {
          console.log(res.data);
          // _this.userToken = 'Bearer ' + res.data.data.body.token;

          alert('登陆成功');
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        });
      
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
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    input{
      margin-right:20px;
      width: 100px;
    }
    .commit{
      margin-top:20px;
    }
  }
}
</style>
