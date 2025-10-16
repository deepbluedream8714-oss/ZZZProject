# 웹 성능 최적화 가이드

## 현재 구현된 최적화 기능

### 1. 이미지 최적화

- **지연 로딩 (Lazy Loading)**: 화면에 보이는 이미지만 로드
- **WebP 포맷 지원**: 더 작은 파일 크기
- **이미지 압축**: 품질 조정 가능
- **캐싱 시스템**: 한 번 로드된 이미지는 캐시에서 재사용

### 2. 빌드 최적화

- **청크 분할**: 라이브러리별로 코드 분할
- **에셋 최적화**: 이미지와 미디어 파일 분류
- **압축 설정**: 정적 파일 압축

### 3. 성능 모니터링

- **실시간 성능 추적**: 로드 시간, 메모리 사용량 등
- **네트워크 상태 모니터링**: 온라인/오프라인 상태 확인
- **캐시 히트율 추적**: 캐시 효율성 측정

## 추가 권장사항

### 1. CDN 사용

```javascript
// 이미지 최적화 서비스 예시
const imageOptimizationServices = {
  // Cloudinary
  cloudinary: (src, options) => {
    const baseUrl = "https://res.cloudinary.com/your-cloud/image/upload";
    const params = new URLSearchParams(options);
    return `${baseUrl}/${params.toString()}/${src}`;
  },

  // ImageKit
  imagekit: (src, options) => {
    const baseUrl = "https://ik.imagekit.io/your-id";
    const params = new URLSearchParams(options);
    return `${baseUrl}/${src}?${params.toString()}`;
  },
};
```

### 2. 이미지 포맷 최적화

```javascript
// 브라우저 지원에 따른 포맷 선택
function getOptimalImageFormat() {
  if (supportsWebP()) return "webp";
  if (supportsAVIF()) return "avif";
  return "jpeg";
}

function supportsWebP() {
  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
}
```

### 3. 프리로딩 전략

```javascript
// 중요한 이미지들 프리로드
const criticalImages = [
  "/src/assets/images/logos/Logo.jpeg",
  "/src/assets/images/logos/ZZZ.webp",
];

// 페이지 로드 후 중요하지 않은 이미지들 프리로드
function preloadNonCriticalImages() {
  const nonCriticalImages = [
    // 에이전트 이미지들
    "/src/assets/images/charactor/괴담방/괴담방_루시아.png",
    // ...
  ];

  nonCriticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}
```

### 4. 서비스 워커를 통한 캐싱

```javascript
// service-worker.js
const CACHE_NAME = "zzz-project-v1";
const IMAGE_CACHE = "zzz-images-v1";

self.addEventListener("fetch", (event) => {
  if (event.request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response;
          }

          return fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

### 5. 이미지 크기 최적화

```javascript
// 반응형 이미지 크기 계산
function getResponsiveImageSizes(containerWidth) {
  const breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    large: 1440,
  };

  if (containerWidth <= breakpoints.mobile) return 320;
  if (containerWidth <= breakpoints.tablet) return 480;
  if (containerWidth <= breakpoints.desktop) return 768;
  return 1024;
}
```

### 6. 번들 분석

```bash
# 번들 크기 분석
npm install --save-dev rollup-plugin-visualizer
npm run build -- --analyze
```

### 7. 압축 설정

```javascript
// netlify.toml 또는 vercel.json
[build]
  command = "npm run build"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## 성능 측정 도구

### 1. Lighthouse

- Chrome DevTools의 Lighthouse 탭 사용
- 성능, 접근성, SEO 점수 확인

### 2. WebPageTest

- 실제 네트워크 환경에서 테스트
- 상세한 성능 분석

### 3. Bundle Analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze
```

## 모니터링 지표

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: 최대 콘텐츠 렌더링 시간
- **FID (First Input Delay)**: 첫 입력 지연 시간
- **CLS (Cumulative Layout Shift)**: 누적 레이아웃 이동

### 추가 지표

- **TTI (Time to Interactive)**: 상호작용 가능 시간
- **FCP (First Contentful Paint)**: 첫 콘텐츠 렌더링 시간
- **Speed Index**: 페이지 로딩 속도 지수

## 최적화 체크리스트

- [ ] 이미지 지연 로딩 구현
- [ ] WebP 포맷 사용
- [ ] 이미지 압축 적용
- [ ] CDN 설정
- [ ] 서비스 워커 캐싱
- [ ] 번들 크기 최적화
- [ ] 프리로딩 전략 수립
- [ ] 성능 모니터링 설정
- [ ] 캐시 전략 구현
- [ ] 반응형 이미지 적용
