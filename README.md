# 🎮 ZZZ Project

**Zenless Zone Zero** 팬 사이트 - 에이전트 정보 및 빌드 가이드

Vue 3 + Vite 기반의 모던 웹 애플리케이션

---

## ✨ 주요 기능

- 🔍 **에이전트 검색 & 필터링**: 등급, 속성, 소속, 특성별 필터
- 📊 **상세 정보 페이지**: 스탯, 스킬, 육성 가이드, 팀 조합
- 🎨 **모던 UI/UX**: 다크 테마, 반응형 디자인
- ⚡ **빠른 성능**: Vite 빌드 시스템

---

## 🚀 빠른 시작

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 📁 프로젝트 구조

```
ZZZProject/
├── src/
│   ├── assets/          # 이미지, 동영상 등
│   ├── components/      # Vue 컴포넌트
│   │   ├── AgentCard.vue
│   │   └── AgentFilter.vue
│   ├── views/           # 페이지 컴포넌트
│   │   ├── Home.vue
│   │   ├── Agent.vue
│   │   └── AgentDetail.vue
│   ├── router/          # Vue Router 설정
│   ├── services/        # API 서비스
│   │   └── api.js
│   └── styles/          # 전역 스타일
├── public/              # 정적 파일
└── vite.config.js       # Vite 설정
```

---

## 🌐 배포

### 즉시 배포 (무료)

#### Vercel (추천)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

자세한 내용은 [DEPLOYMENT.md](./DEPLOYMENT.md) 참조

---

## 🔧 백엔드 연동 (선택사항)

현재는 프론트엔드만 구현되어 있으며, 향후 백엔드 연동 계획이 있습니다.

백엔드 구축 가이드는 [BACKEND_GUIDE.md](./BACKEND_GUIDE.md) 참조

### 추천 스택
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Railway / Render

---

## 🛠️ 기술 스택

- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Router**: Vue Router 4
- **Styling**: Custom CSS (CSS Variables)
- **Icons**: (향후 추가 예정)

---

## 📝 개발 계획

- [x] 에이전트 목록 페이지
- [x] 필터 시스템
- [x] 에이전트 상세 페이지
- [ ] 백엔드 API 연동
- [ ] 사용자 인증
- [ ] 즐겨찾기 기능
- [ ] 댓글 시스템
- [ ] SEO 최적화

---

## 🤝 기여

기여를 환영합니다! Pull Request를 보내주세요.

---

## 📄 라이선스

이 프로젝트는 게임 팬 사이트로, 모든 게임 관련 이미지와 데이터의 저작권은 **HoYoverse**에 있습니다.

---

## 📞 문의

문제가 있거나 제안사항이 있으시면 Issue를 등록해주세요.

---

**Made with ❤️ for ZZZ Community**
