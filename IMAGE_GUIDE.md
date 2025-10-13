# 이미지 관리 가이드

## 📁 폴더 구조

```
src/assets/images/    # 컴포넌트에서 import하는 이미지
public/images/        # URL로 직접 참조하는 이미지
```

## 🎯 사용 방법

### 1️⃣ src/assets/images/ (추천)

**언제 사용?**
- Vue 컴포넌트에서 사용하는 이미지
- 빌드 시 최적화가 필요한 이미지
- 동적으로 경로를 생성하는 이미지

**장점:**
- Vite가 자동으로 최적화
- 해시가 파일명에 추가되어 캐싱 효율적
- 번들링 시 사용하지 않는 이미지는 제외됨

**사용 예시:**

```vue
<script setup>
import logo from '@/assets/images/logo.png'
import heroImage from '@/assets/images/hero-banner.jpg'
</script>

<template>
  <img :src="logo" alt="로고" />
  <img :src="heroImage" alt="히어로 이미지" />
</template>
```

또는 직접 경로 사용:
```vue
<template>
  <img src="@/assets/images/logo.png" alt="로고" />
</template>
```

### 2️⃣ public/images/

**언제 사용?**
- 빌드 시 변경되지 않아야 하는 이미지
- index.html에서 직접 참조하는 이미지
- 외부 라이브러리에서 참조하는 이미지
- 매우 큰 이미지 파일

**사용 예시:**

```vue
<template>
  <img src="/images/logo.png" alt="로고" />
  <img src="/images/icons/icon-home.svg" alt="홈" />
</template>
```

## 📂 권장 하위 폴더 구조

```
src/assets/images/
  ├── logos/          # 로고 이미지
  ├── icons/          # 아이콘 이미지
  ├── backgrounds/    # 배경 이미지
  ├── products/       # 제품 이미지
  └── team/           # 팀원 사진

public/images/
  ├── og-image.jpg    # Open Graph 이미지 (SNS 공유용)
  ├── favicon/        # 파비콘 관련
  └── static/         # 정적 이미지
```

## 💡 팁

1. **파일명 규칙**: 소문자와 하이픈 사용 (예: `hero-banner.jpg`)
2. **이미지 포맷**:
   - 사진: `.jpg`, `.webp`
   - 그래픽/로고: `.png`, `.svg`
   - 애니메이션: `.gif`, `.webp`
3. **최적화**: 업로드 전에 이미지를 압축하세요
4. **반응형**: 여러 크기의 이미지를 준비하는 것이 좋습니다

## 🔧 CSS에서 사용

```css
.hero {
  background-image: url('@/assets/images/hero-bg.jpg');
}
```

또는 public 폴더:
```css
.hero {
  background-image: url('/images/hero-bg.jpg');
}
```

