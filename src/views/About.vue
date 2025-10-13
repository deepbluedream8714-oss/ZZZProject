<template>
  <div class="about">
    <h1>에이전트 정보</h1>
    <div class="content">
      <section class="about-section">
        <h2>우리는 누구인가요?</h2>
        <p>
          우리는 최고의 서비스를 제공하기 위해 노력하는 팀입니다.
          고객의 만족을 최우선으로 생각하며, 혁신적인 솔루션을 제공합니다.
        </p>
      </section>

      <section class="about-section">
        <h2>우리의 비전</h2>
        <p>
          더 나은 미래를 위한 기술을 개발하고,
          사용자 중심의 경험을 제공하는 것이 우리의 목표입니다.
        </p>
      </section>

      <section class="about-section">
        <h2>우리의 가치</h2>
        <div class="values">
          <div class="value-item">
            <h3>혁신</h3>
            <p>끊임없는 도전과 창의적인 사고</p>
          </div>
          <div class="value-item">
            <h3>신뢰</h3>
            <p>고객과의 약속을 지키는 정직함</p>
          </div>
          <div class="value-item">
            <h3>협력</h3>
            <p>함께 성장하는 파트너십</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.about h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.content {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.about-section {
  margin-bottom: 3rem;
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  font-size: 1.8rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.about-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.value-item {
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border-left: 4px solid var(--accent-primary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.value-item:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--glow);
}

.value-item h3 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.value-item p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}
</style>

