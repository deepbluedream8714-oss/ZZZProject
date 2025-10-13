<template>
  <div class="contact">
    <h1>연락처</h1>
    <p class="intro">언제든지 편하게 문의해주세요</p>

    <div class="contact-container">
      <div class="contact-info">
        <h2>연락 정보</h2>
        <div class="info-item">
          <span class="icon">📍</span>
          <div>
            <h3>주소</h3>
            <p>서울특별시 강남구 테헤란로 123</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📞</span>
          <div>
            <h3>전화</h3>
            <p>02-1234-5678</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📧</span>
          <div>
            <h3>이메일</h3>
            <p>contact@example.com</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">🕐</span>
          <div>
            <h3>운영 시간</h3>
            <p>평일 09:00 - 18:00</p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <h2>문의하기</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">이름</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="이름을 입력하세요"
              required
            >
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="이메일을 입력하세요"
              required
            >
          </div>
          <div class="form-group">
            <label for="subject">제목</label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              placeholder="문의 제목을 입력하세요"
              required
            >
          </div>
          <div class="form-group">
            <label for="message">메시지</label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="문의 내용을 입력하세요"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">전송하기</button>
        </form>
        <div v-if="submitted" class="success-message">
          문의가 성공적으로 전송되었습니다!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  submitted.value = true

  // 3초 후 메시지 숨기기
  setTimeout(() => {
    submitted.value = false
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }, 3000)
}
</script>

<style scoped>
.contact {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.contact h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 1rem;
}

.intro {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}

.contact-info {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.contact-info h2 {
  color: var(--accent-primary);
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-item:hover {
  border-left: 3px solid var(--accent-primary);
  padding-left: calc(1rem - 3px);
}

.icon {
  font-size: 2rem;
}

.info-item h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.info-item p {
  color: var(--text-secondary);
  margin: 0;
}

.contact-form {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.contact-form h2 {
  color: var(--accent-primary);
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--accent-primary);
  color: #000;
  border: 1px solid var(--accent-primary);
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--glow);
}

.submit-btn:active {
  transform: translateY(0);
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--accent-primary);
  color: #000;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  animation: slideIn 0.3s ease;
  border: 1px solid var(--accent-hover);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

