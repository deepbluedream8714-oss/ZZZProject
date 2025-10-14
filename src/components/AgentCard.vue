<template>
  <div class="agent-card" @click="$emit('click', agent)">
    <div class="agent-image-container">
      <img
        v-if="agent.image"
        :src="agent.image"
        :alt="agent.name"
        class="agent-image"
      />
      <div v-else class="agent-image-placeholder">
        <span>{{ agent.name[0] }}</span>
      </div>
      <div class="agent-rank" :class="`rank-${agent.rank}`">{{ agent.rank }}</div>
    </div>

    <div class="agent-content">
      <div class="agent-header">
        <h3 class="agent-name">{{ agent.name }}</h3>
        <div class="agent-attribute" :class="`attr-${agent.attribute}`">
          {{ agent.attribute }}
        </div>
      </div>

      <div class="agent-meta">
        <span class="agent-faction">{{ agent.faction }}</span>
      </div>

      <div class="agent-specialty-tag">{{ agent.specialty }}</div>

      <div class="agent-tags">
        <span
          v-for="tag in agent.tags"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  agent: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.agent-card {
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

.agent-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(245, 158, 11, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.agent-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover), var(--glow);
  border-color: var(--accent-primary);
}

.agent-card:hover::before {
  opacity: 1;
}

.agent-image-container {
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

.agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.3s ease;
}

.agent-card:hover .agent-image {
  transform: scale(1.05);
}

.agent-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: var(--text-muted);
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
}

.agent-rank {
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

.agent-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.agent-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.agent-name {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.agent-attribute {
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.attr-물리 {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: #fff;
}

.attr-화염 {
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  color: #fff;
}

.attr-얼음 {
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 100%);
  color: #fff;
}

.attr-전기 {
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
}

.attr-에테르 {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  color: #fff;
}

.attr-현묵 {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: #fff;
}

.attr-서리열 {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: #fff;
}

.agent-meta {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.agent-faction {
  color: var(--accent-primary);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.agent-specialty-tag {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  text-align: center;
  font-weight: 500;
}

.agent-tags {
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

