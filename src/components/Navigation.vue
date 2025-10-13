<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/">
          <img src="/src/assets/images/logos/Logo.jpeg" alt="로고" class="logo-image" />
          <span class="logo">파에톤의 제작 공방</span>
        </router-link>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        {{ isMobileMenuOpen ? '✕' : '☰' }}
      </button>

      <ul class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
        <li class="nav-item" v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            class="nav-link"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = [
  { name: '홈', path: '/' },
  { name: '에이전트 정보', path: '/about' },
  { name: 'W-Engine', path: '/services' },
  { name: '강습전', path: '/contact' }
]

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-brand a {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.logo-image {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1);
}

.logo {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--accent-primary);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: block;
  padding: 0.6rem 1.2rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent-primary);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background: var(--bg-tertiary);
  color: var(--accent-primary);
  font-weight: 600;
  border: 1px solid var(--accent-primary);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 60px;
    flex-direction: column;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-color);
    width: 100%;
    text-align: center;
    transition: left 0.3s ease;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.5);
    padding: 1rem 0;
    gap: 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    margin: 0;
  }

  .nav-link {
    padding: 1rem;
    width: 100%;
    border-radius: 0;
  }
}
</style>

