<template>
  <div class="login">
    <div class='form'>
<input type="text" v-model='form.userName'>
<input type="text" v-model='form.passWord'>
<button @click='clickCommit'>commit!!</button>
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
  methods: {
    clickCommit(){
      console.log('form',this.form);
      
    },
  },
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
