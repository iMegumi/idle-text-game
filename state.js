// state.js
// 这个文件专门负责“游戏状态”
// 你可以把它理解成：后端里的内存对象 / session 数据

// 导出一个全局状态对象
export const gameState = {
  // 当前金币数量
  gold: 0,

  // 每秒自动获得多少金币
  goldPerSecond: 1,

  // 升级等级
  upgradeLevel: 0,

  // 下次升级所需金币
  upgradeCost: 10,

  // 遗物数量（探索时可能获得）
  relic: 0,

  // 日志列表
  logs: []
};

/**
 * 往日志中添加一条消息
 * @param {string} message 日志内容
 */
export function addLog(message) {
  gameState.logs.unshift(message);

  // 为了避免日志无限增长，这里只保留最近 20 条
  if (gameState.logs.length > 20) {
    gameState.logs.pop();
  }
}

/**
 * 重置游戏状态
 * 用于“重开游戏”
 */
export function resetState() {
  gameState.gold = 0;
  gameState.goldPerSecond = 1;
  gameState.upgradeLevel = 0;
  gameState.upgradeCost = 10;
  gameState.relic = 0;
  gameState.logs = [];
}
