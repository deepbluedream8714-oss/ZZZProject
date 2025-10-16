<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/">
          <img
            src="/src/assets/images/logos/Logo.jpeg"
            alt="로고"
            class="logo-image"
          />
          <span class="logo">파에톤의 제작 공방</span>
        </router-link>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        {{ isMobileMenuOpen ? "✕" : "☰" }}
      </button>

      <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
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
import { ref } from "vue";

const menuItems = [
  { name: "홈", path: "/" },
  { name: "에이전트 정보", path: "/agent" },
  { name: "W-Engine", path: "/wengine" },
  { name: "강습전", path: "/assault" },
];

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style>
/* Navigation 스타일은 src/styles/components/navigation.css에서 관리됩니다 */
</style>
