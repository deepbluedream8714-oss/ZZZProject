import { computed, ref } from "vue";

/**
 * 필터와 검색 로직을 통합한 재사용 가능한 컴포저블
 * @param {Object} store - Pinia store (agentStore 또는 wengineStore)
 * @param {Object} initialFilters - 초기 필터 객체
 * @param {string} defaultSortBy - 기본 정렬 방식
 */
export function useFilterAndSearch(
  store,
  initialFilters = {},
  defaultSortBy = "name"
) {
  const filters = ref({ ...initialFilters });
  const searchQuery = ref("");
  const sortBy = ref(defaultSortBy);

  // 통합된 필터링 및 검색 로직
  const filteredItems = computed(() => {
    let result = [];

    // 통합 메서드 사용 (store에 따라 다른 메서드명)
    if (store.getFilteredAndSearchedAgents) {
      result = store.getFilteredAndSearchedAgents(
        filters.value,
        searchQuery.value
      );
      // 정렬 적용
      if (store.sortAgents) {
        result = store.sortAgents(result, sortBy.value);
      }
    } else if (store.getFilteredAndSearchedWEngines) {
      result = store.getFilteredAndSearchedWEngines(
        filters.value,
        searchQuery.value
      );
      // 정렬 적용
      if (store.sortWEngines) {
        result = store.sortWEngines(result, sortBy.value);
      }
    } else {
      // Fallback: 기존 방식
      if (store.filterAgents) {
        result = store.filterAgents(filters.value);
      } else if (store.filterWEngines) {
        result = store.filterWEngines(filters.value);
      }

      if (searchQuery.value) {
        if (store.searchAgents) {
          const searchResults = store.searchAgents(searchQuery.value);
          const searchIds = new Set(searchResults.map((item) => item.id));
          result = result.filter((item) => searchIds.has(item.id));
        } else if (store.searchWEngines) {
          const searchResults = store.searchWEngines(searchQuery.value);
          const searchIds = new Set(searchResults.map((item) => item.id));
          result = result.filter((item) => searchIds.has(item.id));
        }
      }

      if (store.sortAgents) {
        result = store.sortAgents(result, sortBy.value);
      } else if (store.sortWEngines) {
        result = store.sortWEngines(result, sortBy.value);
      }
    }

    return result;
  });

  // 필터 초기화
  const resetFilters = () => {
    filters.value = { ...initialFilters };
    searchQuery.value = "";
  };

  // 전체 초기화 (필터 + 검색)
  const resetAll = () => {
    resetFilters();
  };

  return {
    filters,
    searchQuery,
    sortBy,
    filteredItems,
    resetFilters,
    resetAll,
  };
}
