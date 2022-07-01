<template>
  <CountDown />
</template>

<script>
import CountDown from "./components/CountDown.vue";

export default {
  name: "App",
  components: {
    CountDown,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  pointer-events: auto;
}

body,
html {
  pointer-events: none;
  background-color: transparent;
}
</style>
