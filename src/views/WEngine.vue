<template>
  <div class="wengine-page">
    <div class="content-wrapper">
      <!-- 왼쪽 필터 사이드바 -->
      <aside class="filter-sidebar">
        <WEngineFilter v-model="filters" />
      </aside>

      <!-- 오른쪽 메인 컨텐츠 -->
      <main class="filter-main-content">
        <!-- 검색 및 정렬 바 -->
        <div class="filter-top-bar">
          <div class="filter-controls">
            <div class="filter-search-container">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="W-엔진 이름 검색..."
                class="input"
              />
            </div>
            <div class="filter-sort-container">
              <select v-model="sortBy" class="select">
                <option value="name">이름순</option>
                <option value="rank">등급순</option>
                <option value="type">타입순</option>
                <option value="baseATK">공격력순</option>
              </select>
            </div>
          </div>

          <!-- 결과 개수 -->
          <div class="filter-results-info">
            <p>
              총 <strong>{{ filteredWEngines.length }}</strong
              >개의 W-엔진
            </p>
          </div>
        </div>

        <!-- W-엔진 카드 그리드 -->
        <div class="filter-grid wengines-grid">
          <WEngineCard
            v-for="wengine in filteredWEngines"
            :key="wengine.id"
            :wengine="wengine"
            @click="showWEngineDetail(wengine)"
          />
        </div>

        <!-- W-엔진이 없을 때 -->
        <div v-if="filteredWEngines.length === 0" class="filter-no-results">
          <p>조건에 맞는 W-엔진이 없습니다.</p>
          <button @click="resetAll" class="filter-reset-all-btn">
            모든 필터 초기화
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useWEngineStore } from "../stores/wengineStore";
import { useFilterAndSearch } from "../composables/useFilterAndSearch";
import WEngineCard from "../components/WEngineCard.vue";
import WEngineFilter from "../components/WEngineFilter.vue";

const wengineStore = useWEngineStore();

// 컴포저블을 사용하여 필터와 검색 로직 통합
const {
  filters,
  searchQuery,
  sortBy,
  filteredItems: filteredWEngines,
  resetAll,
} = useFilterAndSearch(
  wengineStore,
  {
    rank: [],
    type: [],
    attribute: [],
  },
  "name"
);

const showWEngineDetail = (wengine) => {
  // W-엔진 상세 정보를 모달이나 다른 방식으로 표시
  console.log("W-엔진 상세:", wengine);
};
</script>

<style scoped>
/* 공통 스타일은 views.css에서 관리 */
.wengines-grid {
  /* WEngine 페이지 전용 그리드 스타일 (필요시 추가) */
}
</style>
