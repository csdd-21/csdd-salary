<template>
  <div id="app" v-model='uuu'>
  </div>
  <router-view/>
</template>

<script>
export default {
  data(){
    return {
   uuu:"ddd"
    }
 
  }
}
</script>

<style lang="less">
#app {

}
</style>
