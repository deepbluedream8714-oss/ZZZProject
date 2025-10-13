<template>
  <div class="services">
    <h1>서비스</h1>
    <p class="intro">우리가 제공하는 다양한 서비스를 확인해보세요</p>

    <div class="services-grid">
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
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    icon: '🚀',
    title: '웹 개발',
    description: '현대적이고 반응형인 웹사이트 제작',
    features: [
      '반응형 디자인',
      'SEO 최적화',
      '빠른 로딩 속도',
      '크로스 브라우저 지원'
    ]
  },
  {
    id: 2,
    icon: '📱',
    title: '모바일 앱',
    description: 'iOS와 Android 앱 개발',
    features: [
      '네이티브 성능',
      '직관적인 UI/UX',
      '오프라인 지원',
      '푸시 알림'
    ]
  },
  {
    id: 3,
    icon: '🎨',
    title: 'UI/UX 디자인',
    description: '사용자 중심의 디자인 솔루션',
    features: [
      '사용자 리서치',
      '프로토타이핑',
      '인터랙티브 디자인',
      '브랜딩'
    ]
  },
  {
    id: 4,
    icon: '☁️',
    title: '클라우드 서비스',
    description: '안정적인 클라우드 인프라 구축',
    features: [
      '자동 스케일링',
      '백업 및 복구',
      '보안 관리',
      '24/7 모니터링'
    ]
  }
])
</script>

<style scoped>
.services {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.services h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 1rem;
}

.intro {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-hover);
  border-color: var(--accent-primary);
  background: var(--bg-secondary);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.5rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.service-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-card ul {
  list-style: none;
  padding: 0;
}

.service-card li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  position: relative;
  padding-left: 1.5rem;
}

.service-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
}
</style>

