#!/usr/bin/env node

/**
 * Store 파일의 데이터를 JSON 파일로 변환하는 스크립트
 * 기존 Store 데이터를 JSON 파일로 추출합니다.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Store 파일 읽기 및 데이터 추출
function extractAgentsFromStore() {
  const storePath = path.join(rootDir, 'src/stores/agentStore.js');
  const content = fs.readFileSync(storePath, 'utf-8');
  
  // agents 배열 찾기
  const agentsMatch = content.match(/agents:\s*\[([\s\S]*?)\],/);
  if (!agentsMatch) {
    throw new Error('agents 배열을 찾을 수 없습니다.');
  }
  
  // 간단한 파싱 (실제로는 더 정교한 파서가 필요할 수 있음)
  // 이 스크립트는 수동으로 데이터를 복사하는 것을 권장합니다
  console.log('⚠ Store 파일에서 직접 추출하는 것은 복잡합니다.');
  console.log('📋 agents.json 파일을 직접 생성하는 것을 권장합니다.');
}

// JSON 파일 생성
function createJsonFile(data, filename) {
  const dataDir = path.join(rootDir, 'src/data');
  
  // data 디렉토리 생성
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, filename);
  const jsonContent = JSON.stringify(data, null, 2);
  
  fs.writeFileSync(filePath, jsonContent, 'utf-8');
  console.log(`✓ ${filename} 파일 생성 완료: ${filePath}`);
}

console.log('📝 Store 데이터를 JSON으로 변환하는 스크립트');
console.log('💡 이 스크립트는 템플릿을 생성합니다.');
console.log('💡 실제 데이터는 src/stores/agentStore.js에서 수동으로 복사하세요.\n');

// 예시 데이터 생성
const exampleAgent = {
  id: 1,
  name: "예시 에이전트",
  rank: "S",
  attribute: "얼음",
  faction: "빅토리아 하우스키핑",
  specialty: "강공",
  tags: ["태그1", "태그2"],
  image: "/src/assets/images/charactor/소속/파일명.png",
  description: "설명"
};

createJsonFile([exampleAgent], 'agents.template.json');
console.log('\n✅ 템플릿 파일 생성 완료!');

