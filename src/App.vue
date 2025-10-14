<script setup>
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <div id="app">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; 2025 아스트리드의 제작소입니다. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
/* App.vue 컴포넌트 스타일 */
/* 글로벌 스타일은 src/styles/main.css에서 관리됩니다 */
</style>
