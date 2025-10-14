# 🚀 배포 가이드

## 📦 1단계: 현재 상태 배포 (정적 호스팅)

### Vercel 배포 (추천)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 배포
vercel

# 4. 프로덕션 배포
vercel --prod
```

### Netlify 배포

```bash
# 1. Netlify CLI 설치
npm i -g netlify-cli

# 2. 로그인
netlify login

# 3. 빌드
npm run build

# 4. 배포
netlify deploy --prod --dir=dist
```

### GitHub Pages 배포

```bash
# 1. package.json에 스크립트 추가
npm i -D gh-pages

# 2. vite.config.js 수정 필요
# base: '/repository-name/'

# 3. 배포
npm run deploy
```

---

## 🔧 2단계: 환경 변수 설정

### 로컬 개발용
프로젝트 루트에 `.env` 파일 생성:
```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

### Vercel 환경 변수
1. Vercel 대시보드 → Settings → Environment Variables
2. 추가:
   - `VITE_API_URL`: `https://your-api.com/api`
   - `VITE_ENV`: `production`

### Netlify 환경 변수
1. Netlify 대시보드 → Site settings → Environment variables
2. 동일하게 추가

---

## 🏗️ 3단계: 백엔드 준비 (향후)

### 옵션 A: Serverless (추천)

#### Vercel Serverless Functions
```javascript
// api/agents.js
export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {
    // 에이전트 데이터 조회 로직
    const agents = []; // DB에서 조회
    res.status(200).json(agents);
  }
}
```

#### Supabase (백엔드 as 서비스)
```bash
npm install @supabase/supabase-js
```

```javascript
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase
```

### 옵션 B: 전통적인 서버

#### 1. 백엔드 프로젝트 구조
```
backend/
├── src/
│   ├── controllers/
│   │   └── agentController.js
│   ├── models/
│   │   └── Agent.js
│   ├── routes/
│   │   └── agents.js
│   └── index.js
├── package.json
└── .env
```

#### 2. Express 서버 예시
```javascript
// backend/src/index.js
import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agents.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/agents', agentRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

#### 3. 배포
- **Railway**: `railway up`
- **Render**: Git 연동 자동 배포
- **AWS EC2/Lightsail**: 전통적인 서버
- **Heroku**: Git push로 배포

---

## 📊 데이터베이스 옵션

### Serverless DB (추천)
- **Supabase**: PostgreSQL (무료 500MB)
- **PlanetScale**: MySQL (무료 5GB)
- **MongoDB Atlas**: NoSQL (무료 512MB)
- **Neon**: Serverless PostgreSQL

### 전통적인 DB
- **PostgreSQL** on Railway/Render
- **MongoDB** self-hosted

---

## 🔄 전환 로드맵

### Phase 1: 정적 배포 (현재 → 1주)
- [x] Vercel/Netlify 배포
- [ ] 커스텀 도메인 연결
- [ ] HTTPS 설정 (자동)

### Phase 2: API 레이어 (1-2주)
- [ ] API 서비스 파일 작성
- [ ] Supabase/Firebase 연동
- [ ] 환경 변수 설정

### Phase 3: 백엔드 구축 (2-4주)
- [ ] Express 서버 구축
- [ ] 데이터베이스 설계
- [ ] API 엔드포인트 구현
- [ ] 인증/인가 구현

### Phase 4: 고도화 (지속적)
- [ ] 이미지 최적화 (CDN)
- [ ] 캐싱 전략
- [ ] SEO 최적화
- [ ] 모니터링 & 로깅

---

## 💰 비용 예상

### 무료로 시작 가능
- **Vercel**: 100GB 대역폭/월
- **Supabase**: 500MB DB, 1GB 파일 스토리지
- **Cloudflare**: 무제한 대역폭

### 유료 전환 시점
- 트래픽 > 100GB/월
- DB > 500MB
- 서버 리소스 부족

---

## 🔒 보안 체크리스트

- [ ] API 키는 환경 변수로 관리
- [ ] CORS 적절히 설정
- [ ] Rate limiting 적용
- [ ] Input validation
- [ ] SQL Injection 방지
- [ ] XSS 방지

---

## 📝 다음 단계

1. **지금 바로**: Vercel에 배포하고 URL 받기
2. **다음 주**: Supabase 계정 만들고 DB 설정
3. **다음 달**: API 연동 및 데이터 마이그레이션

## 🆘 문제 해결

### 빌드 오류
```bash
# 캐시 삭제 후 재빌드
rm -rf node_modules dist
npm install
npm run build
```

### 라우팅 404 에러
`vercel.json` 또는 `netlify.toml` 설정 필요

### CORS 에러
백엔드에서 적절한 CORS 헤더 설정 필요

