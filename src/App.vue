<template>
  <div id="app">
    <nav>
      <router-link to="/">demo1</router-link>
      <router-link to="/list">demo2</router-link>
    </nav>
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
