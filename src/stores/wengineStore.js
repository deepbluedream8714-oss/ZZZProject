import { defineStore } from "pinia";

export const useWEngineStore = defineStore("wengine", {
  state: () => ({
    wengines: [
      // S급 W-엔진들
      {
        id: "bellicose-blaze",
        name: "Bellicose Blaze",
        rank: "S",
        type: "Attack",
        attribute: "화염",
        baseATK: 713,
        secondaryStat: "60%",
        secondaryStatName: "Energy Regen",
        description:
          "CRIT Rate를 20% 증가시킵니다. 화염 속성 Aftershock을 발동할 때 적의 DEF를 15% 무시합니다.",
        tags: ["화염", "크리티컬", "방어무시"],
        image: null,
      },
      {
        id: "blazing-laurel",
        name: "Blazing Laurel",
        rank: "S",
        type: "Stun",
        attribute: "화염",
        baseATK: 713,
        secondaryStat: "18%",
        secondaryStatName: "Impact",
        description:
          "Quick Assist나 Perfect Assist 발동 시 Impact가 25% 증가합니다. 기본 공격으로 적을 맞추면 Wilt를 적용합니다.",
        tags: ["화염", "임팩트", "상태이상"],
        image: null,
      },
      {
        id: "cordis-germina",
        name: "Cordis Germina",
        rank: "S",
        type: "Attack",
        attribute: "전기",
        baseATK: 713,
        secondaryStat: "24%",
        secondaryStatName: "Crit Rate",
        description:
          "CRIT Rate를 15% 증가시킵니다. 기본 공격이나 EX Special Attack으로 데미지를 입힐 때마다 전기 속성 데미지가 증가합니다.",
        tags: ["전기", "크리티컬", "스택"],
        image: null,
      },
      {
        id: "deep-sea-visitor",
        name: "Deep Sea Visitor",
        rank: "S",
        type: "Attack",
        attribute: "얼음",
        baseATK: 713,
        secondaryStat: "24%",
        secondaryStatName: "Crit Rate",
        description:
          "얼음 속성 데미지를 25% 증가시킵니다. 기본 공격으로 적을 맞추면 CRIT Rate가 증가합니다.",
        tags: ["얼음", "크리티컬", "데미지증가"],
        image: null,
      },
      {
        id: "dreamlit-hearth",
        name: "Dreamlit Hearth",
        rank: "S",
        type: "Support",
        attribute: "에테르",
        baseATK: 713,
        secondaryStat: "30%",
        secondaryStatName: "HP",
        description:
          "Energy Regen이 초당 0.40 증가합니다. Ether Veil을 활성화하거나 지속시간을 연장할 때 모든 팀원의 데미지와 최대 HP가 증가합니다.",
        tags: ["에테르", "지원", "버프"],
        image: null,
      },
      {
        id: "elegant-vanity",
        name: "Elegant Vanity",
        rank: "S",
        type: "Support",
        attribute: "에테르",
        baseATK: 713,
        secondaryStat: "30%",
        secondaryStatName: "Attack",
        description:
          "팀원이 Quick Assist, Chain Attack, Defensive Assist, Evasive Assist로 필드에 진입할 때 Energy를 획득합니다.",
        tags: ["에테르", "지원", "에너지"],
        image: null,
      },
      {
        id: "flamemaker-shaker",
        name: "Flamemaker Shaker",
        rank: "S",
        type: "Anomaly",
        attribute: "화염",
        baseATK: 713,
        secondaryStat: "30%",
        secondaryStatName: "Attack",
        description:
          "필드 밖에 있을 때 Energy Regen이 초당 0.6 증가합니다. EX Special Attack이나 Assist Attack으로 적을 맞추면 데미지가 증가합니다.",
        tags: ["화염", "이상", "데미지증가"],
        image: null,
      },
      {
        id: "flight-of-fancy",
        name: "Flight of Fancy",
        rank: "S",
        type: "Anomaly",
        attribute: "에테르",
        baseATK: 713,
        secondaryStat: "90",
        secondaryStatName: "Anomaly Proficiency",
        description:
          "Anomaly Buildup Rate를 40% 증가시킵니다. 에테르 속성 데미지를 입힐 때 Anomaly Proficiency가 증가합니다.",
        tags: ["에테르", "이상", "스택"],
        image: null,
      },
      {
        id: "fusion-compiler",
        name: "Fusion Compiler",
        rank: "S",
        type: "Anomaly",
        attribute: "에테르",
        baseATK: 684,
        secondaryStat: "24%",
        secondaryStatName: "PEN Ratio",
        description:
          "ATK를 12% 증가시킵니다. Special Attack이나 EX Special Attack을 사용할 때 Anomaly Proficiency가 증가합니다.",
        tags: ["에테르", "이상", "공격력"],
        image: null,
      },
      {
        id: "hailstorm-shrine",
        name: "Hailstorm Shrine",
        rank: "S",
        type: "Anomaly",
        attribute: "얼음",
        baseATK: 743,
        secondaryStat: "24%",
        secondaryStatName: "Crit Rate",
        description:
          "CRIT DMG를 50% 증가시킵니다. EX Special Attack을 사용하거나 팀원이 속성 이상을 적용할 때 얼음 속성 데미지가 증가합니다.",
        tags: ["얼음", "이상", "크리티컬"],
        image: null,
      },
      {
        id: "heartstring-nocturne",
        name: "Heartstring Nocturne",
        rank: "S",
        type: "Attack",
        attribute: "화염",
        baseATK: 713,
        secondaryStat: "24%",
        secondaryStatName: "Crit Rate",
        description:
          "CRIT DMG를 50% 증가시킵니다. 전장에 진입하거나 Chain Attack, Ultimate를 활성화할 때 Heartstring 스택을 획득합니다.",
        tags: ["화염", "크리티컬", "스택"],
        image: null,
      },
      {
        id: "hellfire-gears",
        name: "Hellfire Gears",
        rank: "S",
        type: "Stun",
        attribute: "화염",
        baseATK: 713,
        secondaryStat: "18%",
        secondaryStatName: "Impact",
        description:
          "필드 밖에 있을 때 Energy Regen이 초당 0.6 증가합니다. EX Special Attack이나 Assist Attack으로 적을 맞추면 Impact가 증가합니다.",
        tags: ["화염", "임팩트", "에너지"],
        image: null,
      },
      // A급 W-엔진들
      {
        id: "steam-oven",
        name: "Steam Oven",
        rank: "A",
        type: "Stun",
        attribute: "화염",
        baseATK: 594,
        secondaryStat: "50%",
        secondaryStatName: "Energy Regen",
        description:
          "Energy가 10씩 누적될 때마다 Impact가 2% 증가하며, 최대 8번까지 스택됩니다.",
        tags: ["화염", "임팩트", "스택"],
        image: null,
      },
      {
        id: "street-superstar",
        name: "Street Superstar",
        rank: "A",
        type: "Attack",
        attribute: "물리",
        baseATK: 594,
        secondaryStat: "25%",
        secondaryStatName: "Attack",
        description:
          "팀원이 Chain Attack을 발동할 때마다 Charge 스택을 획득합니다. Ultimate를 활성화할 때 모든 Charge 스택을 소모하여 데미지를 증가시킵니다.",
        tags: ["물리", "체인어택", "스택"],
        image: null,
      },
      {
        id: "the-vault",
        name: "The Vault",
        rank: "A",
        type: "Support",
        attribute: "에테르",
        baseATK: 624,
        secondaryStat: "50%",
        secondaryStatName: "Energy Regen",
        description:
          "EX Special Attack, Chain Attack, Ultimate로 에테르 속성 데미지를 입히면 모든 팀원의 해당 적에 대한 데미지가 증가합니다.",
        tags: ["에테르", "지원", "데미지증가"],
        image: null,
      },
      {
        id: "tremor-trigram-vessel",
        name: "Tremor Trigram Vessel",
        rank: "A",
        type: "Defence",
        attribute: "물리",
        baseATK: 624,
        secondaryStat: "25%",
        secondaryStatName: "Attack",
        description:
          "EX Special Attack과 Ultimate 데미지를 25% 증가시킵니다. 팀원이 데미지를 받거나 회복할 때 Energy를 획득합니다.",
        tags: ["물리", "방어", "에너지"],
        image: null,
      },
      {
        id: "unfettered-game-ball",
        name: "Unfettered Game Ball",
        rank: "A",
        type: "Support",
        attribute: "물리",
        baseATK: 594,
        secondaryStat: "50%",
        secondaryStatName: "Energy Regen",
        description:
          "공격이 속성 카운터 효과를 발동할 때 모든 팀원의 해당 적에 대한 CRIT Rate가 증가합니다.",
        tags: ["물리", "지원", "크리티컬"],
        image: null,
      },
      {
        id: "weeping-gemini",
        name: "Weeping Gemini",
        rank: "A",
        type: "Anomaly",
        attribute: "에테르",
        baseATK: 594,
        secondaryStat: "25%",
        secondaryStatName: "Attack",
        description:
          "팀원이 적에게 속성 이상을 적용할 때마다 Anomaly Proficiency가 증가하는 버프를 획득합니다.",
        tags: ["에테르", "이상", "스택"],
        image: null,
      },
      // B급 W-엔진들
      {
        id: "cinder-cobalt",
        name: "[Cinder] Cobalt",
        rank: "B",
        type: "Rupture",
        attribute: "화염",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "HP",
        description:
          "전투 진입이나 교체 시 ATK가 7.2% 증가합니다. 20초마다 한 번씩 발동 가능합니다.",
        tags: ["화염", "파괴", "공격력"],
        image: null,
      },
      {
        id: "identity-base",
        name: "[Identity] Base",
        rank: "B",
        type: "Defence",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "32%",
        secondaryStatName: "Defense",
        description: "공격을 받을 때 DEF가 20% 증가합니다.",
        tags: ["물리", "방어", "생존"],
        image: null,
      },
      {
        id: "identity-inflection",
        name: "[Identity] Inflection",
        rank: "B",
        type: "Defence",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "32%",
        secondaryStatName: "Defense",
        description: "공격을 받을 때 공격자의 데미지를 6% 감소시킵니다.",
        tags: ["물리", "방어", "데미지감소"],
        image: null,
      },
      {
        id: "lunar-decrescent",
        name: "[Lunar] Decrescent",
        rank: "B",
        type: "Attack",
        attribute: "현묵",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "Attack",
        description:
          "Chain Attack이나 Ultimate를 발동하면 데미지가 15% 증가합니다.",
        tags: ["현묵", "공격", "버프"],
        image: null,
      },
      {
        id: "lunar-noviluna",
        name: "[Lunar] Noviluna",
        rank: "B",
        type: "Attack",
        attribute: "현묵",
        baseATK: 475,
        secondaryStat: "16%",
        secondaryStatName: "Crit Rate",
        description:
          "EX Special Attack을 발동하면 Energy를 3 획득합니다. 12초마다 한 번씩 발동 가능합니다.",
        tags: ["현묵", "공격", "에너지"],
        image: null,
      },
      {
        id: "lunar-pleniluna",
        name: "[Lunar] Pleniluna",
        rank: "B",
        type: "Attack",
        attribute: "현묵",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "Attack",
        description:
          "기본 공격, 대시 공격, 회피 카운터 데미지가 12% 증가합니다.",
        tags: ["현묵", "공격", "데미지증가"],
        image: null,
      },
      {
        id: "magnetic-storm-alpha",
        name: "[Magnetic Storm] Alpha",
        rank: "B",
        type: "Anomaly",
        attribute: "전기",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "Attack",
        description:
          "Anomaly Buildup을 누적하면 Anomaly Mastery가 25 증가합니다. 20초마다 한 번씩 발동 가능합니다.",
        tags: ["전기", "이상", "마스터리"],
        image: null,
      },
      {
        id: "magnetic-storm-bravo",
        name: "[Magnetic Storm] Bravo",
        rank: "B",
        type: "Anomaly",
        attribute: "전기",
        baseATK: 356,
        secondaryStat: "???",
        secondaryStatName: "Anomaly Proficiency",
        description:
          "Anomaly Buildup을 누적하면 Anomaly Proficiency가 25 증가합니다. 20초마다 한 번씩 발동 가능합니다.",
        tags: ["전기", "이상", "숙련도"],
        image: null,
      },
      {
        id: "magnetic-storm-charlie",
        name: "[Magnetic Storm] Charlie",
        rank: "B",
        type: "Anomaly",
        attribute: "전기",
        baseATK: 475,
        secondaryStat: "16%",
        secondaryStatName: "PEN Ratio",
        description:
          "팀원이 적에게 속성 이상을 적용할 때 Energy를 3.5 생성합니다. 12초마다 한 번씩 발동 가능합니다.",
        tags: ["전기", "이상", "에너지"],
        image: null,
      },
      {
        id: "reverb-mark-i",
        name: "[Reverb] Mark I",
        rank: "B",
        type: "Support",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "Attack",
        description:
          "EX Special Attack을 발동하면 모든 팀원의 Impact가 8% 증가합니다. 20초마다 한 번씩 발동 가능합니다.",
        tags: ["물리", "지원", "임팩트"],
        image: null,
      },
      {
        id: "reverb-mark-ii",
        name: "[Reverb] Mark II",
        rank: "B",
        type: "Support",
        attribute: "에테르",
        baseATK: 475,
        secondaryStat: "40%",
        secondaryStatName: "Energy Regen",
        description:
          "EX Special Attack이나 Chain Attack을 발동하면 모든 팀원의 Anomaly Mastery와 Anomaly Proficiency가 증가합니다.",
        tags: ["에테르", "지원", "이상"],
        image: null,
      },
      {
        id: "reverb-mark-iii",
        name: "[Reverb] Mark III",
        rank: "B",
        type: "Support",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "HP",
        description:
          "Chain Attack이나 Ultimate를 발동하면 모든 팀원의 ATK가 8% 증가합니다. 20초마다 한 번씩 발동 가능합니다.",
        tags: ["물리", "지원", "공격력"],
        image: null,
      },
      {
        id: "vortex-arrow",
        name: "[Vortex] Arrow",
        rank: "B",
        type: "Stun",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "12%",
        secondaryStatName: "Impact",
        description: "공격이 주 대상에게 입히는 Daze가 8% 증가합니다.",
        tags: ["물리", "임팩트", "기절"],
        image: null,
      },
      {
        id: "vortex-hatchet",
        name: "[Vortex] Hatchet",
        rank: "B",
        type: "Stun",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "16%",
        secondaryStatName: "Energy Regen",
        description:
          "전투 진입이나 교체 시 Impact가 9% 증가합니다. 20초마다 한 번씩 발동 가능합니다.",
        tags: ["물리", "임팩트", "버프"],
        image: null,
      },
      {
        id: "vortex-revolver",
        name: "[Vortex] Revolver",
        rank: "B",
        type: "Stun",
        attribute: "물리",
        baseATK: 475,
        secondaryStat: "20%",
        secondaryStatName: "Attack",
        description: "EX Special Attack이 입히는 Daze가 10% 증가합니다.",
        tags: ["물리", "임팩트", "기절"],
        image: null,
      },
    ],
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
