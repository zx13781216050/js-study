<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";

export default {
  components: { MainTabBar },
  name: "app",
};
</script>
<style>
@import "./assets/css/base.css";
</style>
