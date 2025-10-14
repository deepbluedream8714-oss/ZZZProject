import { defineStore } from 'pinia';

export const useAgentStore = defineStore('agent', {
  state: () => ({
    agents: [
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
        stats: {
          baseAtk: 875,
          baseDef: 625,
          baseHp: 9200,
          impact: 120,
          maxAtk: 2240,
          maxDef: 1620,
          maxHp: 23800,
        },
        skills: {
          basic: '얼음 참격으로 적을 공격하며, 연속 공격 시 피해가 증가합니다.',
          special: '강력한 돌진 공격으로 적에게 큰 얼음 피해를 입히고 얼림 효과를 부여합니다.',
          ultimate: '궁극의 얼음 참격을 발동하여 광역 피해를 입히고 적을 동결시킵니다.',
          passive: '치명타 발생 시 공격 속도가 증가하며, 얼음 피해가 강화됩니다.',
        },
        build: {
          mainSet: '얼음 피해 증가 4세트',
          subSet: '치명타 피해 2세트',
          bestWeapon: '깊은 바다의 방문객 (전용)',
          altWeapon: '캐넌 로터',
        },
        teams: {
          optimal: {
            sub: '리카온',
            support: '소우카쿠',
          },
          alternative: {
            sub: '앤비',
            support: '니콜',
          },
          synergy: '얼음 속성 에이전트와 조합 시 속성 공명으로 얼음 저항 감소 및 피해 증가 효과를 받습니다.',
        },
        rating: {
          damage: 95,
          survival: 65,
          support: 40,
          difficulty: 55,
        },
        pros: [
          '최상급 단일 대상 딜량',
          '우수한 기동력과 회피 능력',
          '얼음 속성 최고의 메인 딜러',
          '치명타 기반의 폭발적인 피해',
        ],
        cons: [
          '광역 딜링 능력 부족',
          '얼음 저항이 높은 적에게 불리',
          '높은 스킬 의존도',
          '전용 무기 필요성',
        ],
        recommendation: '얼음 메인 딜러를 찾는 플레이어에게 최고의 선택입니다. 높은 투자 대비 최상급 성능을 발휘하며, 특히 보스전에서 압도적인 딜량을 자랑합니다.',
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
        name: '리카온',
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
    ],
  }),

  getters: {
    // ID로 에이전트 찾기
    getAgentById: (state) => (id) => {
      return state.agents.find(agent => agent.id === parseInt(id));
    },

    // 등급별 필터
    getAgentsByRank: (state) => (rank) => {
      return state.agents.filter(agent => agent.rank === rank);
    },

    // 속성별 필터
    getAgentsByAttribute: (state) => (attribute) => {
      return state.agents.filter(agent => agent.attribute === attribute);
    },

    // 소속별 필터
    getAgentsByFaction: (state) => (faction) => {
      return state.agents.filter(agent => agent.faction === faction);
    },

    // 전체 에이전트 수
    totalAgents: (state) => state.agents.length,

    // S등급 에이전트 수
    sRankCount: (state) => state.agents.filter(a => a.rank === 'S').length,

    // A등급 에이전트 수
    aRankCount: (state) => state.agents.filter(a => a.rank === 'A').length,
  },

  actions: {
    // 복합 필터 (여러 조건)
    filterAgents(filters) {
      let result = this.agents;

      if (filters.rank && filters.rank.length > 0) {
        result = result.filter(agent => filters.rank.includes(agent.rank));
      }

      if (filters.attribute && filters.attribute.length > 0) {
        result = result.filter(agent => filters.attribute.includes(agent.attribute));
      }

      if (filters.specialty && filters.specialty.length > 0) {
        result = result.filter(agent => filters.specialty.includes(agent.specialty));
      }

      if (filters.faction && filters.faction.length > 0) {
        result = result.filter(agent => filters.faction.includes(agent.faction));
      }

      return result;
    },

    // 검색
    searchAgents(query) {
      if (!query) return this.agents;

      const lowerQuery = query.toLowerCase();
      return this.agents.filter(agent =>
        agent.name.toLowerCase().includes(lowerQuery) ||
        agent.description.toLowerCase().includes(lowerQuery) ||
        agent.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    },

    // 정렬
    sortAgents(agents, sortBy) {
      const sorted = [...agents];

      if (sortBy === 'name') {
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
      } else if (sortBy === 'rank') {
        const rankOrder = { 'S': 2, 'A': 1 };
        return sorted.sort((a, b) => rankOrder[b.rank] - rankOrder[a.rank]);
      } else if (sortBy === 'faction') {
        return sorted.sort((a, b) => a.faction.localeCompare(b.faction, 'ko'));
      }

      return sorted;
    },

    // 에이전트 추가 (향후 관리자 기능용)
    addAgent(agent) {
      const newId = Math.max(...this.agents.map(a => a.id)) + 1;
      this.agents.push({ ...agent, id: newId });
    },

    // 에이전트 업데이트
    updateAgent(id, updates) {
      const index = this.agents.findIndex(a => a.id === id);
      if (index !== -1) {
        this.agents[index] = { ...this.agents[index], ...updates };
      }
    },

    // 에이전트 삭제
    deleteAgent(id) {
      const index = this.agents.findIndex(a => a.id === id);
      if (index !== -1) {
        this.agents.splice(index, 1);
      }
    },
  },
});

