<template>
  <div class="wengine-card" @click="$emit('click', wengine)">
    <div class="wengine-image-container">
      <OptimizedImage
        v-if="wengine.image"
        :src="wengine.image"
        :alt="wengine.name"
        :lazy="true"
        :quality="85"
        format="webp"
        width="100%"
        height="100%"
        class="wengine-image"
        @load="onImageLoad"
        @error="onImageError"
      />
      <div v-else class="wengine-image-placeholder">
        <span>{{ wengine.name[0] }}</span>
      </div>
      <div class="wengine-rank" :class="`rank-${wengine.rank}`">
        {{ wengine.rank }}
      </div>
    </div>

    <div class="wengine-content">
      <div class="wengine-header">
        <h3 class="wengine-name">{{ wengine.name }}</h3>
        <div class="wengine-type" :class="`type-${wengine.type.toLowerCase()}`">
          {{ wengine.type }}
        </div>
      </div>

      <div class="wengine-stats">
        <div class="stat-item">
          <span class="stat-label">기본 공격력</span>
          <span class="stat-value">{{ wengine.baseATK }}</span>
        </div>
        <div class="stat-item" v-if="wengine.secondaryStat">
          <span class="stat-label">{{ wengine.secondaryStatName }}</span>
          <span class="stat-value">{{ wengine.secondaryStat }}</span>
        </div>
      </div>

      <div class="wengine-description">
        <p>{{ wengine.description }}</p>
      </div>

      <div class="wengine-tags" v-if="wengine.tags && wengine.tags.length > 0">
        <span v-for="tag in wengine.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import OptimizedImage from "./OptimizedImage.vue";

defineProps({
  wengine: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);

const onImageLoad = () => {
  console.log("W-엔진 이미지 로드 완료");
};

const onImageError = () => {
  console.log("W-엔진 이미지 로드 실패");
};
</script>

<style scoped>
.wengine-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.wengine-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    transparent 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.wengine-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover), var(--glow);
  border-color: var(--accent-primary);
}

.wengine-card:hover::before {
  opacity: 1;
}

.wengine-image-container {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 0.8rem;
}

.wengine-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.wengine-card:hover .wengine-image {
  transform: scale(1.05);
}

.wengine-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: var(--text-muted);
  background: linear-gradient(
    135deg,
    var(--bg-tertiary) 0%,
    var(--bg-secondary) 100%
  );
}

.wengine-rank {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: var(--bg-tertiary);
  white-space: nowrap;
  z-index: 1;
}

.rank-S {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
}

.rank-A {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  color: #000;
}

.rank-B {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
  color: #fff;
}

.wengine-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wengine-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.wengine-name {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.wengine-type {
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.type-attack {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: #fff;
}

.type-stun {
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  color: #fff;
}

.type-support {
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 100%);
  color: #fff;
}

.type-anomaly {
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
}

.type-defence {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  color: #fff;
}

.type-rupture {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: #fff;
}

.wengine-stats {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.stat-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  color: var(--accent-primary);
  font-weight: 600;
}

.wengine-description {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wengine-description p {
  margin: 0;
}

.wengine-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.tag {
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  white-space: nowrap;
}
</style>
