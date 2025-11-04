import { defineStore } from "pinia";
import agentsData from "../data/agents.json";
import { processAgents } from "../utils/loadData.js";

export const useAgentStore = defineStore("agent", {
  state: () => ({
    // JSON 파일에서 데이터를 로드하고 이미지 경로를 변환
    agents: processAgents(agentsData),
  }),

  getters: {
    // 전체 에이전트 목록 (컴포저블용)
    getAllAgents: (state) => state.agents,

    // ID로 에이전트 찾기
    getAgentById: (state) => (id) => {
      return state.agents.find((agent) => agent.id === parseInt(id));
    },

    // 등급별 필터
    getAgentsByRank: (state) => (rank) => {
      return state.agents.filter((agent) => agent.rank === rank);
    },

    // 속성별 필터
    getAgentsByAttribute: (state) => (attribute) => {
      return state.agents.filter((agent) => agent.attribute === attribute);
    },

    // 소속별 필터
    getAgentsByFaction: (state) => (faction) => {
      return state.agents.filter((agent) => agent.faction === faction);
    },

    // 전체 에이전트 수
    totalAgents: (state) => state.agents.length,

    // S등급 에이전트 수
    sRankCount: (state) => state.agents.filter((a) => a.rank === "S").length,

    // A등급 에이전트 수
    aRankCount: (state) => state.agents.filter((a) => a.rank === "A").length,

    // 필터 옵션 동적 생성 (데이터 일관성 보장)
    getFilterOptions: (state) => {
      const ranks = [...new Set(state.agents.map((a) => a.rank))].sort();
      const attributes = [
        ...new Set(state.agents.map((a) => a.attribute)),
      ].sort();
      const specialties = [
        ...new Set(state.agents.map((a) => a.specialty)),
      ].sort();
      const factions = [...new Set(state.agents.map((a) => a.faction))].sort();

      return {
        ranks,
        attributes,
        specialties,
        factions,
      };
    },
  },

  actions: {
    // 복합 필터 (여러 조건)
    filterAgents(filters) {
      let result = this.agents;

      if (filters.rank && filters.rank.length > 0) {
        result = result.filter((agent) => filters.rank.includes(agent.rank));
      }

      if (filters.attribute && filters.attribute.length > 0) {
        result = result.filter((agent) =>
          filters.attribute.includes(agent.attribute)
        );
      }

      if (filters.specialty && filters.specialty.length > 0) {
        result = result.filter((agent) =>
          filters.specialty.includes(agent.specialty)
        );
      }

      if (filters.faction && filters.faction.length > 0) {
        result = result.filter((agent) =>
          filters.faction.includes(agent.faction)
        );
      }

      return result;
    },

    // 검색
    searchAgents(query) {
      if (!query) return this.agents;

      const lowerQuery = query.toLowerCase();
      return this.agents.filter(
        (agent) =>
          agent.name.toLowerCase().includes(lowerQuery) ||
          agent.description.toLowerCase().includes(lowerQuery) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    },

    // 정렬 (기존 메서드 유지)
    sortAgents(agents, sortBy) {
      const sorted = [...agents];

      if (sortBy === "name") {
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "ko"));
      } else if (sortBy === "rank") {
        const rankOrder = { S: 2, A: 1 };
        return sorted.sort((a, b) => rankOrder[b.rank] - rankOrder[a.rank]);
      } else if (sortBy === "faction") {
        return sorted.sort((a, b) => a.faction.localeCompare(b.faction, "ko"));
      }

      return sorted;
    },

    // 통합 필터링 및 검색 (컴포저블용)
    getFilteredAndSearchedAgents(filters, searchQuery) {
      let result = this.agents;

      // 필터 적용
      if (filters.rank && filters.rank.length > 0) {
        result = result.filter((agent) => filters.rank.includes(agent.rank));
      }
      if (filters.attribute && filters.attribute.length > 0) {
        result = result.filter((agent) =>
          filters.attribute.includes(agent.attribute)
        );
      }
      if (filters.specialty && filters.specialty.length > 0) {
        result = result.filter((agent) =>
          filters.specialty.includes(agent.specialty)
        );
      }
      if (filters.faction && filters.faction.length > 0) {
        result = result.filter((agent) =>
          filters.faction.includes(agent.faction)
        );
      }

      // 검색 적용
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        result = result.filter(
          (agent) =>
            agent.name.toLowerCase().includes(lowerQuery) ||
            agent.description?.toLowerCase().includes(lowerQuery) ||
            agent.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      }

      return result;
    },

    // 에이전트 추가 (향후 관리자 기능용)
    addAgent(agent) {
      const newId = Math.max(...this.agents.map((a) => a.id)) + 1;
      this.agents.push({ ...agent, id: newId });
    },

    // 에이전트 업데이트
    updateAgent(id, updates) {
      const index = this.agents.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.agents[index] = { ...this.agents[index], ...updates };
      }
    },

    // 에이전트 삭제
    deleteAgent(id) {
      const index = this.agents.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.agents.splice(index, 1);
      }
    },
  },
});
