<template>
  <div v-if="agent" class="agent-detail">
    <!-- 뒤로가기 버튼 -->
    <button @click="goBack" class="back-btn">
      ← 에이전트 목록으로
    </button>

    <!-- 에이전트 헤더 -->
    <div class="agent-header">
      <div class="agent-portrait">
        <div v-if="!agent.image" class="portrait-placeholder">
          {{ agent.name[0] }}
        </div>
        <img v-else :src="agent.image" :alt="agent.name" />
      </div>

      <div class="agent-basic-info">
        <div class="agent-meta">
          <span class="rank-badge" :class="`rank-${agent.rank}`">{{ agent.rank }}</span>
          <span class="attribute-badge" :class="`attr-${agent.attribute}`">{{ agent.attribute }}</span>
          <span class="specialty-badge">{{ agent.specialty }}</span>
        </div>

        <h1 class="agent-title">{{ agent.name }}</h1>
        <p class="agent-faction">{{ agent.faction }}</p>
        <p class="agent-description">{{ agent.description }}</p>

        <div class="agent-tags-detail">
          <span v-for="tag in agent.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <!-- 탭 네비게이션 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 탭 컨텐츠 -->
    <div class="tab-content">
      <!-- 기본 정보 -->
      <div v-show="activeTab === 'stats'" class="content-section">
        <h2>기본 스탯</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">⚔️</div>
            <div class="stat-info">
              <span class="stat-label">기본 공격력</span>
              <span class="stat-value">{{ agent.stats?.baseAtk || 850 }}</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🛡️</div>
            <div class="stat-info">
              <span class="stat-label">기본 방어력</span>
              <span class="stat-value">{{ agent.stats?.baseDef || 650 }}</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">❤️</div>
            <div class="stat-info">
              <span class="stat-label">기본 체력</span>
              <span class="stat-value">{{ agent.stats?.baseHp || 8500 }}</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-info">
              <span class="stat-label">충격력</span>
              <span class="stat-value">{{ agent.stats?.impact || 115 }}</span>
            </div>
          </div>
        </div>

        <h2>스탯 성장</h2>
        <div class="growth-info">
          <p>레벨 60 기준 스탯</p>
          <ul class="growth-list">
            <li>공격력: <strong>{{ agent.stats?.maxAtk || 2150 }}</strong></li>
            <li>방어력: <strong>{{ agent.stats?.maxDef || 1580 }}</strong></li>
            <li>체력: <strong>{{ agent.stats?.maxHp || 21500 }}</strong></li>
          </ul>
        </div>
      </div>

      <!-- 스킬 정보 -->
      <div v-show="activeTab === 'skills'" class="content-section">
        <h2>스킬</h2>

        <div class="skill-list">
          <div class="skill-item">
            <div class="skill-header">
              <h3>기본 공격</h3>
              <span class="skill-type">일반</span>
            </div>
            <p class="skill-description">
              {{ agent.skills?.basic || '기본 공격으로 적에게 피해를 입힙니다.' }}
            </p>
          </div>

          <div class="skill-item">
            <div class="skill-header">
              <h3>특수 스킬</h3>
              <span class="skill-type skill-special">특수</span>
            </div>
            <p class="skill-description">
              {{ agent.skills?.special || '강력한 특수 공격으로 적에게 큰 피해를 입힙니다.' }}
            </p>
          </div>

          <div class="skill-item">
            <div class="skill-header">
              <h3>궁극기</h3>
              <span class="skill-type skill-ultimate">궁극기</span>
            </div>
            <p class="skill-description">
              {{ agent.skills?.ultimate || '필살기를 사용하여 적에게 막대한 피해를 입힙니다.' }}
            </p>
          </div>

          <div class="skill-item">
            <div class="skill-header">
              <h3>패시브</h3>
              <span class="skill-type skill-passive">패시브</span>
            </div>
            <p class="skill-description">
              {{ agent.skills?.passive || '특정 조건에서 추가 효과가 발동됩니다.' }}
            </p>
          </div>
        </div>
      </div>

      <!-- 육성 정보 -->
      <div v-show="activeTab === 'build'" class="content-section">
        <h2>추천 육성</h2>

        <div class="build-section">
          <h3>🎯 추천 디스크 세트</h3>
          <div class="disk-sets">
            <div class="disk-set-card">
              <h4>메인 세트</h4>
              <p>{{ agent.build?.mainSet || '속성 피해 증가 4세트' }}</p>
              <span class="disk-effect">세트 효과: 속성 피해 +10%</span>
            </div>
            <div class="disk-set-card">
              <h4>서브 세트</h4>
              <p>{{ agent.build?.subSet || '치명타 피해 2세트' }}</p>
              <span class="disk-effect">세트 효과: 치명타 피해 +12%</span>
            </div>
          </div>
        </div>

        <div class="build-section">
          <h3>📊 추천 메인 옵션</h3>
          <ul class="main-stats">
            <li><strong>4번 디스크:</strong> 치명타 확률 / 치명타 피해</li>
            <li><strong>5번 디스크:</strong> 속성 피해 보너스</li>
            <li><strong>6번 디스크:</strong> 공격력 %</li>
          </ul>
        </div>

        <div class="build-section">
          <h3>⭐ 추천 서브 옵션 우선순위</h3>
          <ol class="sub-stats">
            <li>치명타 확률 / 치명타 피해</li>
            <li>공격력 %</li>
            <li>관통력</li>
            <li>공격력</li>
          </ol>
        </div>

        <div class="build-section">
          <h3>🔧 추천 W-엔진</h3>
          <div class="weapon-list">
            <div class="weapon-card">
              <span class="weapon-rank rank-S">S급</span>
              <p>{{ agent.build?.bestWeapon || '전용 W-엔진' }}</p>
            </div>
            <div class="weapon-card">
              <span class="weapon-rank rank-A">A급</span>
              <p>{{ agent.build?.altWeapon || '범용 공격형 W-엔진' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 팀 조합 -->
      <div v-show="activeTab === 'team'" class="content-section">
        <h2>추천 팀 조합</h2>

        <div class="team-comp">
          <h3>🔥 최적 조합</h3>
          <div class="team-grid">
            <div class="team-slot main-dps">
              <span class="role-badge">메인 딜러</span>
              <p>{{ agent.name }}</p>
            </div>
            <div class="team-slot">
              <span class="role-badge">서브 딜러</span>
              <p>{{ agent.teams?.optimal?.sub || '속성 서브 딜러' }}</p>
            </div>
            <div class="team-slot">
              <span class="role-badge">지원</span>
              <p>{{ agent.teams?.optimal?.support || '속성 지원형' }}</p>
            </div>
          </div>
        </div>

        <div class="team-comp">
          <h3>💎 대체 조합</h3>
          <div class="team-grid">
            <div class="team-slot main-dps">
              <span class="role-badge">메인 딜러</span>
              <p>{{ agent.name }}</p>
            </div>
            <div class="team-slot">
              <span class="role-badge">서브 딜러</span>
              <p>{{ agent.teams?.alternative?.sub || '범용 서브 딜러' }}</p>
            </div>
            <div class="team-slot">
              <span class="role-badge">지원</span>
              <p>{{ agent.teams?.alternative?.support || '범용 지원형' }}</p>
            </div>
          </div>
        </div>

        <div class="synergy-info">
          <h3>시너지 정보</h3>
          <p>{{ agent.teams?.synergy || '같은 속성의 에이전트와 조합하면 속성 공명 효과를 받을 수 있습니다.' }}</p>
        </div>
      </div>

      <!-- 평가 -->
      <div v-show="activeTab === 'review'" class="content-section">
        <h2>종합 평가</h2>

        <div class="rating-grid">
          <div class="rating-item">
            <span class="rating-label">딜링</span>
            <div class="rating-bar">
              <div class="rating-fill" :style="{ width: (agent.rating?.damage || 85) + '%' }"></div>
            </div>
            <span class="rating-value">{{ agent.rating?.damage || 85 }}</span>
          </div>

          <div class="rating-item">
            <span class="rating-label">생존력</span>
            <div class="rating-bar">
              <div class="rating-fill" :style="{ width: (agent.rating?.survival || 70) + '%' }"></div>
            </div>
            <span class="rating-value">{{ agent.rating?.survival || 70 }}</span>
          </div>

          <div class="rating-item">
            <span class="rating-label">지원력</span>
            <div class="rating-bar">
              <div class="rating-fill" :style="{ width: (agent.rating?.support || 50) + '%' }"></div>
            </div>
            <span class="rating-value">{{ agent.rating?.support || 50 }}</span>
          </div>

          <div class="rating-item">
            <span class="rating-label">난이도</span>
            <div class="rating-bar">
              <div class="rating-fill difficulty" :style="{ width: (agent.rating?.difficulty || 60) + '%' }"></div>
            </div>
            <span class="rating-value">{{ agent.rating?.difficulty || 60 }}</span>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3>✅ 장점</h3>
            <ul>
              <li v-for="(pro, index) in (agent.pros || ['강력한 피해량', '우수한 속성 대미지'])" :key="index">
                {{ pro }}
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>⚠️ 단점</h3>
            <ul>
              <li v-for="(con, index) in (agent.cons || ['높은 육성 난이도', '특정 조합 의존성'])" :key="index">
                {{ con }}
              </li>
            </ul>
          </div>
        </div>

        <div class="recommendation">
          <h3>추천 대상</h3>
          <p>{{ agent.recommendation || '속성 딜러를 원하는 플레이어에게 추천합니다. 높은 투자 대비 우수한 성능을 발휘합니다.' }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>에이전트 정보를 불러오는 중...</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAgentStore } from '../stores/agentStore';

const route = useRoute();
const router = useRouter();
const agentStore = useAgentStore();

const activeTab = ref('stats');

const tabs = [
  { id: 'stats', label: '기본 정보' },
  { id: 'skills', label: '스킬' },
  { id: 'build', label: '육성' },
  { id: 'team', label: '팀 조합' },
  { id: 'review', label: '평가' },
];

// Store에서 에이전트 정보 가져오기
const agent = computed(() => {
  const id = parseInt(route.params.id);
  return agentStore.getAgentById(id);
});

const goBack = () => {
  router.push({ name: 'Agent' });
};
</script>

<style scoped>
.agent-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-btn {
  margin-bottom: 2rem;
  padding: 0.8rem 1.5rem;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.back-btn:hover {
  background: var(--accent-primary);
  color: #000;
  border-color: var(--accent-primary);
  transform: translateX(-5px);
}

.agent-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.agent-portrait {
  width: 300px;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-placeholder {
  font-size: 8rem;
  font-weight: bold;
  color: var(--text-muted);
}

.agent-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.agent-basic-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.agent-meta {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.rank-badge,
.attribute-badge,
.specialty-badge {
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
}

.rank-badge.rank-S {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
}

.rank-badge.rank-A {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  color: #000;
}

.attribute-badge.attr-물리 {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: #fff;
}

.attribute-badge.attr-화염 {
  background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
  color: #fff;
}

.attribute-badge.attr-얼음 {
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 100%);
  color: #fff;
}

.attribute-badge.attr-전기 {
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: #fff;
}

.attribute-badge.attr-에테르 {
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  color: #fff;
}

.attribute-badge.attr-현묵 {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: #fff;
}

.attribute-badge.attr-서리열 {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: #fff;
}

.specialty-badge {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.agent-title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.agent-faction {
  font-size: 1.2rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.agent-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.agent-tags-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.agent-tags-detail .tag {
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
  overflow-x: auto;
}

.tab-btn {
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--accent-primary);
}

.tab-btn.active {
  color: var(--accent-primary);
  border-bottom-color: var(--accent-primary);
}

.tab-content {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
}

.content-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--accent-primary);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.8rem;
}

.content-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-primary);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-primary);
}

.growth-info {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.growth-info p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.growth-list {
  list-style: none;
  padding: 0;
}

.growth-list li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.growth-list li:last-child {
  border-bottom: none;
}

.growth-list strong {
  color: var(--accent-primary);
  font-size: 1.1rem;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  border-color: var(--accent-primary);
  transform: translateX(8px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.skill-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.skill-type {
  padding: 0.3rem 0.8rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.skill-type.skill-special {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  border: none;
}

.skill-type.skill-ultimate {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
  color: #fff;
  border: none;
}

.skill-type.skill-passive {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  border: none;
}

.skill-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.build-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.build-section:last-child {
  border-bottom: none;
}

.disk-sets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.disk-set-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.disk-set-card h4 {
  font-size: 1.1rem;
  color: var(--accent-primary);
  margin-bottom: 0.8rem;
}

.disk-set-card p {
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.disk-effect {
  display: block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-style: italic;
}

.main-stats,
.sub-stats {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem 2rem;
}

.main-stats li,
.sub-stats li {
  padding: 0.8rem 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.main-stats li:last-child,
.sub-stats li:last-child {
  border-bottom: none;
}

.weapon-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.weapon-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.weapon-rank {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.weapon-rank.rank-S {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
}

.weapon-rank.rank-A {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  color: #000;
}

.weapon-card p {
  color: var(--text-primary);
  font-weight: 600;
}

.team-comp {
  margin-bottom: 2rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.team-slot {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.team-slot:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
}

.team-slot.main-dps {
  border-color: var(--accent-primary);
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(245, 158, 11, 0.1) 100%);
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.8rem;
}

.team-slot.main-dps .role-badge {
  background: var(--accent-primary);
  color: #000;
  font-weight: 700;
}

.team-slot p {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.1rem;
}

.synergy-info {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.synergy-info h3 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.synergy-info p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.rating-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.rating-item {
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  gap: 1rem;
  align-items: center;
}

.rating-label {
  font-weight: 600;
  color: var(--text-primary);
}

.rating-bar {
  height: 30px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.rating-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-hover) 100%);
  transition: width 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
}

.rating-fill.difficulty {
  background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
}

.rating-value {
  font-weight: 700;
  color: var(--accent-primary);
  text-align: center;
}

.pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.pros,
.cons {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
}

.pros h3 {
  color: #10b981;
  margin-bottom: 1rem;
}

.cons h3 {
  color: #f59e0b;
  margin-bottom: 1rem;
}

.pros ul,
.cons ul {
  list-style: none;
  padding: 0;
}

.pros li,
.cons li {
  padding: 0.6rem 0;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  padding-left: 1.5rem;
  position: relative;
}

.pros li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.cons li::before {
  content: '!';
  position: absolute;
  left: 0;
  color: #f59e0b;
  font-weight: bold;
}

.pros li:last-child,
.cons li:last-child {
  border-bottom: none;
}

.recommendation {
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(245, 158, 11, 0.1) 100%);
  border: 2px solid var(--accent-primary);
  border-radius: 12px;
  padding: 1.5rem;
}

.recommendation h3 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.recommendation p {
  color: var(--text-primary);
  line-height: 1.6;
  font-size: 1.05rem;
}

.loading {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
}

@media (max-width: 968px) {
  .agent-header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .agent-portrait {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .agent-title {
    font-size: 2rem;
  }

  .tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .tab-btn {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .rating-item {
    grid-template-columns: 80px 1fr 40px;
  }
}
</style>

