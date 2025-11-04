<template>
  <div class="agent-page">
    <div class="content-wrapper">
      <!-- 왼쪽 필터 사이드바 -->
      <aside class="filter-sidebar">
        <AgentFilter v-model="filters" />
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
                placeholder="에이전트 이름 검색..."
                class="input"
              />
            </div>
            <div class="filter-sort-container">
              <select v-model="sortBy" class="select">
                <option value="name">이름순</option>
                <option value="rank">등급순</option>
                <option value="faction">소속순</option>
              </select>
            </div>
          </div>

          <!-- 결과 개수 -->
          <div class="filter-results-info">
            <p>총 <strong>{{ filteredAgents.length }}</strong>명의 에이전트</p>
          </div>
        </div>

        <!-- 에이전트 카드 그리드 -->
        <div class="filter-grid agents-grid">
          <AgentCard
            v-for="agent in filteredAgents"
            :key="agent.id"
            :agent="agent"
            @click="goToDetail(agent.id)"
          />
        </div>

        <!-- 에이전트가 없을 때 -->
        <div v-if="filteredAgents.length === 0" class="filter-no-results">
          <p>조건에 맞는 에이전트가 없습니다.</p>
          <button @click="resetAll" class="filter-reset-all-btn">모든 필터 초기화</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAgentStore } from '../stores/agentStore';
import { useFilterAndSearch } from '../composables/useFilterAndSearch';
import AgentCard from '../components/AgentCard.vue';
import AgentFilter from '../components/AgentFilter.vue';

const router = useRouter();
const agentStore = useAgentStore();

// 컴포저블을 사용하여 필터와 검색 로직 통합
const {
  filters,
  searchQuery,
  sortBy,
  filteredItems: filteredAgents,
  resetAll,
} = useFilterAndSearch(
  agentStore,
  {
    rank: [],
    attribute: [],
    specialty: [],
    faction: [],
  },
  'name'
);

const goToDetail = (agentId) => {
  router.push({ name: 'AgentDetail', params: { id: agentId } });
};
</script>

<style scoped>
/* 공통 스타일은 views.css에서 관리 */
.agents-grid {
  /* Agent 페이지 전용 그리드 스타일 (필요시 추가) */
}
</style>

