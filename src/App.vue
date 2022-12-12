<template>
  <div id="app">
    <FetchLists />
    <createList />
  </div>
</template>
<script>
import createList from './components/createList'
import FetchLists from './components/FetchLists'
export default {
  name: 'App',
  components: { FetchLists, createList }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f0f0;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
