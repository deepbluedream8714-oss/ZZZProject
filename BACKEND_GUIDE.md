# 🔧 백엔드 연동 가이드

## 🎯 목표 아키텍처

```
┌─────────────────┐
│   Frontend      │
│   (Vercel)      │
│   Vue 3 + Vite  │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│   Backend API   │
│   (Railway)     │
│   Node.js       │
└────────┬────────┘
         │ SQL
         ↓
┌─────────────────┐
│   Database      │
│   (Supabase)    │
│   PostgreSQL    │
└─────────────────┘
```

---

## 📁 백엔드 프로젝트 구조

```bash
# 새로운 폴더 생성
mkdir zzz-backend
cd zzz-backend
npm init -y
```

### 디렉토리 구조
```
zzz-backend/
├── src/
│   ├── config/
│   │   ├── database.js      # DB 연결 설정
│   │   └── env.js           # 환경 변수
│   ├── controllers/
│   │   ├── agentController.js
│   │   └── filterController.js
│   ├── models/
│   │   ├── Agent.js
│   │   └── Filter.js
│   ├── routes/
│   │   ├── agents.js
│   │   └── filters.js
│   ├── middleware/
│   │   ├── cors.js
│   │   └── errorHandler.js
│   └── index.js             # 진입점
├── package.json
└── .env
```

---

## 📦 필요한 패키지

```bash
npm install express cors dotenv
npm install pg pg-hstore sequelize  # PostgreSQL 사용시
npm install mongoose                # MongoDB 사용시
npm install -D nodemon
```

### package.json 스크립트
```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

---

## 🗄️ 데이터베이스 스키마

### Agents 테이블
```sql
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rank VARCHAR(1) NOT NULL,          -- 'S', 'A', 'B'
  attribute VARCHAR(20) NOT NULL,     -- '물리', '화염', '얼음', etc.
  faction VARCHAR(100) NOT NULL,
  specialty VARCHAR(50) NOT NULL,
  tags TEXT[],                        -- 배열
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_agents_rank ON agents(rank);
CREATE INDEX idx_agents_attribute ON agents(attribute);
CREATE INDEX idx_agents_faction ON agents(faction);
```

### 샘플 데이터 삽입
```sql
INSERT INTO agents (name, rank, attribute, faction, specialty, tags, description, image_url)
VALUES
  ('엘렌 조', 'S', '얼음', '빅토리아 하우스키핑', '강공',
   ARRAY['치명타', '얼음', '메인딜러'],
   '빅토리아 하우스키핑의 강력한 얼음 강공 딜러',
   '/images/agents/ellen.png'),
  ('주연', 'S', '에테르', '형사특수팀', '강공',
   ARRAY['에테르', '강공'],
   '형사특수팀 강공 딜러',
   '/images/agents/zhu-yuan.png');
```

---

## 💻 백엔드 코드 예시

### 1. 서버 진입점 (src/index.js)
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agents.js';
import filterRoutes from './routes/filters.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// 라우트
app.use('/api/agents', agentRoutes);
app.use('/api/filters', filterRoutes);

// 에러 핸들러
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### 2. Agent 컨트롤러 (src/controllers/agentController.js)
```javascript
import { pool } from '../config/database.js';

export const getAgents = async (req, res, next) => {
  try {
    const { rank, attribute, faction, specialty, search } = req.query;

    let query = 'SELECT * FROM agents WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    // 필터 조건 추가
    if (rank) {
      query += ` AND rank = ANY($${paramIndex})`;
      params.push(rank.split(','));
      paramIndex++;
    }

    if (attribute) {
      query += ` AND attribute = ANY($${paramIndex})`;
      params.push(attribute.split(','));
      paramIndex++;
    }

    if (faction) {
      query += ` AND faction = ANY($${paramIndex})`;
      params.push(faction.split(','));
      paramIndex++;
    }

    if (specialty) {
      query += ` AND specialty = ANY($${paramIndex})`;
      params.push(specialty.split(','));
      paramIndex++;
    }

    if (search) {
      query += ` AND name ILIKE $${paramIndex}`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ' ORDER BY rank DESC, name';

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

export const getAgentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM agents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
```

### 3. 라우트 (src/routes/agents.js)
```javascript
import express from 'express';
import { getAgents, getAgentById } from '../controllers/agentController.js';

const router = express.Router();

router.get('/', getAgents);
router.get('/:id', getAgentById);

export default router;
```

### 4. 데이터베이스 설정 (src/config/database.js)
```javascript
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// 연결 테스트
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection error:', err.stack);
  } else {
    console.log('✅ Database connected');
    release();
  }
});
```

### 5. 환경 변수 (.env)
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/zzz_db
FRONTEND_URL=http://localhost:5173
```

---

## 🔄 프론트엔드 통합

### Agent.vue 수정
```javascript
import { ref, computed, onMounted } from 'vue';
import api from '../services/api';

const agents = ref([]);
const loading = ref(false);
const error = ref(null);

// 데이터 로드
const loadAgents = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await api.getAgents(filters.value);
    agents.value = data.data; // 또는 data.agents
  } catch (err) {
    error.value = err.message;
    console.error('에이전트 로드 실패:', err);
    // 폴백: 로컬 데이터 사용
    agents.value = fallbackAgents;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadAgents();
});

// 필터 변경 시 재로드
watch(filters, () => {
  loadAgents();
}, { deep: true });
```

---

## 🚢 배포

### Supabase (가장 쉬움)
1. [supabase.com](https://supabase.com) 가입
2. 새 프로젝트 생성
3. SQL Editor에서 테이블 생성
4. API 키 복사 → 프론트엔드 환경 변수

### Railway (백엔드 + DB)
```bash
# Railway CLI 설치
npm i -g @railway/cli

# 로그인
railway login

# 프로젝트 생성
railway init

# PostgreSQL 추가
railway add postgresql

# 배포
railway up
```

### Render
1. GitHub 레포 연결
2. New Web Service 생성
3. 환경 변수 설정
4. 자동 배포

---

## 🎯 마이그레이션 체크리스트

- [ ] 백엔드 프로젝트 생성
- [ ] 데이터베이스 설정
- [ ] 테이블 스키마 작성
- [ ] API 엔드포인트 구현
- [ ] 프론트엔드 API 서비스 레이어 작성
- [ ] 환경 변수 설정
- [ ] CORS 설정
- [ ] 에러 핸들링
- [ ] 백엔드 배포
- [ ] 프론트엔드 환경 변수 업데이트
- [ ] 통합 테스트

---

## 💡 Pro Tips

1. **점진적 마이그레이션**: 한 번에 모두 바꾸지 말고 하나씩
2. **폴백 로직**: API 실패 시 로컬 데이터 사용
3. **캐싱**: 자주 바뀌지 않는 데이터는 캐싱
4. **에러 처리**: 사용자 친화적인 에러 메시지
5. **로깅**: 운영 중 문제 추적을 위해 로그 남기기

## 🆘 트러블슈팅

### CORS 에러
```javascript
// 백엔드에서
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  credentials: true
}));
```

### 데이터베이스 연결 실패
```bash
# 연결 문자열 확인
echo $DATABASE_URL

# 방화벽 확인
# Supabase의 경우 IP 화이트리스트 설정
```

### 배포 후 환경 변수 미적용
- Vercel/Netlify 대시보드에서 재확인
- 재배포 필요

