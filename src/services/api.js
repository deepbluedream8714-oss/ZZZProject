// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  }

  // 에이전트 관련 API
  async getAgents(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/agents?${params}`);
  }

  async getAgentById(id) {
    return this.request(`/agents/${id}`);
  }

  async searchAgents(query) {
    return this.request(`/agents/search?q=${encodeURIComponent(query)}`);
  }

  // 필터 옵션 조회
  async getFilterOptions() {
    return this.request('/filters');
  }
}

export default new ApiService();

