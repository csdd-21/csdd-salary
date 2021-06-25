<template>
  <div class="login">
    <div class='form'>
<input type="text" v-model='form.userName'>
<input type="text" v-model='form.passWord'>
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
      form:{
        userName:"",
        passWord:""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang='less' scoped>
.login {
  .form {
    
  }
}
</style>
