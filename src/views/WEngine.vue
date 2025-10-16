<template>
  <div class="wengine-page">
    <div class="content-wrapper">
      <!-- 왼쪽 필터 사이드바 -->
      <aside class="filter-sidebar">
        <WEngineFilter v-model="filters" />
      </aside>

      <!-- 오른쪽 메인 컨텐츠 -->
      <main class="main-content">
        <!-- 검색 및 정렬 바 -->
        <div class="top-bar">
          <div class="controls">
            <div class="search-container">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="W-엔진 이름 검색..."
                class="input"
              />
            </div>
            <div class="sort-container">
              <select v-model="sortBy" class="select">
                <option value="name">이름순</option>
                <option value="rank">등급순</option>
                <option value="type">타입순</option>
                <option value="baseATK">공격력순</option>
              </select>
            </div>
          </div>

          <!-- 결과 개수 -->
          <div class="results-info">
            <p>
              총 <strong>{{ filteredWEngines.length }}</strong
              >개의 W-엔진
            </p>
          </div>
        </div>

        <!-- W-엔진 카드 그리드 -->
        <div class="wengines-grid">
          <WEngineCard
            v-for="wengine in filteredWEngines"
            :key="wengine.id"
            :wengine="wengine"
            @click="showWEngineDetail(wengine)"
          />
        </div>

        <!-- W-엔진이 없을 때 -->
        <div v-if="filteredWEngines.length === 0" class="no-results">
          <p>조건에 맞는 W-엔진이 없습니다.</p>
          <button @click="resetAll" class="reset-all-btn">
            모든 필터 초기화
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWEngineStore } from "../stores/wengineStore";
import WEngineCard from "../components/WEngineCard.vue";
import WEngineFilter from "../components/WEngineFilter.vue";

const wengineStore = useWEngineStore();

const filters = ref({
  rank: [],
  type: [],
  attribute: [],
});

const searchQuery = ref("");
const sortBy = ref("name");

const filteredWEngines = computed(() => {
  // 1. 필터 적용
  let result = wengineStore.filterWEngines(filters.value);

  // 2. 검색 적용
  if (searchQuery.value) {
    result = wengineStore.searchWEngines(searchQuery.value);
    // 검색 후에도 필터 적용
    if (
      filters.value.rank.length > 0 ||
      filters.value.type.length > 0 ||
      filters.value.attribute.length > 0
    ) {
      result = result.filter((wengine) => {
        return (
          (!filters.value.rank.length ||
            filters.value.rank.includes(wengine.rank)) &&
          (!filters.value.type.length ||
            filters.value.type.includes(wengine.type)) &&
          (!filters.value.attribute.length ||
            filters.value.attribute.includes(wengine.attribute))
        );
      });
    }
  }

  // 3. 정렬 적용
  return wengineStore.sortWEngines(result, sortBy.value);
});

const showWEngineDetail = (wengine) => {
  // W-엔진 상세 정보를 모달이나 다른 방식으로 표시
  console.log("W-엔진 상세:", wengine);
};

const resetAll = () => {
  filters.value = {
    rank: [],
    type: [],
    attribute: [],
  };
  searchQuery.value = "";
};
</script>

<style scoped>
.wengine-page {
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem;
}

.content-wrapper {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.filter-sidebar {
  position: sticky;
  top: 0;
  width: 280px;
  min-width: 280px;
  align-self: flex-start;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.top-bar {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.controls {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-container {
  flex: 1;
  min-width: 200px;
}

.sort-container {
  min-width: 130px;
}

.results-info {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.results-info p {
  margin: 0;
}

.results-info strong {
  color: var(--accent-primary);
  font-size: 1rem;
}

.wengines-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: 10px;
}

.no-results p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}

.reset-all-btn {
  padding: 0.6rem 1.2rem;
  background: var(--accent-primary);
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-all-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

@media (max-width: 1400px) {
  .wengines-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
  }

  .filter-sidebar {
    position: static;
    width: 100%;
    min-width: 100%;
  }

  .wengines-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .wengine-page {
    padding: 1rem;
  }

  .content-wrapper {
    gap: 1rem;
  }

  .wengines-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }

  .controls {
    flex-direction: column;
  }

  .search-container,
  .sort-container {
    width: 100%;
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .wengines-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
