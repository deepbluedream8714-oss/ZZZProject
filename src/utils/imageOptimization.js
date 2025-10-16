// 이미지 최적화 유틸리티 함수들

/**
 * 이미지 URL을 최적화된 형태로 변환
 * @param {string} originalSrc - 원본 이미지 경로
 * @param {Object} options - 최적화 옵션
 * @returns {string} 최적화된 이미지 URL
 */
export function optimizeImageUrl(originalSrc, options = {}) {
  const {
    width = null,
    height = null,
    quality = 80,
    format = "webp",
    blur = false,
  } = options;

  // 실제 구현에서는 이미지 최적화 서비스 사용 (예: Cloudinary, ImageKit, Vercel Image Optimization)
  let optimizedUrl = originalSrc;

  // WebP 포맷으로 변환
  if (format === "webp" && !originalSrc.includes(".webp")) {
    optimizedUrl = originalSrc.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  }

  // 크기 조정 파라미터 추가 (실제 서비스에 따라 다름)
  const params = new URLSearchParams();
  if (width) params.append("w", width);
  if (height) params.append("h", height);
  if (quality) params.append("q", quality);
  if (blur) params.append("blur", "10");

  if (params.toString()) {
    optimizedUrl += `?${params.toString()}`;
  }

  return optimizedUrl;
}

/**
 * 이미지 프리로딩
 * @param {string} src - 이미지 경로
 * @returns {Promise} 로딩 완료 Promise
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 여러 이미지 프리로딩
 * @param {string[]} srcs - 이미지 경로 배열
 * @returns {Promise} 모든 이미지 로딩 완료 Promise
 */
export function preloadImages(srcs) {
  return Promise.all(srcs.map(preloadImage));
}

/**
 * 이미지 크기 계산
 * @param {string} src - 이미지 경로
 * @returns {Promise<{width: number, height: number}>} 이미지 크기
 */
export function getImageDimensions(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 이미지 압축 (클라이언트 사이드)
 * @param {File} file - 이미지 파일
 * @param {Object} options - 압축 옵션
 * @returns {Promise<Blob>} 압축된 이미지 Blob
 */
export function compressImage(file, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    type = "image/jpeg",
  } = options;

  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // 비율 유지하면서 크기 조정
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // 이미지 그리기
      ctx.drawImage(img, 0, 0, width, height);

      // 압축된 이미지로 변환
      canvas.toBlob(resolve, type, quality);
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * 이미지 지연 로딩을 위한 Intersection Observer 설정
 * @param {Function} callback - 교차 시 실행할 콜백
 * @param {Object} options - Observer 옵션
 * @returns {IntersectionObserver} Observer 인스턴스
 */
export function createLazyLoadObserver(callback, options = {}) {
  const defaultOptions = {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, defaultOptions);
}

/**
 * 이미지 캐싱을 위한 Map
 */
const imageCache = new Map();

/**
 * 이미지 캐시에서 가져오기
 * @param {string} src - 이미지 경로
 * @returns {Promise<HTMLImageElement>} 캐시된 이미지
 */
export function getCachedImage(src) {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  return preloadImage(src).then((img) => {
    imageCache.set(src, img);
    return img;
  });
}

/**
 * 이미지 캐시 초기화
 */
export function clearImageCache() {
  imageCache.clear();
}
