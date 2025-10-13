<template>
  <div class="image-example">
    <h2>이미지 사용 예시</h2>

    <div class="example-section">
      <h3>1. assets/images에서 import 사용</h3>
      <div class="code-example">
        <pre><code>&lt;script setup&gt;
import logo from '@/assets/images/logos/my-logo.png'
&lt;/script&gt;

&lt;template&gt;
  &lt;img :src="logo" alt="로고" /&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>

    <div class="example-section">
      <h3>2. assets/images 직접 경로 사용</h3>
      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;img src="@/assets/images/icons/icon-home.svg" alt="홈" /&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>

    <div class="example-section">
      <h3>3. public/images URL 참조</h3>
      <div class="code-example">
        <pre><code>&lt;template&gt;
  &lt;img src="/images/logo.png" alt="로고" /&gt;
  &lt;img src="/images/banner.jpg" alt="배너" /&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>

    <div class="example-section">
      <h3>4. CSS 배경 이미지</h3>
      <div class="code-example">
        <pre><code>&lt;style scoped&gt;
.hero {
  /* assets 폴더 */
  background-image: url('@/assets/images/backgrounds/hero-bg.jpg');

  /* public 폴더 */
  background-image: url('/images/backgrounds/hero-bg.jpg');
}
&lt;/style&gt;</code></pre>
      </div>
    </div>

    <div class="tip-box">
      <h4>💡 팁</h4>
      <ul>
        <li><strong>assets/images</strong>: 컴포넌트에서 사용, Vite가 최적화, 해시 추가</li>
        <li><strong>public/images</strong>: 정적 파일, URL로 직접 참조, 빌드 시 그대로 복사</li>
        <li>파일명은 <code>kebab-case.jpg</code> 형식 권장</li>
        <li>이미지 업로드 전 압축 필수!</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 이 컴포넌트를 사용하려면:
// import ImageExample from '@/components/ImageExample.vue'
</script>

<style scoped>
.image-example {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.image-example h2 {
  color: var(--accent-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.example-section {
  margin-bottom: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
}

.example-section h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.code-example {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  padding: 1rem;
}

.code-example code {
  color: var(--text-secondary);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.tip-box {
  background: var(--bg-tertiary);
  border: 1px solid var(--accent-primary);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.tip-box h4 {
  color: var(--accent-primary);
  margin-bottom: 1rem;
}

.tip-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-box li {
  color: var(--text-secondary);
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.tip-box li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
}

.tip-box code {
  background: var(--bg-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  color: var(--accent-primary);
  font-size: 0.9em;
}
</style>

