import { defineStore } from "pinia";
import wenginesData from "../data/wengines.json";
import { processWEngines } from "../utils/loadData.js";

export const useWEngineStore = defineStore("wengine", {
  state: () => ({
    // JSON 파일에서 데이터를 로드하고 이미지 경로를 변환
    wengines: processWEngines(wenginesData),
  }),

  getters: {
    getAllWEngines: (state) => state.wengines,
    getWEngineById: (state) => (id) =>
      state.wengines.find((wengine) => wengine.id === id),
    getWEnginesByRank: (state) => (rank) =>
      state.wengines.filter((wengine) => wengine.rank === rank),
    getWEnginesByType: (state) => (type) =>
      state.wengines.filter((wengine) => wengine.type === type),
    getWEnginesByAttribute: (state) => (attribute) =>
      state.wengines.filter((wengine) => wengine.attribute === attribute),

    // 필터 옵션 동적 생성 (데이터 일관성 보장)
    getFilterOptions: (state) => {
      const ranks = [...new Set(state.wengines.map((w) => w.rank))].sort();
      const types = [...new Set(state.wengines.map((w) => w.type))].sort();
      const attributes = [
        ...new Set(state.wengines.map((w) => w.attribute)),
      ].sort();

      return {
        ranks,
        types,
        attributes,
      };
    },
  },

  actions: {
    filterWEngines(filters) {
      let result = this.wengines;

      if (filters.rank && filters.rank.length > 0) {
        result = result.filter((wengine) =>
          filters.rank.includes(wengine.rank)
        );
      }

      if (filters.type && filters.type.length > 0) {
        result = result.filter((wengine) =>
          filters.type.includes(wengine.type)
        );
      }

      if (filters.attribute && filters.attribute.length > 0) {
        result = result.filter((wengine) =>
          filters.attribute.includes(wengine.attribute)
        );
      }

      return result;
    },

    searchWEngines(query) {
      if (!query) return this.wengines;

      const lowercaseQuery = query.toLowerCase();
      return this.wengines.filter(
        (wengine) =>
          wengine.name.toLowerCase().includes(lowercaseQuery) ||
          wengine.type.toLowerCase().includes(lowercaseQuery) ||
          wengine.attribute.toLowerCase().includes(lowercaseQuery) ||
          wengine.description.toLowerCase().includes(lowercaseQuery) ||
          wengine.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      );
    },

    sortWEngines(wengines, sortBy) {
      const sorted = [...wengines];

      switch (sortBy) {
        case "name":
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "rank":
          const rankOrder = { S: 3, A: 2, B: 1 };
          return sorted.sort((a, b) => rankOrder[b.rank] - rankOrder[a.rank]);
        case "type":
          return sorted.sort((a, b) => a.type.localeCompare(b.type));
        case "baseATK":
          return sorted.sort((a, b) => b.baseATK - a.baseATK);
        default:
          return sorted;
      }
    },

    // 통합 필터링 및 검색 (컴포저블용)
    getFilteredAndSearchedWEngines(filters, searchQuery) {
      let result = this.wengines;

      // 필터 적용
      if (filters.rank && filters.rank.length > 0) {
        result = result.filter((wengine) =>
          filters.rank.includes(wengine.rank)
        );
      }
      if (filters.type && filters.type.length > 0) {
        result = result.filter((wengine) =>
          filters.type.includes(wengine.type)
        );
      }
      if (filters.attribute && filters.attribute.length > 0) {
        result = result.filter((wengine) =>
          filters.attribute.includes(wengine.attribute)
        );
      }

      // 검색 적용
      if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase();
        result = result.filter(
          (wengine) =>
            wengine.name.toLowerCase().includes(lowercaseQuery) ||
            wengine.type.toLowerCase().includes(lowercaseQuery) ||
            wengine.attribute.toLowerCase().includes(lowercaseQuery) ||
            wengine.description?.toLowerCase().includes(lowercaseQuery) ||
            wengine.tags?.some((tag) =>
              tag.toLowerCase().includes(lowercaseQuery)
            )
        );
      }

      return result;
    },
  },
});
