#!/usr/bin/env node

/**
 * Store 파일에서 데이터를 추출하여 JSON 파일로 변환
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Store 파일 읽기
const agentStorePath = path.join(rootDir, 'src/stores/agentStore.js');
const wengineStorePath = path.join(rootDir, 'src/stores/wengineStore.js');

function extractAgents() {
  const content = fs.readFileSync(agentStorePath, 'utf-8');
  
  // agents 배열 찾기 (정규식으로 추출)
  const agentsMatch = content.match(/agents:\s*\[([\s\S]*?)\],\s*\}\)/);
  
  if (!agentsMatch) {
    console.error('❌ agents 배열을 찾을 수 없습니다.');
    return null;
  }
  
  // 간단한 파싱 시도 (실제로는 더 복잡할 수 있음)
  // 주의: 이 방법은 완벽하지 않을 수 있으므로 수동 확인이 필요합니다
  console.log('⚠ Store 파일에서 직접 파싱하는 것은 복잡합니다.');
  console.log('💡 수동으로 agents 배열을 복사하여 JSON으로 변환하는 것을 권장합니다.');
  
  return null;
}

// 데이터 디렉토리 확인 및 생성
const dataDir = path.join(rootDir, 'src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('📝 Store 데이터 추출 스크립트');
console.log('💡 이 스크립트는 템플릿을 생성합니다.');
console.log('💡 실제 데이터는 Store 파일에서 수동으로 복사하여 JSON 파일에 작성하세요.\n');

// 예시 데이터 생성
const exampleAgents = [
  {
    id: 1,
    name: "엘렌 조",
    rank: "S",
    attribute: "얼음",
    faction: "빅토리아 하우스키핑",
    specialty: "강공",
    tags: ["치명타", "얼음", "메인딜러"],
    image: "../assets/images/charactor/빅토리아 하우스키핑/빅토리아_엘렌 조.png",
    description: "빅토리아 하우스키핑의 강력한 얼음 강공 딜러"
  }
];

const exampleWEngines = [
  {
    id: "example-wengine",
    name: "Example W-Engine",
    rank: "S",
    type: "Attack",
    attribute: "화염",
    baseATK: 713,
    secondaryStat: "24%",
    secondaryStatName: "Crit Rate",
    description: "효과 설명",
    tags: ["화염", "크리티컬"],
    image: null
  }
];

// 템플릿 파일 생성
const agentsTemplatePath = path.join(dataDir, 'agents.template.json');
const wenginesTemplatePath = path.join(dataDir, 'wengines.template.json');

fs.writeFileSync(
  agentsTemplatePath,
  JSON.stringify(exampleAgents, null, 2),
  'utf-8'
);

fs.writeFileSync(
  wenginesTemplatePath,
  JSON.stringify(exampleWEngines, null, 2),
  'utf-8'
);

console.log('✓ 템플릿 파일 생성 완료!');
console.log(`  - ${agentsTemplatePath}`);
console.log(`  - ${wenginesTemplatePath}`);
console.log('\n📋 다음 단계:');
console.log('1. src/stores/agentStore.js에서 agents 배열을 복사');
console.log('2. JSON 형식으로 변환 (이미지 경로는 상대 경로로)');
console.log('3. src/data/agents.json에 저장');

