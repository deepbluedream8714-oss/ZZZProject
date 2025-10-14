<template>
  <div class="engine">
    <h1>W-Engine</h1>
    <p class="intro">다양한 W-Engine 정보를 확인해보세요</p>

    <div class="engine-grid">
      <div class="service-card" v-for="service in services" :key="service.id">
        <div class="service-icon">{{ service.icon }}</div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
        <ul>
          <li v-for="(feature, index) in service.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const services = ref([
  {
    id: 1,
    icon: "🚀",
    title: "웹 개발",
    description: "현대적이고 반응형인 웹사이트 제작",
    features: [
      "반응형 디자인",
      "SEO 최적화",
      "빠른 로딩 속도",
      "크로스 브라우저 지원",
    ],
  },
  {
    id: 2,
    icon: "📱",
    title: "모바일 앱",
    description: "iOS와 Android 앱 개발",
    features: ["네이티브 성능", "직관적인 UI/UX", "오프라인 지원", "푸시 알림"],
  },
  {
    id: 3,
    icon: "🎨",
    title: "UI/UX 디자인",
    description: "사용자 중심의 디자인 솔루션",
    features: ["사용자 리서치", "프로토타이핑", "인터랙티브 디자인", "브랜딩"],
  },
  {
    id: 4,
    icon: "☁️",
    title: "클라우드 서비스",
    description: "안정적인 클라우드 인프라 구축",
    features: ["자동 스케일링", "백업 및 복구", "보안 관리", "24/7 모니터링"],
  },
]);
</script>

<style scoped>
/* Engine 페이지 고유 스타일 */
/* 공통 스타일은 src/styles/views.css에서 관리됩니다 */
</style>
