<template>
  <div class="filter-container card">
    <div class="filter-header">
      <h2>필터</h2>
      <button @click="resetFilters" class="reset-btn">초기화</button>
    </div>

    <div class="filter-section">
      <h3>등급</h3>
      <div class="filter-options">
        <button
          v-for="rank in ranks"
          :key="rank"
          :class="['filter-btn', { active: filters.rank.includes(rank) }]"
          @click="toggleFilter('rank', rank)"
        >
          {{ rank }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <h3>타입</h3>
      <div class="filter-options">
        <button
          v-for="type in types"
          :key="type"
          :class="['filter-btn', { active: filters.type.includes(type) }]"
          @click="toggleFilter('type', type)"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <h3>속성</h3>
      <div class="filter-options">
        <button
          v-for="attr in attributes"
          :key="attr"
          :class="[
            'filter-btn',
            `attr-${attr}`,
            { active: filters.attribute.includes(attr) },
          ]"
          @click="toggleFilter('attribute', attr)"
        >
          {{ attr }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const ranks = ["S", "A", "B"];
const types = ["Attack", "Stun", "Support", "Anomaly", "Defence", "Rupture"];
const attributes = ["물리", "화염", "얼음", "전기", "에테르", "현묵", "서리열"];

const filters = ref({
  rank: [],
  type: [],
  attribute: [],
});

const toggleFilter = (category, value) => {
  const index = filters.value[category].indexOf(value);
  if (index > -1) {
    filters.value[category].splice(index, 1);
  } else {
    filters.value[category].push(value);
  }
};

const resetFilters = () => {
  filters.value = {
    rank: [],
    type: [],
    attribute: [],
  };
};

watch(
  filters,
  (newFilters) => {
    emit("update:modelValue", newFilters);
  },
  { deep: true }
);
</script>

<style scoped>
.filter-container {
  padding: 1.2rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--border-color);
}

.filter-header h2 {
  font-size: 1.1rem;
  color: var(--accent-primary);
  margin: 0;
  font-weight: 700;
}

.reset-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.75rem;
  white-space: nowrap;
}

.reset-btn:hover {
  background: var(--accent-primary);
  color: #000;
  border-color: var(--accent-primary);
}

.filter-section {
  margin-bottom: 1.2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.filter-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.filter-section h3 {
  font-size: 0.85rem;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-btn {
  padding: 0.4rem 0.7rem;
  border: 1.5px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.75rem;
}

.filter-btn:hover {
  border-color: var(--accent-primary);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: #000;
  font-weight: 700;
}

.filter-btn.attr-물리.active {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  border-color: #ff6b6b;
  color: #fff;
}

.filter-btn.attr-화염.active {
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  border-color: #ff8c42;
  color: #fff;
}

.filter-btn.attr-얼음.active {
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 100%);
  border-color: #4dabf7;
  color: #fff;
}

.filter-btn.attr-전기.active {
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  border-color: #a78bfa;
  color: #fff;
}

.filter-btn.attr-에테르.active {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  border-color: #34d399;
  color: #fff;
}

.filter-btn.attr-현묵.active {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border-color: #64748b;
  color: #fff;
}

.filter-btn.attr-서리열.active {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  border-color: #06b6d4;
  color: #fff;
}

@media (max-width: 1024px) {
  .filter-container {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .filter-header {
    flex-direction: row;
    gap: 0.5rem;
  }

  .filter-header h2 {
    font-size: 1.2rem;
  }

  .filter-btn {
    font-size: 0.8rem;
    padding: 0.45rem 0.75rem;
  }

  .reset-btn {
    font-size: 0.8rem;
    padding: 0.35rem 0.7rem;
  }
}
</style>
