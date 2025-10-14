# ⚡ 빠른 시작 가이드

## 🎯 5분 안에 배포하기

### 1단계: Vercel로 배포 (가장 쉬움) ✨

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포 (Vercel 계정으로 로그인하라는 메시지가 뜹니다)
vercel

# 3. 질문에 답하기
# ? Set up and deploy? Yes
# ? Which scope? (본인 계정 선택)
# ? Link to existing project? No
# ? What's your project's name? zzz-project
# ? In which directory is your code located? ./
# ? Want to modify these settings? No

# ✅ 완료! URL이 출력됩니다
# 예: https://zzz-project-abc123.vercel.app
```

---

## 🌟 다른 옵션들

### Netlify로 배포

```bash
# 1. CLI 설치
npm i -g netlify-cli

# 2. 빌드
npm run build

# 3. 배포
netlify deploy

# 4. 프로덕션 배포
netlify deploy --prod
```

### GitHub Pages로 배포

```bash
# 1. gh-pages 설치
npm i -D gh-pages

# 2. package.json에 스크립트 추가
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# 3. vite.config.js 수정
export default defineConfig({
  base: '/repository-name/',  // GitHub 레포지토리 이름
  // ...
})

# 4. 배포
npm run deploy
```

---

## 🎨 커스텀 도메인 연결

### Vercel
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Domains
3. 도메인 입력 (예: zzz.example.com)
4. DNS 설정 안내에 따라 도메인 업체에서 설정

### Netlify
1. Netlify 대시보드 → Site settings → Domain management
2. Add custom domain
3. DNS 설정

---

## 🔧 환경 변수 설정 (백엔드 연동 시)

### Vercel
```bash
# CLI로 설정
vercel env add VITE_API_URL

# 또는 대시보드에서
# Settings → Environment Variables → Add
```

### Netlify
```bash
# CLI로 설정
netlify env:set VITE_API_URL https://your-api.com

# 또는 대시보드에서
# Site settings → Environment variables
```

---

## 📊 배포 후 확인사항

- [ ] 사이트가 정상적으로 로드되나요?
- [ ] 이미지가 모두 표시되나요?
- [ ] 라우팅이 작동하나요? (새로고침 시에도)
- [ ] 모바일에서도 잘 보이나요?
- [ ] HTTPS가 적용되었나요?

---

## 🆘 문제 해결

### 404 에러 (페이지를 찾을 수 없음)
- `vercel.json` 또는 `netlify.toml` 파일이 있는지 확인
- SPA 라우팅 설정 필요

### 이미지가 안 보임
- `vite.config.js`의 `base` 경로 확인
- 이미지 경로가 `/assets/...`로 시작하는지 확인

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 에러 확인 후 수정
```

---

## 💰 비용

### 무료 플랜으로 충분한 경우
- **개인 프로젝트**
- **월 방문자 < 10만**
- **대역폭 < 100GB**

### 유료 전환 시점
- Vercel Pro: $20/월 (팀 협업, 더 많은 빌드 시간)
- Netlify Pro: $19/월 (비슷한 혜택)

대부분의 개인 프로젝트는 **무료 플랜**으로 충분합니다! 🎉

---

## 🚀 다음 단계

1. ✅ 배포 완료
2. 📱 친구들과 URL 공유
3. 📊 Google Analytics 연동 (선택)
4. 🔧 백엔드 구축 시작 ([BACKEND_GUIDE.md](./BACKEND_GUIDE.md) 참조)

---

**축하합니다! 🎊 당신의 ZZZ 프로젝트가 이제 온라인에 있습니다!**

