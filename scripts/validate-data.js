#!/usr/bin/env node

/**
 * 데이터 검증 스크립트
 * JSON 파일의 데이터가 스키마에 맞는지 검증합니다.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 스키마 로드
const schemaPath = path.join(rootDir, 'src/data/data-schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// 에러 수집
const errors = [];

/**
 * 필수 필드 검증
 */
function validateRequired(obj, requiredFields, itemName) {
  const missing = requiredFields.filter(field => !(field in obj));
  if (missing.length > 0) {
    errors.push(`[${itemName}] 필수 필드 누락: ${missing.join(', ')}`);
  }
}

/**
 * 타입 검증
 */
function validateType(obj, field, expectedType, itemName) {
  if (!(field in obj)) return;
  
  const value = obj[field];
  
  // null 값은 허용 (선택적 필드)
  if (value === null || value === undefined) {
    return;
  }
  
  let isValid = false;
  
  switch (expectedType) {
    case 'string':
      isValid = typeof value === 'string';
      break;
    case 'number':
      isValid = typeof value === 'number';
      break;
    case 'array':
      isValid = Array.isArray(value);
      break;
    case 'object':
      isValid = typeof value === 'object' && !Array.isArray(value) && value !== null;
      break;
  }
  
  if (!isValid) {
    errors.push(`[${itemName}] 필드 "${field}" 타입 오류: ${typeof value} (예상: ${expectedType})`);
  }
}

/**
 * 에이전트 데이터 검증
 */
function validateAgent(agent, index) {
  const itemName = `Agent #${index} (${agent.name || 'Unknown'})`;
  
  // 필수 필드 검증
  validateRequired(agent, schema.agent.required, itemName);
  
  // 타입 검증
  Object.entries(schema.agent.types).forEach(([field, type]) => {
    if (agent[field] !== undefined) {
      validateType(agent, field, type, itemName);
    }
  });
  
  // ID 중복 확인
  if (agent.id && typeof agent.id === 'number') {
    // 이 검증은 전체 데이터에서 수행됩니다
  }
}

/**
 * W-엔진 데이터 검증
 */
function validateWEngine(wengine, index) {
  const itemName = `WEngine #${index} (${wengine.name || 'Unknown'})`;
  
  // 필수 필드 검증
  validateRequired(wengine, schema.wengine.required, itemName);
  
  // 타입 검증
  Object.entries(schema.wengine.types).forEach(([field, type]) => {
    if (wengine[field] !== undefined) {
      validateType(wengine, field, type, itemName);
    }
  });
}

/**
 * 중복 ID 검증
 */
function validateUniqueIds(items, type) {
  const ids = items.map(item => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicates.length > 0) {
    const uniqueDuplicates = [...new Set(duplicates)];
    errors.push(`[${type}] 중복된 ID 발견: ${uniqueDuplicates.join(', ')}`);
  }
}

// 메인 실행
try {
  // 에이전트 데이터 검증
  const agentsPath = path.join(rootDir, 'src/data/agents.json');
  if (fs.existsSync(agentsPath)) {
    const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'));
    agents.forEach((agent, index) => validateAgent(agent, index));
    validateUniqueIds(agents, 'Agents');
    console.log(`✓ 에이전트 데이터 검증 완료: ${agents.length}개`);
  } else {
    console.warn('⚠ agents.json 파일을 찾을 수 없습니다.');
  }
  
  // W-엔진 데이터 검증
  const wenginesPath = path.join(rootDir, 'src/data/wengines.json');
  if (fs.existsSync(wenginesPath)) {
    const wengines = JSON.parse(fs.readFileSync(wenginesPath, 'utf-8'));
    wengines.forEach((wengine, index) => validateWEngine(wengine, index));
    validateUniqueIds(wengines, 'WEngines');
    console.log(`✓ W-엔진 데이터 검증 완료: ${wengines.length}개`);
  } else {
    console.warn('⚠ wengines.json 파일을 찾을 수 없습니다.');
  }
  
  // 결과 출력
  if (errors.length > 0) {
    console.error('\n❌ 검증 실패:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exit(1);
  } else {
    console.log('\n✅ 모든 데이터가 유효합니다!');
    process.exit(0);
  }
} catch (error) {
  console.error('❌ 검증 중 오류 발생:', error.message);
  process.exit(1);
}

