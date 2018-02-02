<template>
  <div id="app">
    <svg-icon :path="'logo.svg'" class="logo-svg" />
    <h3>Connect Four</h3>
    <game-container />
  </div>
</template>

<script>
import GameContainer from '@/components/GameContainer';
import SvgIcon from '@/components/SvgIcon';

export default {
  components: {
    GameContainer,
    SvgIcon,
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

.logo {
  display: inline-block;
}

.logo h3 {
  margin: 0;
}

.logo-svg {
  display: block;
  margin: 0 auto;
  width: 75px;
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
