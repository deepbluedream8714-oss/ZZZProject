<template>
  <div class="agent-page">
    <div class="content-wrapper">
      <!-- 왼쪽 필터 사이드바 -->
      <aside class="filter-sidebar">
        <AgentFilter v-model="filters" />
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
                placeholder="에이전트 이름 검색..."
                class="input"
              />
            </div>
            <div class="sort-container">
              <select v-model="sortBy" class="select">
                <option value="name">이름순</option>
                <option value="rank">등급순</option>
                <option value="faction">소속순</option>
              </select>
            </div>
          </div>

          <!-- 결과 개수 -->
          <div class="results-info">
            <p>총 <strong>{{ filteredAgents.length }}</strong>명의 에이전트</p>
          </div>
        </div>

        <!-- 에이전트 카드 그리드 -->
        <div class="agents-grid">
          <AgentCard
            v-for="agent in filteredAgents"
            :key="agent.id"
            :agent="agent"
            @click="goToDetail(agent.id)"
          />
        </div>

        <!-- 에이전트가 없을 때 -->
        <div v-if="filteredAgents.length === 0" class="no-results">
          <p>조건에 맞는 에이전트가 없습니다.</p>
          <button @click="resetAll" class="reset-all-btn">모든 필터 초기화</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAgentStore } from '../stores/agentStore';
import AgentCard from '../components/AgentCard.vue';
import AgentFilter from '../components/AgentFilter.vue';

const router = useRouter();
const agentStore = useAgentStore();

const filters = ref({
  rank: [],
  attribute: [],
  specialty: [],
  faction: []
});

const searchQuery = ref('');
const sortBy = ref('name');

const filteredAgents = computed(() => {
  // 1. 필터 적용
  let result = agentStore.filterAgents(filters.value);

  // 2. 검색 적용
  if (searchQuery.value) {
    result = agentStore.searchAgents(searchQuery.value);
    // 검색 후에도 필터 적용
    if (filters.value.rank.length > 0 || filters.value.attribute.length > 0 ||
        filters.value.specialty.length > 0 || filters.value.faction.length > 0) {
      result = result.filter(agent => {
        return (!filters.value.rank.length || filters.value.rank.includes(agent.rank)) &&
               (!filters.value.attribute.length || filters.value.attribute.includes(agent.attribute)) &&
               (!filters.value.specialty.length || filters.value.specialty.includes(agent.specialty)) &&
               (!filters.value.faction.length || filters.value.faction.includes(agent.faction));
      });
    }
  }

  // 3. 정렬 적용
  return agentStore.sortAgents(result, sortBy.value);
});

const goToDetail = (agentId) => {
  router.push({ name: 'AgentDetail', params: { id: agentId } });
};

const resetAll = () => {
  filters.value = {
    rank: [],
    attribute: [],
    specialty: [],
    faction: []
  };
  searchQuery.value = '';
};
</script>

<style scoped>
.agent-page {
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

.agents-grid {
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
  .agents-grid {
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

  .agents-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .agent-page {
    padding: 1rem;
  }

  .content-wrapper {
    gap: 1rem;
  }

  .agents-grid {
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
  .agents-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

