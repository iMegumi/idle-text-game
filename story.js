// story.js
// 这个文件专门放“探索时触发的文字事件”
// 你可以把它理解成：业务配置表 / 剧情数据表

// 每个事件都包含：文本 + 奖励处理函数
export const exploreEvents = [
  {
    text: "你在路边捡到了几枚铜币。",
    effect: (state) => {
      state.gold += 5;
    }
  },
  {
    text: "你遇到了一位旅行商人，他送了你一些金币。",
    effect: (state) => {
      state.gold += 8;
    }
  },
  {
    text: "你在废墟中找到了一件古老遗物。",
    effect: (state) => {
      state.relic += 1;
    }
  },
  {
    text: "你今天的探索一无所获，但积累了经验。",
    effect: (state) => {
      // 这个事件没有实际奖励，只是文本事件
    }
  },
  {
    text: "你发现了一处隐藏补给点，获得了不少金币。",
    effect: (state) => {
      state.gold += 12;
    }
  }
];
