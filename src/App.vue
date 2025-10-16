<script setup>
import Navigation from "./components/Navigation.vue";
import PerformanceMonitor from "./components/PerformanceMonitor.vue";
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

    <!-- 개발 환경에서만 성능 모니터 표시 -->
    <PerformanceMonitor v-if="isDevelopment" />
  </div>
</template>

<script>
export default {
  computed: {
    isDevelopment() {
      return import.meta.env.DEV;
    },
  },
};
</script>
