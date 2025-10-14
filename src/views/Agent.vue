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
import AgentCard from '../components/AgentCard.vue';
import AgentFilter from '../components/AgentFilter.vue';

const router = useRouter();

// 샘플 데이터
const agents = ref([
  {
    id: 1,
    name: '엘렌 조',
    rank: 'S',
    attribute: '얼음',
    faction: '빅토리아 하우스키핑',
    specialty: '강공',
    tags: ['치명타', '얼음', '메인딜러'],
    image: new URL('../assets/images/charactor/빅토리아 하우스키핑/빅토리아_엘렌 조.png', import.meta.url).href,
    description: '빅토리아 하우스키핑의 강력한 얼음 강공 딜러',
  },
  {
    id: 2,
    name: '주연',
    rank: 'S',
    attribute: '에테르',
    faction: '형사특수팀',
    specialty: '강공',
    tags: ['에테르', '강공'],
    image: new URL('../assets/images/charactor/형사특수팀/형사특수팀_주연.png', import.meta.url).href,
    description: '형사특수팀 강공 딜러',
  },
  {
    id: 3,
    name: '네코미야 마나',
    rank: 'S',
    attribute: '물리',
    faction: '교활한 토끼굴',
    specialty: '강공',
    tags: ['물리', '메인딜러', '기동력'],
    image: new URL('../assets/images/charactor/토끼굴/토끼굴_네코미야 마나.png', import.meta.url).href,
    description: '교활한 토끼굴의 물리 딜러',
  },
  {
    id: 4,
    name: '11호',
    rank: 'S',
    attribute: '화염',
    faction: '오볼로스 소대',
    specialty: '강공',
    tags: ['화염', '메인딜러'],
    image: new URL('../assets/images/charactor/오볼로스/오볼로스_11호.png', import.meta.url).href,
    description: '오볼로스 소대의 상시 S급 딜러',
  },
  {
    id: 5,
    name: '알렉산드리나',
    rank: 'S',
    attribute: '전기',
    faction: '빅토리아 하우스키핑',
    specialty: '지원',
    tags: ['전기', '관통'],
    image: new URL('../assets/images/charactor/빅토리아 하우스키핑/빅토리아_알렉산드리나.png', import.meta.url).href,
    description: '빅토리아 하우스키핑의 상시 S급 지원',
  },
  {
    id: 6,
    name: '앤비',
    rank: 'A',
    attribute: '전기',
    faction: '교활한 토끼굴',
    specialty: '격파',
    tags: ['전기', '격파'],
    image: new URL('../assets/images/charactor/토끼굴/토끼굴_엔비 데마라.png', import.meta.url).href,
    description: '교활한 토끼굴의 메인 격파',
  },
  {
    id: 7,
    name: '콜레다',
    rank: 'S',
    attribute: '화염',
    faction: '벨로보그 중공업',
    specialty: '격파',
    tags: ['화염', '격파'],
    image: new URL('../assets/images/charactor/벨로보그 중공업/벨로보그_콜레다 벨로보그.png', import.meta.url).href,
    description: '벨로보그 중공업의 격파',
  },
  {
    id: 8,
    name: '그레이스',
    rank: 'S',
    attribute: '전기',
    faction: '벨로보그 중공업',
    specialty: '이상',
    tags: ['감전', '이상'],
    image: new URL('../assets/images/charactor/벨로보그 중공업/벨로보그_그레이스 하워드.png', import.meta.url).href,
    description: '벨로보그 중공업의 전기 이상딜러',
  },
  {
    id: 9,
    name: '벤',
    rank: 'A',
    attribute: '화염',
    faction: '벨로보그 중공업',
    specialty: '방어',
    tags: ['화염', '방어'],
    image: new URL('../assets/images/charactor/벨로보그 중공업/벨로보그_벤 비거.png', import.meta.url).href,
    description: '벨로보그 중공업의 든든한 방패',
  },
  {
    id: 10,
    name: '니콜',
    rank: 'A',
    attribute: '에테르',
    faction: '교활한 토끼굴',
    specialty: '지원',
    tags: ['버프', '에테르', '지원'],
    image: new URL('../assets/images/charactor/토끼굴/토끼굴_니콜 데마라.png', import.meta.url).href,
    description: '교활한 토끼굴의 지원 전문가',
  },
  {
    id: 11,
    name: '앤톤',
    rank: 'A',
    attribute: '전기',
    faction: '벨로보그 중공업',
    specialty: '강공',
    tags: ['전기', '메인딜러', '감전'],
    image: new URL('../assets/images/charactor/벨로보그 중공업/벨로보그_앤톤 이바노프.png', import.meta.url).href,
    description: '벨로보그 중공업의 전기 기술자',
  },
  {
    id: 12,
    name: '코린',
    rank: 'A',
    attribute: '물리',
    faction: '빅토리아 하우스키핑',
    specialty: '강공',
    tags: ['물리', '메인딜러', '치명타'],
    image: new URL('../assets/images/charactor/빅토리아 하우스키핑/빅토리아_코린 위크스.png', import.meta.url).href,
    description: '빅토리아 하우스키핑의 메이드',
  },
  {
    id: 13,
    name: '라이칸',
    rank: 'S',
    attribute: '얼음',
    faction: '빅토리아 하우스키핑',
    specialty: '격파',
    tags: ['얼음', '격파', '기절'],
    image: new URL('../assets/images/charactor/빅토리아 하우스키핑/빅토리아_본 리카온.png', import.meta.url).href,
    description: '빅토리아 하우스키핑의 집사이자 격파 전문가',
  },
  {
    id: 14,
    name: '제인 도',
    rank: 'S',
    attribute: '물리',
    faction: '형사특수팀',
    specialty: '이상',
    tags: ['물리', '이상', '디버프'],
    image: new URL('../assets/images/charactor/형사특수팀/형사특수팀_제인 도.png', import.meta.url).href,
    description: '형사특수팀의 물리 이상 딜러',
  },
  {
    id: 15,
    name: '청의',
    rank: 'S',
    attribute: '얼음',
    faction: '형사특수팀',
    specialty: '격파',
    tags: ['얼음', '격파', '서브딜러'],
    image: new URL('../assets/images/charactor/형사특수팀/형사특수팀_청의.png', import.meta.url).href,
    description: '형사특수팀의 얼음 격파 전문가',
  },
  {
    id: 16,
    name: '빌리 키드',
    rank: 'A',
    attribute: '물리',
    faction: '교활한 토끼굴',
    specialty: '강공',
    tags: ['물리', '강공', '속사'],
    image: new URL('../assets/images/charactor/토끼굴/토끼굴_빌리 키드.png', import.meta.url).href,
    description: '교활한 토끼굴의 총잡이',
  },
  {
    id: 17,
    name: '소우카쿠',
    rank: 'A',
    attribute: '얼음',
    faction: '대공동 6과',
    specialty: '지원',
    tags: ['얼음', '지원', '버프'],
    image: new URL('../assets/images/charactor/대공동 6과/대공동 6과_소우카쿠.png', import.meta.url).href,
    description: '대공동 6과의 지원형 에이전트',
  },
  {
    id: 18,
    name: '야나기',
    rank: 'S',
    attribute: '전기',
    faction: '대공동 6과',
    specialty: '이상',
    tags: ['전기', '이상', '감전'],
    image: new URL('../assets/images/charactor/대공동 6과/대공동 6과_츠키시로 야나기.png', import.meta.url).href,
    description: '대공동 6과의 전기 이상 딜러',
  },
  {
    id: 19,
    name: '미야비',
    rank: 'S',
    attribute: '얼음',
    faction: '대공동 6과',
    specialty: '이상',
    tags: ['얼음', '이상', '동결'],
    image: new URL('../assets/images/charactor/대공동 6과/대공동 6과_호시미 미야비.png', import.meta.url).href,
    description: '대공동 6과의 얼음 이상 딜러',
  },
  {
    id: 20,
    name: '하루마사',
    rank: 'S',
    attribute: '전기',
    faction: '대공동 6과',
    specialty: '강공',
    tags: ['전기', '강공', '치명타'],
    image: new URL('../assets/images/charactor/대공동 6과/대공동 6과_아사바 하루마사.png', import.meta.url).href,
    description: '대공동 6과의 전기 강공 딜러',
  },
]);

const filters = ref({
  rank: [],
  attribute: [],
  specialty: [],
  faction: []
});

const searchQuery = ref('');
const sortBy = ref('name');

const filteredAgents = computed(() => {
  let result = agents.value;

  // 검색 필터
  if (searchQuery.value) {
    result = result.filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // 등급 필터
  if (filters.value.rank.length > 0) {
    result = result.filter(agent => filters.value.rank.includes(agent.rank));
  }

  // 속성 필터
  if (filters.value.attribute.length > 0) {
    result = result.filter(agent => filters.value.attribute.includes(agent.attribute));
  }

  // 특성 필터
  if (filters.value.specialty.length > 0) {
    result = result.filter(agent => filters.value.specialty.includes(agent.specialty));
  }

  // 소속 필터
  if (filters.value.faction.length > 0) {
    result = result.filter(agent => filters.value.faction.includes(agent.faction));
  }

  // 정렬
  result.sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name, 'ko');
    } else if (sortBy.value === 'rank') {
      const rankOrder = { 'S': 3, 'A': 2, 'B': 1 };
      return rankOrder[b.rank] - rankOrder[a.rank];
    } else if (sortBy.value === 'faction') {
      return a.faction.localeCompare(b.faction, 'ko');
    }
    return 0;
  });

  return result;
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
  margin-top: 0; /* 필터 시작점과 상단 정렬 */
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

.search-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1.5px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.sort-container {
  min-width: 130px;
}

.sort-select {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1.5px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:focus {
  outline: none;
  border-color: var(--accent-primary);
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
