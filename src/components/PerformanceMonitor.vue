<template>
  <div class="performance-monitor" v-if="showMonitor">
    <div class="monitor-header">
      <h3>성능 모니터</h3>
      <button @click="toggleMonitor" class="close-btn">×</button>
    </div>

    <div class="monitor-content">
      <div class="metric">
        <span class="metric-label">페이지 로드 시간:</span>
        <span class="metric-value">{{ loadTime }}ms</span>
      </div>

      <div class="metric">
        <span class="metric-label">이미지 로드된 수:</span>
        <span class="metric-value">{{ loadedImages }}/{{ totalImages }}</span>
      </div>

      <div class="metric">
        <span class="metric-label">메모리 사용량:</span>
        <span class="metric-value">{{ memoryUsage }}MB</span>
      </div>

      <div class="metric">
        <span class="metric-label">네트워크 상태:</span>
        <span class="metric-value" :class="networkClass">{{
          networkStatus
        }}</span>
      </div>

      <div class="metric">
        <span class="metric-label">캐시 히트율:</span>
        <span class="metric-value">{{ cacheHitRate }}%</span>
      </div>
    </div>

    <div class="monitor-actions">
      <button @click="clearCache" class="action-btn">캐시 초기화</button>
      <button @click="preloadImages" class="action-btn">이미지 프리로드</button>
    </div>
  </div>

  <button
    v-else
    @click="toggleMonitor"
    class="monitor-toggle"
    title="성능 모니터 열기"
  >
    📊
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { clearImageCache } from "../utils/imageOptimization";

const showMonitor = ref(false);
const loadTime = ref(0);
const loadedImages = ref(0);
const totalImages = ref(0);
const memoryUsage = ref(0);
const networkStatus = ref("온라인");
const networkClass = ref("online");
const cacheHitRate = ref(0);

let performanceObserver = null;
let memoryInterval = null;

const toggleMonitor = () => {
  showMonitor.value = !showMonitor.value;
};

const updateMemoryUsage = () => {
  if ("memory" in performance) {
    const memory = performance.memory;
    memoryUsage.value = Math.round(memory.usedJSHeapSize / 1024 / 1024);
  }
};

const updateNetworkStatus = () => {
  networkStatus.value = navigator.onLine ? "온라인" : "오프라인";
  networkClass.value = navigator.onLine ? "online" : "offline";
};

const clearCache = () => {
  clearImageCache();
  cacheHitRate.value = 0;
  console.log("이미지 캐시가 초기화되었습니다.");
};

const preloadImages = () => {
  // 중요한 이미지들을 프리로드
  const importantImages = [
    "/src/assets/images/logos/Logo.jpeg",
    "/src/assets/images/logos/ZZZ.webp",
  ];

  importantImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  console.log("중요한 이미지들이 프리로드되었습니다.");
};

const countImages = () => {
  const images = document.querySelectorAll("img");
  totalImages.value = images.length;

  images.forEach((img) => {
    if (img.complete) {
      loadedImages.value++;
    } else {
      img.addEventListener("load", () => {
        loadedImages.value++;
      });
    }
  });
};

onMounted(() => {
  // 페이지 로드 시간 측정
  loadTime.value = Math.round(performance.now());

  // 이미지 개수 카운트
  countImages();

  // 메모리 사용량 모니터링
  updateMemoryUsage();
  memoryInterval = setInterval(updateMemoryUsage, 5000);

  // 네트워크 상태 모니터링
  updateNetworkStatus();
  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);

  // 성능 관찰자 설정
  if ("PerformanceObserver" in window) {
    performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === "navigation") {
          loadTime.value = Math.round(
            entry.loadEventEnd - entry.loadEventStart
          );
        }
      });
    });

    performanceObserver.observe({ entryTypes: ["navigation"] });
  }
});

onUnmounted(() => {
  if (memoryInterval) {
    clearInterval(memoryInterval);
  }

  if (performanceObserver) {
    performanceObserver.disconnect();
  }

  window.removeEventListener("online", updateNetworkStatus);
  window.removeEventListener("offline", updateNetworkStatus);
});
</script>

<style scoped>
.performance-monitor {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 300px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: var(--shadow-hover);
  z-index: 1000;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.monitor-header h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--accent-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--text-primary);
}

.monitor-content {
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.metric-label {
  color: var(--text-secondary);
}

.metric-value {
  color: var(--text-primary);
  font-weight: 600;
}

.metric-value.online {
  color: #10b981;
}

.metric-value.offline {
  color: #ef4444;
}

.monitor-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: var(--accent-primary);
  color: #000;
}

.monitor-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: var(--accent-primary);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: var(--shadow-hover);
  z-index: 1000;
  transition: all 0.3s ease;
}

.monitor-toggle:hover {
  transform: scale(1.1);
  box-shadow: var(--glow);
}

@media (max-width: 768px) {
  .performance-monitor {
    width: 280px;
    top: 10px;
    right: 10px;
  }

  .monitor-toggle {
    width: 45px;
    height: 45px;
    top: 10px;
    right: 10px;
  }
}
</style>
