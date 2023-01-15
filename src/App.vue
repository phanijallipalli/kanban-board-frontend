<template>
  <NavBar/>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue"
  export default{
    components : {NavBar}
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: Helvetica;
  padding-bottom: 5%;
}



li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
