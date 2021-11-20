<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted(){
    this.$http.get('https://endpoint.cavierstays.com/home')
    .then(res=>{
      console.log(res.data)
    })
  }
}
</script>
<style>
body {
   background-color: rgb(16, 32, 41) !important;
  color: ghostwhite;
  font-family: Arial, Helvetica, sans-serif;
 
}


</style>
