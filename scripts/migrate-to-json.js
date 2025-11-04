#!/usr/bin/env node

/**
 * 기존 Store 파일의 데이터를 JSON 파일로 마이그레이션하는 스크립트
 * 
 * 사용법:
 * 1. 기존 Store 파일을 백업 (src/stores/agentStore.backup.js)
 * 2. 이 스크립트 실행: node scripts/migrate-to-json.js
 * 3. 생성된 JSON 파일 확인 및 수정
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('📦 데이터 마이그레이션 스크립트');
console.log('⚠️  이 스크립트는 기존 Store 파일을 백업하고 JSON 파일 생성 가이드를 제공합니다.\n');

// 백업 디렉토리 생성
const backupDir = path.join(rootDir, 'src/stores/backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Store 파일 백업
const agentStorePath = path.join(rootDir, 'src/stores/agentStore.js');
const wengineStorePath = path.join(rootDir, 'src/stores/wengineStore.js');
const backupAgentPath = path.join(backupDir, 'agentStore.backup.js');
const backupWEnginePath = path.join(backupDir, 'wengineStore.backup.js');

if (fs.existsSync(agentStorePath)) {
  fs.copyFileSync(agentStorePath, backupAgentPath);
  console.log('✓ agentStore.js 백업 완료');
}

if (fs.existsSync(wengineStorePath)) {
  fs.copyFileSync(wengineStorePath, backupWEnginePath);
  console.log('✓ wengineStore.js 백업 완료');
}

console.log('\n📋 다음 단계:');
console.log('1. 백업 파일에서 agents 배열과 wengines 배열을 찾습니다');
console.log('2. JSON 형식으로 변환합니다 (이미지 경로는 상대 경로로 유지)');
console.log('3. src/data/agents.json과 src/data/wengines.json에 저장합니다');
console.log('\n💡 팁:');
console.log('- 이미지 경로는 "../assets/images/..." 형식으로 저장하세요');
console.log('- JSON 파일은 유효한 형식이어야 합니다 (쉼표, 따옴표 확인)');
console.log('- 변환 후 npm run validate:data로 검증하세요');

