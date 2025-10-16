<template>
  <div class="optimized-image-container" :style="containerStyle">
    <img
      v-if="loaded"
      :src="optimizedSrc"
      :alt="alt"
      :class="['optimized-image', imageClass]"
      @load="onLoad"
      @error="onError"
    />
    <div
      v-else
      :class="['image-placeholder', placeholderClass]"
      :style="placeholderStyle"
    >
      <div v-if="showSpinner" class="loading-spinner"></div>
      <span v-if="showText" class="placeholder-text">{{
        placeholderText
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: "100%",
  },
  height: {
    type: [String, Number],
    default: "auto",
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  quality: {
    type: Number,
    default: 80,
  },
  format: {
    type: String,
    default: "webp",
  },
  placeholderText: {
    type: String,
    default: "로딩 중...",
  },
  showSpinner: {
    type: Boolean,
    default: true,
  },
  showText: {
    type: Boolean,
    default: false,
  },
  imageClass: {
    type: String,
    default: "",
  },
  placeholderClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["load", "error"]);

const loaded = ref(false);
const error = ref(false);
const observer = ref(null);

const containerStyle = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
  position: "relative",
  overflow: "hidden",
}));

const placeholderStyle = computed(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "var(--bg-tertiary)",
  borderRadius: "8px",
}));

// 이미지 최적화된 URL 생성 (실제로는 CDN이나 이미지 최적화 서비스 사용)
const optimizedSrc = computed(() => {
  if (!props.src) return "";

  // WebP 포맷으로 변환하고 품질 조정
  // 실제 구현에서는 Sharp, ImageMagick 또는 클라우드 서비스 사용
  return props.src;
});

const onLoad = () => {
  loaded.value = true;
  emit("load");
};

const onError = () => {
  error.value = true;
  emit("error");
};

const loadImage = () => {
  if (!props.lazy) {
    loaded.value = true;
  }
};

onMounted(() => {
  if (props.lazy) {
    // Intersection Observer를 사용한 지연 로딩
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loaded.value = true;
            observer.value?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    observer.value.observe(
      document.querySelector(".optimized-image-container")
    );
  } else {
    loadImage();
  }
});

watch(
  () => props.src,
  () => {
    loaded.value = false;
    error.value = false;
  }
);
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  background: var(--bg-tertiary);
  border-radius: 8px;
}

.optimized-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease;
}

.image-placeholder {
  background: linear-gradient(
    135deg,
    var(--bg-tertiary) 0%,
    var(--bg-secondary) 100%
  );
  border-radius: 8px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color);
  border-top: 2px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.placeholder-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
