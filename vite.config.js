import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 청크 크기 제한 설정
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 청크 분할 최적화
        manualChunks: {
          // Vue 관련 라이브러리
          "vue-vendor": ["vue", "vue-router", "pinia"],
          // 이미지 최적화 라이브러리 (필요시)
          "image-vendor": ["sharp", "canvas"],
        },
        // 에셋 파일명 최적화
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(assetInfo.name)) {
            return `media/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // 이미지 압축 설정
    assetsInlineLimit: 4096, // 4KB 이하 이미지는 인라인으로 처리
  },
  // 개발 서버 설정
  server: {
    // 정적 파일 압축
    compress: true,
    // 캐시 설정
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
  // 이미지 최적화 플러그인 (필요시 설치)
  // plugins: [
  //   vue(),
  //   // vite-plugin-imagemin 플러그인 사용 가능
  // ]
});
