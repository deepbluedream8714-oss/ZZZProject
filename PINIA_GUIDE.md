# 📦 Pinia 상태 관리 가이드

## 🎯 Pinia란?

Vue의 공식 상태 관리 라이브러리로, Vuex의 후속 버전입니다.

### 장점
- ✅ TypeScript 지원 우수
- ✅ DevTools 통합
- ✅ 간결한 문법
- ✅ 모듈화 용이
- ✅ Composition API와 완벽한 통합

---

## 🏗️ 프로젝트 구조

```
src/stores/
└── agentStore.js    # 에이전트 데이터 및 로직 관리
```

---

## 📝 agentStore.js 구조

### State (데이터)
```javascript
state: () => ({
  agents: [...]  // 모든 에이전트 데이터
})
```

### Getters (계산된 값)
```javascript
getters: {
  getAgentById: (state) => (id) => {...},      // ID로 조회
  getAgentsByRank: (state) => (rank) => {...}, // 등급별 조회
  totalAgents: (state) => state.agents.length, // 전체 수
}
```

### Actions (메서드)
```javascript
actions: {
  filterAgents(filters) {...},     // 필터링
  searchAgents(query) {...},       // 검색
  sortAgents(agents, sortBy) {...}, // 정렬
  addAgent(agent) {...},           // 추가
  updateAgent(id, updates) {...},  // 수정
  deleteAgent(id) {...},           // 삭제
}
```

---

## 💻 사용 방법

### 1. Store 가져오기

```javascript
import { useAgentStore } from '../stores/agentStore';

const agentStore = useAgentStore();
```

### 2. 데이터 조회

```javascript
// 전체 에이전트
const allAgents = agentStore.agents;

// ID로 조회
const agent = agentStore.getAgentById(1);

// 등급별 조회
const sRankAgents = agentStore.getAgentsByRank('S');

// 전체 수
const total = agentStore.totalAgents;
```

### 3. 필터/검색/정렬

```javascript
// 필터링
const filtered = agentStore.filterAgents({
  rank: ['S'],
  attribute: ['얼음', '화염'],
  faction: ['빅토리아 하우스키핑']
});

// 검색
const searched = agentStore.searchAgents('엘렌');

// 정렬
const sorted = agentStore.sortAgents(agents, 'name');
```

### 4. 데이터 수정 (관리자 기능)

```javascript
// 에이전트 추가
agentStore.addAgent({
  name: '새 에이전트',
  rank: 'S',
  // ...
});

// 에이전트 수정
agentStore.updateAgent(1, {
  description: '업데이트된 설명'
});

// 에이전트 삭제
agentStore.deleteAgent(1);
```

---

## 🔄 실제 사용 예시

### Agent.vue (목록 페이지)

```javascript
const agentStore = useAgentStore();
const filters = ref({ rank: [], attribute: [] });

const filteredAgents = computed(() => {
  let result = agentStore.filterAgents(filters.value);
  return agentStore.sortAgents(result, 'name');
});
```

### AgentDetail.vue (상세 페이지)

```javascript
const agentStore = useAgentStore();
const route = useRoute();

const agent = computed(() => {
  return agentStore.getAgentById(route.params.id);
});
```

---

## 🚀 향후 백엔드 연동

### API와 통합

```javascript
// stores/agentStore.js
import api from '../services/api';

export const useAgentStore = defineStore('agent', {
  state: () => ({
    agents: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAgents() {
      this.loading = true;
      this.error = null;

      try {
        const data = await api.getAgents();
        this.agents = data.data;
      } catch (error) {
        this.error = error.message;
        console.error('에이전트 로드 실패:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAgentById(id) {
      try {
        const data = await api.getAgentById(id);
        // 기존 agents 배열 업데이트
        const index = this.agents.findIndex(a => a.id === id);
        if (index !== -1) {
          this.agents[index] = data.data;
        }
        return data.data;
      } catch (error) {
        console.error('에이전트 조회 실패:', error);
        throw error;
      }
    }
  }
});
```

### 컴포넌트에서 사용

```javascript
import { onMounted } from 'vue';
import { useAgentStore } from '../stores/agentStore';

const agentStore = useAgentStore();

onMounted(async () => {
  await agentStore.fetchAgents();
});
```

---

## 🎨 Pinia DevTools

### 설치
브라우저에서 Vue DevTools 확장 프로그램 설치

### 사용
1. 개발 서버 실행 (`npm run dev`)
2. 브라우저 DevTools 열기
3. Vue 탭 → Pinia
4. Store 상태 실시간 확인 및 수정 가능

---

## 💡 Best Practices

### 1. Store 분리
```javascript
// stores/agentStore.js   - 에이전트 관련
// stores/userStore.js    - 사용자 관련
// stores/uiStore.js      - UI 상태 관리
```

### 2. 네이밍 컨벤션
- **State**: 명사 (agents, loading, error)
- **Getters**: get으로 시작 (getAgentById)
- **Actions**: 동사 (fetchAgents, updateAgent)

### 3. 에러 처리
```javascript
actions: {
  async fetchData() {
    try {
      // API 호출
    } catch (error) {
      this.error = error.message;
      // 사용자에게 알림
    }
  }
}
```

### 4. 로딩 상태 관리
```javascript
state: () => ({
  loading: false,
  error: null
}),

actions: {
  async fetchData() {
    this.loading = true;
    this.error = null;
    try {
      // ...
    } finally {
      this.loading = false;
    }
  }
}
```

---

## 🔧 디버깅 팁

### State 로깅
```javascript
console.log('현재 agents:', agentStore.agents);
console.log('총 에이전트 수:', agentStore.totalAgents);
```

### Actions 테스트
```javascript
// 브라우저 콘솔에서
const store = useAgentStore();
store.addAgent({ name: '테스트' });
```

---

## 📚 참고 자료

- [Pinia 공식 문서](https://pinia.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia vs Vuex](https://pinia.vuejs.org/introduction.html#comparison-with-vuex)

---

**Pinia로 깔끔한 상태 관리를 즐기세요!** 🎉

