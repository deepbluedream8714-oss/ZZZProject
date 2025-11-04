# 데이터 마이그레이션 가이드

## ✅ 완료된 작업

Store 파일이 JSON 파일에서 데이터를 로드하도록 변경되었습니다.

### 변경된 파일
- `src/stores/agentStore.js` → JSON 파일에서 로드
- `src/stores/wengineStore.js` → JSON 파일에서 로드
- `src/utils/loadData.js` → 이미지 경로 변환 유틸리티 추가

### 생성된 파일
- `src/data/agents.json` → 에이전트 데이터
- `src/data/wengines.json` → W-엔진 데이터
- `src/data/data-schema.json` → 데이터 스키마
- `scripts/validate-data.js` → 데이터 검증 스크립트

## 📝 데이터 관리 방법

### 새 에이전트 추가

1. `src/data/agents.json` 파일 열기
2. 배열에 새 에이전트 객체 추가:

```json
{
  "id": 21,
  "name": "에이전트 이름",
  "rank": "S",
  "attribute": "화염",
  "faction": "소속명",
  "specialty": "강공",
  "tags": ["태그1", "태그2"],
  "image": "../assets/images/charactor/소속/파일명.png",
  "description": "설명"
}
```

3. 검증: `npm run validate:data`
4. 테스트: `npm run dev`

### 새 W-엔진 추가

1. `src/data/wengines.json` 파일 열기
2. 배열에 새 W-엔진 객체 추가:

```json
{
  "id": "wengine-id",
  "name": "W-Engine Name",
  "rank": "S",
  "type": "Attack",
  "attribute": "화염",
  "baseATK": 713,
  "secondaryStat": "24%",
  "secondaryStatName": "Crit Rate",
  "description": "효과 설명",
  "tags": ["태그1", "태그2"],
  "image": null
}
```

3. 검증: `npm run validate:data`
4. 테스트: `npm run dev`

## 🔧 이미지 경로 형식

JSON 파일에서는 **상대 경로**를 사용합니다:

```json
"image": "../assets/images/charactor/소속/파일명.png"
```

Store에서 로드할 때 자동으로 URL로 변환됩니다.

## ⚠️ 주의사항

1. **JSON 형식**: 유효한 JSON 형식이어야 합니다 (쉼표, 따옴표 확인)
2. **ID 중복**: ID는 고유해야 합니다
3. **필수 필드**: 필수 필드는 반드시 포함해야 합니다
4. **검증 필수**: 데이터 추가 후 반드시 `npm run validate:data` 실행

## 📊 데이터 구조

자세한 스키마는 `src/data/data-schema.json` 참조

## 🚀 빠른 시작

```bash
# 1. 데이터 검증
npm run validate:data

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
```

