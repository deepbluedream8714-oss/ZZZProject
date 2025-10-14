# 🔒 보안 가이드

## ✅ 현재 보안 상태

### 안전한 부분
- ✅ **개인정보 수집 없음**: 사용자 데이터 저장/전송 없음
- ✅ **환경 변수 보호**: `.env` 파일이 `.gitignore`에 포함
- ✅ **의존성 취약점 없음**: `npm audit` 결과 깨끗
- ✅ **보안 헤더 적용**: XSS, Clickjacking, MIME-sniffing 방어
- ✅ **HTTPS 자동 적용**: Vercel/Netlify 자동 SSL

### 적용된 보안 헤더

#### `vercel.json` / `netlify.toml`
```
X-Content-Type-Options: nosniff          # MIME 타입 스니핑 방지
X-Frame-Options: DENY                     # 클릭재킹 방어
X-XSS-Protection: 1; mode=block          # XSS 방어
Referrer-Policy: strict-origin-when-cross-origin  # Referrer 정보 제한
Permissions-Policy: geolocation=(), microphone=(), camera=()  # 권한 제한
```

---

## ⚠️ 주의사항

### 환경 변수 관리

```bash
# ❌ 절대 Git에 커밋하지 말 것
.env

# ✅ 예시 파일만 커밋
.env.example
```

**배포 시 환경 변수 설정 필수:**
```
VITE_API_URL=https://your-api.com/api
VITE_ENV=production
```

### API 키 노출 방지

```javascript
// ❌ 잘못된 예
const apiKey = "sk-1234567890abcdef";

// ✅ 올바른 예
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## 🛡️ 향후 백엔드 연동 시 필수 사항

### 1. 입력값 검증

```javascript
// 백엔드에서 필수
export const validateAgentSearch = (req, res, next) => {
  const { query } = req.query;

  if (query && query.length > 100) {
    return res.status(400).json({ error: '검색어가 너무 깁니다' });
  }

  // SQL Injection 방지
  const sanitized = query.replace(/[<>'"]/g, '');
  req.query.query = sanitized;

  next();
};
```

### 2. Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // 최대 100 요청
  message: '너무 많은 요청이 발생했습니다. 나중에 다시 시도해주세요.'
});

app.use('/api/', limiter);
```

### 3. CORS 설정

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-domain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 4. 인증/인가 (사용자 기능 추가 시)

```javascript
// JWT 토큰 사용 예시
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '인증이 필요합니다' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: '유효하지 않은 토큰' });
    req.user = user;
    next();
  });
};
```

### 5. SQL Injection 방지

```javascript
// ❌ 위험한 예
const query = `SELECT * FROM agents WHERE name = '${userInput}'`;

// ✅ 안전한 예 (Prepared Statement)
const query = 'SELECT * FROM agents WHERE name = $1';
const result = await pool.query(query, [userInput]);
```

---

## 📊 보안 체크리스트

### 배포 전
- [ ] `.env` 파일이 `.gitignore`에 있는지 확인
- [ ] Git 히스토리에 민감 정보가 없는지 확인
- [ ] 불필요한 console.log 제거
- [ ] 프로덕션 빌드 테스트 (`npm run build`)

### 배포 후
- [ ] HTTPS 적용 확인
- [ ] 보안 헤더 적용 확인 (https://securityheaders.com/)
- [ ] 환경 변수가 올바르게 설정되었는지 확인
- [ ] API 엔드포인트 테스트

### 정기 점검 (월 1회)
- [ ] `npm audit` 실행
- [ ] 의존성 업데이트 (`npm outdated`)
- [ ] 로그 검토 (이상 활동 확인)

---

## 🚨 보안 인시던트 대응

### API 키 노출 시
1. 즉시 해당 키 폐기
2. 새 키 발급 및 환경 변수 업데이트
3. Git 히스토리에서 완전 제거 (BFG Repo-Cleaner 사용)

### 취약점 발견 시
1. 영향 범위 파악
2. 즉시 패치 적용
3. 사용자에게 공지 (필요 시)

---

## 🔐 추가 보안 강화 (선택)

### Content Security Policy (CSP)

향후 외부 리소스 사용 시 추가:

```json
// vercel.json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://your-api.com"
}
```

### HSTS (HTTP Strict Transport Security)

```json
{
  "key": "Strict-Transport-Security",
  "value": "max-age=31536000; includeSubDomains"
}
```

---

## 📚 보안 리소스

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

## 🆘 문의

보안 관련 문제 발견 시:
- GitHub Issues (비공개로 보고)
- 이메일: security@your-domain.com

---

**보안은 지속적인 프로세스입니다. 정기적으로 점검하세요!** 🔒

