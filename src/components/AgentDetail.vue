<template>
  <div class="agent-detail" :class="agentBackgroundClass">
    <!-- 상단 에이전트 정보 -->
    <div class="agent-header">
      <!-- 좌측 상단: 랭크 및 기본 정보 -->
      <div class="agent-rank-info">
        <div class="rank-badge">{{ agentData.rank }}</div>
        <div class="agent-attributes">
          <div class="attribute-item">
            <span class="attribute-icon">{{ agentData.element.icon }}</span>
            <span class="attribute-text">{{ agentData.element.name }}</span>
          </div>
          <div class="attribute-item">
            <span class="attribute-icon">{{ agentData.role.icon }}</span>
            <span class="attribute-text">{{ agentData.role.name }}</span>
          </div>
          <div class="attribute-item">
            <span class="attribute-icon">{{ agentData.position.icon }}</span>
            <span class="attribute-text">{{ agentData.position.name }}</span>
          </div>
          <div class="attribute-item">
            <span class="attribute-text">{{ agentData.faction }}</span>
          </div>
        </div>
      </div>

      <!-- 중앙 상단: 화폐 및 에이전트 이름 -->
      <div class="agent-center-info">
        <div class="dennies">{{ agentData.dennies }}</div>
        <h1 class="agent-name">{{ agentData.name }} AGENT</h1>
      </div>

      <!-- 우측 상단: 버전 정보 -->
      <div class="version-info">
        <div class="version">{{ agentData.version }}</div>
        <div class="game-version">{{ agentData.gameVersion }}</div>
      </div>
    </div>

    <!-- 메인 컨텐츠 영역 -->
    <div class="main-content-area">
      <!-- 배경 캐릭터 이미지 -->
      <div class="character-image-container">
        <img
          :src="agentData.characterImage"
          :alt="agentData.name"
          class="character-image"
        />
      </div>

      <!-- 플로팅 정보 섹션들 -->
      <div class="floating-sections">
        <!-- 메인 스탯 -->
        <div class="info-section floating-section">
          <h3 class="section-title">메인 스탯</h3>
          <div class="stats-list">
            <div
              v-for="stat in agentData.mainStats"
              :key="stat.id"
              class="stat-item"
            >
              <span class="stat-level">{{ stat.level }}</span>
              <span class="stat-name">{{ stat.name }}</span>
            </div>
          </div>
        </div>

        <!-- 부 스탯 -->
        <div class="info-section floating-section">
          <h3 class="section-title">부 스탯</h3>
          <div class="stats-list">
            <div
              v-for="stat in agentData.subStats"
              :key="stat.id"
              class="stat-item"
            >
              <span class="stat-number">{{ stat.number }}</span>
              <span class="stat-name">{{ stat.name }}</span>
            </div>
          </div>
        </div>

        <!-- 다지 (기타 정보) -->
        <div class="info-section floating-section">
          <h3 class="section-title">다지</h3>
          <div class="daji-content">
            <div class="daji-item">
              <span class="daji-label">파</span>
              <span class="daji-value">32</span>
            </div>
            <div class="daji-item">
              <span class="daji-label">길지</span>
            </div>
            <div class="cinema-preview-small">
              <img
                :src="agentData.cinema.preview"
                :alt="agentData.cinema.title"
                class="cinema-preview-img"
              />
              <span class="cinema-label">엘렌조 시네마</span>
            </div>
          </div>
        </div>

        <!-- 형상 시네마 -->
        <div class="info-section floating-section">
          <h3 class="section-title">형상 시네마</h3>
          <div class="cinema-episodes">
            <div
              v-for="episode in agentData.cinema.episodes"
              :key="episode.id"
              class="episode-item"
            >
              <span class="episode-number">{{ episode.number }}</span>
              <span class="episode-title">{{ episode.title }}</span>
            </div>
          </div>
          <div class="cinema-character">
            <img
              :src="agentData.characterImage"
              :alt="agentData.name"
              class="character-mini"
            />
            <span class="character-name">{{ agentData.name }}</span>
          </div>
        </div>

        <!-- 방부 -->
        <div class="info-section floating-section">
          <h3 class="section-title">방부</h3>
          <div class="support-list">
            <div
              v-for="support in agentData.supports"
              :key="support.id"
              class="support-item"
            >
              <img
                :src="support.image"
                :alt="support.name"
                class="support-icon"
              />
              <span class="support-name">{{ support.name }}</span>
            </div>
          </div>
        </div>

        <!-- 파티 -->
        <div class="info-section floating-section">
          <h3 class="section-title">파티</h3>
          <div class="party-row">
            <div
              v-for="member in agentData.party.slice(0, 3)"
              :key="member.id"
              class="party-member"
              :class="{ 'best-pick': member.isBestPick }"
            >
              <img :src="member.image" :alt="member.name" class="member-icon" />
              <span class="member-name">캐릭터{{ member.id }}</span>
              <span v-if="member.isBestPick" class="best-label">베스</span>
            </div>
          </div>
        </div>

        <!-- 디스크 -->
        <div class="info-section floating-section">
          <h3 class="section-title">디스크</h3>
          <div class="disk-row">
            <div
              v-for="disk in agentData.disks.slice(0, 3)"
              :key="disk.id"
              class="disk-item"
            >
              <img :src="disk.image" :alt="disk.name" class="disk-icon" />
              <div class="disk-info">
                <span class="disk-name">{{ disk.name }}</span>
                <span class="disk-points">{{ disk.points }}P</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

// 라우터 파라미터 가져오기
const route = useRoute();

// Props 정의 (컴포넌트로 직접 전달받을 때)
const props = defineProps({
  agentId: {
    type: [String, Number],
    default: null,
  },
});

// agentId 계산 (라우터 파라미터 우선, props는 fallback)
const agentId = computed(() => {
  return props.agentId || route.params.id;
});

// 에이전트 데이터 (나중에 API에서 가져올 예정)
const agentData = ref({
  // 기본 정보
  rank: "S RANK",
  element: { icon: "❄️", name: "얼음" },
  role: { icon: "⚔️", name: "강공" },
  position: { icon: "🎯", name: "메인딜러" },
  faction: "빅토리아 하우스키핑",
  dennies: "1,300,000 DENNIES",
  name: "엘렌 조",
  version: "1.0V",
  gameVersion: "Z.Z.Z 1.0 VERSION",

  // 캐릭터 이미지
  characterImage: "/src/assets/images/agents/ellen-jo.png",

  // 돌파 재료
  breakthroughMaterials: [
    {
      id: 1,
      name: "녹색 재료",
      image: "/src/assets/images/materials/green.png",
      count: 4,
    },
    {
      id: 2,
      name: "파란색 재료",
      image: "/src/assets/images/materials/blue.png",
      count: 32,
    },
    {
      id: 3,
      name: "분홍색 재료",
      image: "/src/assets/images/materials/pink.png",
      count: 30,
    },
  ],

  // 스킬 재료
  skillMaterials: [
    {
      id: 1,
      name: "파란색 재료",
      image: "/src/assets/images/materials/blue.png",
      count: 5,
    },
    {
      id: 2,
      name: "파란색 재료",
      image: "/src/assets/images/materials/blue.png",
      count: 15,
    },
    {
      id: 3,
      name: "파란색 재료",
      image: "/src/assets/images/materials/blue.png",
      count: 50,
    },
    {
      id: 4,
      name: "금색 재료",
      image: "/src/assets/images/materials/gold.png",
      count: 1,
    },
  ],

  // W 엔진
  wEngines: [
    {
      id: 1,
      name: "심해 방문객",
      image: "/src/assets/images/engines/engine1.png",
      rating: "BEST",
    },
    {
      id: 2,
      name: "스트리트 슈퍼스타",
      image: "/src/assets/images/engines/engine2.png",
      rating: "GOOD",
    },
  ],

  // 디스크
  disks: [
    {
      id: 1,
      name: "극지 메탈",
      image: "/src/assets/images/disks/disk1.png",
      points: 4,
    },
    {
      id: 2,
      name: "딱따구리 일렉트로",
      image: "/src/assets/images/disks/disk2.png",
      points: 2,
    },
    {
      id: 3,
      name: "복어 일렉트로",
      image: "/src/assets/images/disks/disk3.png",
      points: 2,
    },
    {
      id: 4,
      name: "스윙 재즈",
      image: "/src/assets/images/disks/disk4.png",
      points: 2,
    },
  ],

  // 메인 스탯
  mainStats: [
    { id: 1, level: "IV", name: "치명타 확률/피해" },
    { id: 2, level: "V", name: "얼음 속성 피해 보너스" },
    { id: 3, level: "VI", name: "공격력 %" },
  ],

  // 부 스탯
  subStats: [
    { id: 1, number: 1, name: "치명타 확률/피해" },
    { id: 2, number: 2, name: "공격력 %" },
    { id: 3, number: 3, name: "관통률" },
  ],

  // 형상 시네마
  cinema: {
    title: "엘렌 조 시네마",
    preview: "/src/assets/images/cinema/ellen-preview.png",
    episodes: [
      { id: 1, number: "01", title: "혹독한 겨울의 징조" },
      { id: 2, number: "02", title: "극해의 포식자" },
      { id: 3, number: "06", title: "연회의 시간" },
    ],
  },

  // 방부
  supports: [
    { id: 1, name: "샤크부", image: "/src/assets/images/supports/shark.png" },
    { id: 2, name: "버틀러", image: "/src/assets/images/supports/butler.png" },
    { id: 3, name: "펭귄부", image: "/src/assets/images/supports/penguin.png" },
  ],

  // 파티
  party: [
    {
      id: 1,
      name: "캐릭터1",
      image: "/src/assets/images/party/char1.png",
      isBestPick: true,
    },
    {
      id: 2,
      name: "캐릭터2",
      image: "/src/assets/images/party/char2.png",
      isBestPick: true,
    },
    {
      id: 3,
      name: "캐릭터3",
      image: "/src/assets/images/party/char3.png",
      isBestPick: false,
    },
    {
      id: 4,
      name: "캐릭터4",
      image: "/src/assets/images/party/char4.png",
      isBestPick: false,
    },
    {
      id: 5,
      name: "캐릭터5",
      image: "/src/assets/images/party/char5.png",
      isBestPick: false,
    },
    {
      id: 6,
      name: "캐릭터6",
      image: "/src/assets/images/party/char6.png",
      isBestPick: false,
    },
  ],
});

// 에이전트별 배경 클래스 (나중에 동적으로 설정)
const agentBackgroundClass = computed(() => {
  return `agent-bg-${agentId.value}`;
});

// 에이전트 데이터 로드 (나중에 API 호출로 변경)
const loadAgentData = (id) => {
  // 여기서 agentId에 따라 다른 데이터를 로드
  console.log(`Loading data for agent: ${id}`);
  // 실제로는 API 호출로 데이터를 가져올 예정
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadAgentData(agentId.value);
});

// agentId 변경 감지
watch(agentId, (newId) => {
  if (newId) {
    loadAgentData(newId);
  }
});
</script>

<style>
/* AgentDetail 스타일은 src/styles/components/agent-detail.css에서 관리됩니다 */
</style>
