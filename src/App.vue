<template>
  <div id="app">
    <h3>Connect Four</h3>
    <game-container />
  </div>
</template>

<script>
import GameContainer from '@/components/GameContainer';

export default {
  components: {
    GameContainer,
  },
};
</script>

<style>
body {
  background-color: azure;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
