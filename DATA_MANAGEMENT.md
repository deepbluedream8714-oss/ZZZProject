# 📊 데이터 관리 가이드

## 🎯 개요

에이전트와 W-엔진 정보를 체계적으로 관리하기 위한 가이드입니다.

## ✅ 현재 상태

**Store 파일이 JSON 파일을 로드하도록 변경되었습니다!**

- ✅ `src/stores/agentStore.js` → `src/data/agents.json`에서 데이터 로드
- ✅ `src/stores/wengineStore.js` → `src/data/wengines.json`에서 데이터 로드
- ✅ 이미지 경로 자동 변환 처리
- ✅ 데이터 검증 스크립트 (`npm run validate:data`)

**이제 데이터를 수정할 때는 JSON 파일만 편집하면 됩니다!**

## 📁 파일 구조

```
src/
├── data/                    # 데이터 파일 저장소
│   ├── agents.json         # 에이전트 정보
│   ├── wengines.json       # W-엔진 정보
│   ├── data-schema.json    # 데이터 스키마
│   └── README.md          # 데이터 파일 가이드
└── stores/                  # Pinia Store (JSON에서 로드)
    ├── agentStore.js
    └── wengineStore.js
```

## 🔄 데이터 수집 프로세스

### 방법 1: JSON 파일 직접 편집 (권장)

1. **에이전트 정보 추가**

   ```bash
   # src/data/agents.json 파일 열기
   ```

2. **새 에이전트 데이터 추가**

   ```json
   {
     "id": 21,
     "name": "새 에이전트",
     "rank": "S",
     "attribute": "화염",
     "faction": "소속명",
     "specialty": "강공",
     "tags": ["태그1", "태그2"],
     "image": "../assets/images/charactor/소속/파일명.png",
     "description": "설명"
   }
   ```

   **💡 이미지 경로 형식:**

   - JSON 파일에서는 `../assets/images/...` 형식 사용
   - Store에서 자동으로 URL로 변환됩니다

3. **데이터 검증**
   ```bash
   npm run validate:data
   ```

### 방법 2: 스프레드시트 활용

1. **Google Sheets 또는 Excel 생성**

   - 컬럼: id, name, rank, attribute, faction, specialty, tags, image, description 등

2. **데이터 입력**

   - 각 행에 에이전트 정보 입력

3. **JSON 변환**
   - Google Apps Script 또는 Node.js 스크립트 사용
   - 또는 수동으로 복사

### 방법 3: 공식 API 활용 (향후)

```javascript
// 호요랩 API에서 데이터 가져오기 (예시)
async function fetchAgentData(agentId) {
  const response = await fetch(`https://api.hoyolab.com/zzz/agent/${agentId}`);
  return response.json();
}
```

## 📋 수집 정보 체크리스트

### 에이전트 기본 정보

- [ ] **ID**: 고유 번호 (숫자)
- [ ] **이름**: 한글 이름
- [ ] **등급**: S, A
- [ ] **속성**: 물리, 화염, 얼음, 전기, 에테르, 현묵, 서리열
- [ ] **소속**: 팩션명
- [ ] **특성**: 강공, 격파, 이상, 방어, 지원, 명파
- [ ] **태그**: 배열 (예: ["치명타", "얼음", "메인딜러"])
- [ ] **이미지 경로**: `/src/assets/images/charactor/소속/파일명.png`
- [ ] **설명**: 한 줄 설명

### 에이전트 상세 정보 (선택)

- [ ] **스탯**
  - baseAtk, baseDef, baseHp, impact
  - maxAtk, maxDef, maxHp
- [ ] **스킬**
  - basic, special, ultimate, passive
- [ ] **빌드**
  - mainSet, subSet, bestWeapon, altWeapon
- [ ] **팀 조합**
  - optimal: { sub, support }
  - alternative: { sub, support }
  - synergy
- [ ] **평가**
  - damage, survival, support, difficulty (0-100)
- [ ] **장단점**
  - pros: 배열
  - cons: 배열
- [ ] **추천**: recommendation

### W-엔진 정보

- [ ] **ID**: kebab-case (예: "deep-sea-visitor")
- [ ] **이름**: 영문 이름
- [ ] **등급**: S, A, B
- [ ] **타입**: Attack, Stun, Support, Anomaly, Defence, Rupture
- [ ] **속성**: 물리, 화염, 얼음, 전기, 에테르, 현묵, 서리열
- [ ] **기본 공격력**: baseATK (숫자)
- [ ] **부 스탯**: secondaryStat (문자열), secondaryStatName
- [ ] **설명**: 효과 설명
- [ ] **태그**: 배열
- [ ] **이미지**: 경로 (선택)

## 🔍 데이터 수집 소스

### 1. 호요랩 게임 기록

- URL: https://act.hoyolab.com/app/zzz-game-record/
- 에이전트 기본 정보, 스탯 확인 가능

### 2. 게임 내 정보

- 캐릭터 상세 화면
- 스킬 설명
- 스탯 수치

### 3. 커뮤니티 리소스

- Reddit: r/ZZZ_Official
- Discord: 공식 서버
- 위키: 팬 위키 사이트

### 4. 공식 미디어

- 공식 트위터/X
- 공식 유튜브
- 공식 웹사이트

## 🛠️ 데이터 관리 도구

### 스크립트 명령어

```bash
# 데이터 검증
npm run validate:data

# 데이터 변환 (템플릿 생성)
npm run convert:data
```

### JSON 편집기 추천

1. **VS Code**

   - JSON 확장 프로그램
   - 자동 포맷팅

2. **온라인 편집기**

   - JSON Editor Online
   - JSONLint

3. **전용 앱**
   - Postman (API 테스트용)
   - Insomnia

## ✅ 데이터 추가 절차

1. **정보 수집**

   ```
   게임 기록 사이트 → 스탯 확인
   게임 내 화면 → 스킬 확인
   커뮤니티 → 빌드 가이드 확인
   ```

2. **데이터 작성**

   ```json
   // src/data/agents.json에 추가
   {
     "id": 21,
     "name": "...",
     ...
   }
   ```

3. **이미지 준비**

   ```
   src/assets/images/charactor/소속/파일명.png
   ```

4. **검증 실행**

   ```bash
   npm run validate:data
   ```

5. **테스트**
   ```bash
   npm run dev
   # 브라우저에서 확인
   ```

## 📊 데이터 스키마

자세한 스키마는 `src/data/data-schema.json` 참조

## 🔄 업데이트 주기

- **신규 콘텐츠 출시 시**: 즉시 업데이트
- **밸런스 패치 후**: 1주일 내 업데이트
- **정기 점검**: 월 1회 (전체 데이터 검증)

## 💡 팁

1. **일괄 입력**: 스프레드시트에서 한 번에 작성 후 변환
2. **템플릿 활용**: 기존 데이터를 복사하여 수정
3. **검증 필수**: 데이터 추가 후 반드시 검증 실행
4. **이미지 경로**: 상대 경로 사용 시 주의
5. **ID 관리**: 중복 방지를 위해 ID 목록 관리

## 🚨 주의사항

- JSON 파일은 반드시 유효한 형식이어야 합니다
- 이미지 경로는 실제 파일 존재 여부 확인
- ID는 고유해야 합니다
- 필수 필드는 누락하면 안 됩니다
