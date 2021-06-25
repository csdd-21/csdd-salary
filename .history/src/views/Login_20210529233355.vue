<template>
  <div class="login">
    <div class="form">
      userName: <input type="text" v-model="form.userName" /> passWord： <input type="text" v-model="form.passWord" />
      <button class="commit" @click="clickCommit">commit!!</button>
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
        userName: "test_01",
        passWord: "11",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    clickCommit() {
      this.axios({
          method: 'post',
          url: '/api/login',
          params:  JSON.parse(JSON.stringify(this.form))
        }).then(res => {
          console.log("req", JSON.parse(JSON.stringify(this.form)));
          console.log("res",res.data);
          // _this.userToken = 'Bearer ' + res.data.data.body.token;
        }).catch(error => {
          console.log(error);
        });
      // this.axios.post("/api/login",{params:JSON.parse(JSON.stringify(this.form))})
      // .then(res=>{console.log('res',res.data)});
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
</style>
