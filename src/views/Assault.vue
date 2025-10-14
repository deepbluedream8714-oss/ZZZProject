<template>
  <div class="assault">
    <h1>강습전</h1>
    <p class="intro">강습전 공략 정보를 확인하세요</p>

    <div class="assault-container">
      <div class="assault-info">
        <h2>강습전 정보</h2>
        <div class="info-item">
          <span class="icon">⚔️</span>
          <div>
            <h3>난이도</h3>
            <p>고급 ~ 최상급</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">🎯</span>
          <div>
            <h3>보상</h3>
            <p>고급 재료 및 경험치</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">👥</span>
          <div>
            <h3>추천 인원</h3>
            <p>3인 파티 추천</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">⏰</span>
          <div>
            <h3>제한 시간</h3>
            <p>10분</p>
          </div>
        </div>
      </div>

      <div class="assault-form">
        <h2>공략 팁 공유</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">작성자</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>
          <div class="form-group">
            <label for="boss">보스 이름</label>
            <input
              type="text"
              id="boss"
              v-model="form.boss"
              placeholder="보스 이름을 입력하세요"
              required
            />
          </div>
          <div class="form-group">
            <label for="team">추천 팀 구성</label>
            <input
              type="text"
              id="team"
              v-model="form.team"
              placeholder="예: 엘렌, 라이칸, 니콜"
              required
            />
          </div>
          <div class="form-group">
            <label for="strategy">공략 전략</label>
            <textarea
              id="strategy"
              v-model="form.strategy"
              placeholder="공략 팁과 전략을 작성해주세요"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">공략 공유하기</button>
        </form>
        <div v-if="submitted" class="success-message">
          공략이 성공적으로 등록되었습니다!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  boss: "",
  team: "",
  strategy: "",
});

const submitted = ref(false);

const handleSubmit = () => {
  console.log("Strategy submitted:", form.value);
  submitted.value = true;

  // 3초 후 메시지 숨기기
  setTimeout(() => {
    submitted.value = false;
    form.value = {
      name: "",
      boss: "",
      team: "",
      strategy: "",
    };
  }, 3000);
};
</script>

<style scoped>
/* Assault 페이지 고유 스타일 */
/* 공통 스타일은 src/styles/views.css에서 관리됩니다 */
</style>
