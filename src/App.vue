<script setup>
import Navigation from './components/Navigation.vue'
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--bg-primary);
  color: var(--text-primary);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  background: var(--bg-primary);
}

.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

.footer p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--bg-tertiary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}
</style>
