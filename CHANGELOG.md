# 📝 변경 사항

## 2025-10-14 - Pinia 통합 및 보안 강화

### ✨ 주요 추가 기능
- **Pinia 상태 관리 도입**
  - 에이전트 데이터 중앙 관리 (`src/stores/agentStore.js`)
  - 필터링, 검색, 정렬 로직을 store로 이동
  - Agent.vue와 AgentDetail.vue에서 store 사용

### 🎨 CSS 개선
- **공용 유틸리티 클래스** (`src/styles/base.css`)
  - `.input` - 통일된 입력 필드 스타일
  - `.select` - 통일된 select 스타일
  - `.card` - 공용 카드 스타일
- **불필요한 스타일 제거**
  - `views.css`에서 .agent 관련 중복 스타일 제거
  - 페이지별 스타일을 scoped로 이동
- **패딩 표준화**
  - 프로젝트 전반 패딩을 1.5rem로 통일

### 🔒 보안 강화
- **보안 헤더 추가** (`vercel.json`, `netlify.toml`)
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy 설정
- **보안 문서 작성**
  - `SECURITY.md` - 보안 가이드
  - 백엔드 연동 시 보안 체크리스트
- **보안 점검 스크립트 추가**
  - `npm run security:check`
  - `npm run security:fix`

### 📚 문서 추가
- `DEPLOYMENT.md` - 배포 상세 가이드
- `BACKEND_GUIDE.md` - 백엔드 구축 가이드
- `QUICK_START.md` - 5분 배포 가이드
- `PINIA_GUIDE.md` - Pinia 사용 가이드
- `SECURITY.md` - 보안 가이드
- `CHANGELOG.md` - 변경 사항 기록

### 🐛 버그 수정
- Agent.vue의 중복 데이터 제거
- AgentDetail.vue의 코드 정리
- 필터 사이드바 스크롤 제거
- 검색 바와 필터의 상단 정렬

### 🎨 UI/UX 개선
- 에이전트 카드를 4열 그리드 레이아웃으로 변경
- 필터를 왼쪽 사이드바로 배치 (sticky)
- 검색/정렬 바를 카드 스타일로 통일
- 전체적인 간격과 크기 조정

---

## 2025-10-14 - 초기 에이전트 시스템 구축

### ✨ 구현된 기능
- 에이전트 목록 페이지 (Agent.vue)
- 에이전트 상세 페이지 (AgentDetail.vue)
- 필터 컴포넌트 (AgentFilter.vue)
- 에이전트 카드 컴포넌트 (AgentCard.vue)
- 20명의 에이전트 데이터
- 이미지 연동

### 🎨 디자인
- baslimbus.info 레이아웃 참고
- ZZZ Character Builder 컨셉 차용
- 다크 테마, 반응형 디자인

---

## 🔜 다음 계획

### 단기 (1-2주)
- [ ] 아이콘 이미지로 교체
- [ ] W-엔진 페이지 구현
- [ ] 디스크 세트 페이지 구현

### 중기 (1-2개월)
- [ ] 백엔드 API 연동
- [ ] 데이터베이스 구축
- [ ] 관리자 페이지

### 장기 (3개월+)
- [ ] 사용자 인증
- [ ] 즐겨찾기 기능
- [ ] 댓글 시스템
- [ ] 팀 시뮬레이터

---

## 📊 통계

- **총 파일 수**: 30+
- **에이전트 수**: 20명
- **지원 속성**: 7종 (물리, 화염, 얼음, 전기, 에테르, 현묵, 서리열)
- **지원 특성**: 6종 (강공, 격파, 이상, 방어, 지원, 명파)
- **소속**: 13개 세력

