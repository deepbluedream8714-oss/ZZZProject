/**
 * JSON 데이터를 로드하고 이미지 경로를 변환하는 유틸리티
 */

/**
 * 이미지 경로를 URL 객체로 변환
 * @param {string} imagePath - 상대 경로 또는 절대 경로
 * @returns {string} 변환된 URL
 */
export function convertImagePath(imagePath) {
  if (!imagePath) return null;
  
  // 이미 URL인 경우 (http://, https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // 상대 경로인 경우 (../assets/... 또는 assets/... 또는 /src/assets/...)
  try {
    // ../assets/로 시작하는 경우 (JSON에서 사용하는 형식)
    if (imagePath.startsWith('../assets/')) {
      return new URL(imagePath, import.meta.url).href;
    }
    
    // assets/로 시작하는 경우
    if (imagePath.startsWith('assets/')) {
      return new URL(`../${imagePath}`, import.meta.url).href;
    }
    
    // /src/assets/로 시작하는 경우
    if (imagePath.startsWith('/src/assets/')) {
      return new URL(imagePath.replace('/src/', '../'), import.meta.url).href;
    }
    
    // 상대 경로가 아닌 경우 그대로 반환
    return imagePath;
  } catch (error) {
    console.warn('이미지 경로 변환 실패:', imagePath, error);
    return imagePath;
  }
}

/**
 * 에이전트 데이터에 이미지 경로 변환 적용
 * @param {Array} agents - 에이전트 배열
 * @returns {Array} 이미지 경로가 변환된 에이전트 배열
 */
export function processAgents(agents) {
  return agents.map(agent => ({
    ...agent,
    image: convertImagePath(agent.image),
  }));
}

/**
 * W-엔진 데이터에 이미지 경로 변환 적용
 * @param {Array} wengines - W-엔진 배열
 * @returns {Array} 이미지 경로가 변환된 W-엔진 배열
 */
export function processWEngines(wengines) {
  return wengines.map(wengine => ({
    ...wengine,
    image: convertImagePath(wengine.image),
  }));
}

