<template>
  <div class="home">
    <div class="main_banner_section">
      <div class="main_banner_background">
        <video autoplay loop muted playsinline class="banner-video">
          <source src="../assets/movie/Zenless.mp4" type="video/mp4">
        </video>
        <div class="video-overlay"></div>
      </div>

      <!-- 좌측 상단 텍스트 -->
      <div class="main_banner_text">
        <h1>아스트리드의 제작소입니다.</h1>
        <p class="subtitle">메인 페이지입니다</p>
      </div>

      <!-- 우측 하단 콘텐츠 -->
      <div class="main_banner_content">
        <p>혼자만의 공방입니다.</p>
        <p>상단 메뉴를 통해 다양한 페이지를 탐색해보세요.</p>
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <h3>ℹ️ 에이전트 정보</h3>
        <p>우리에 대해 자세히 알아보세요</p>
      </div>
      <div class="feature-card">
        <h3>⚙️ W-Engine</h3>
        <p>W엔진 정보를 확인하세요</p>
      </div>
      <div class="feature-card">
        <h3>📧 강습전</h3>
        <p>강습전 세팅/보스 공략을 확인하세요</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.main_banner_section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  min-height: 500px;
}

.main_banner_background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

/* 좌측 상단 텍스트 */
.main_banner_text {
  position: absolute;
  top: 3rem;
  left: 3rem;
  z-index: 3;
  text-align: left;
  max-width: 50%;
}

.main_banner_text h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  line-height: 1.2;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 0;
  color: var(--accent-primary);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

/* 우측 하단 콘텐츠 */
.main_banner_content {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  z-index: 3;
  max-width: 450px;
  text-align: right;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #e0e0e0;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.8);
}

.main_banner_content p {
  margin-bottom: 0.5rem;
}

.main_banner_section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  z-index: 4;
}

/* 반응형 */
@media (max-width: 1024px) {
  .main_banner_text {
    max-width: 60%;
  }

  .main_banner_content {
    max-width: 350px;
  }
}

@media (max-width: 768px) {
  .main_banner_section {
    min-height: 400px;
  }

  .main_banner_text {
    top: 2rem;
    left: 2rem;
    max-width: calc(100% - 4rem);
  }

  .main_banner_text h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .main_banner_content {
    bottom: 2rem;
    right: 2rem;
    left: 2rem;
    max-width: 100%;
    font-size: 1rem;
    text-align: left;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
  border-color: var(--accent-primary);
  background: var(--bg-secondary);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-primary);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>

