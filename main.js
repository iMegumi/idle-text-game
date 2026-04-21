// main.js
// 这是程序入口文件
// 负责：
// 1. 获取页面元素
// 2. 绑定按钮事件
// 3. 渲染页面
// 4. 定时自动增加金币
// 5. 处理探索、升级、保存、读取、重开

import { gameState, addLog, resetState } from "./state.js";
import { exploreEvents } from "./story.js";
import { saveGame, loadGame, clearSave } from "./save.js";

// =========================
// 1. 获取 DOM 元素
// =========================

// 状态显示区域
const goldEl = document.getElementById("gold");
const gpsEl = document.getElementById("gps");
const relicEl = document.getElementById("relic");
const upgradeLevelEl = document.getElementById("upgradeLevel");
const upgradeCostEl = document.getElementById("upgradeCost");

// 按钮
const exploreBtn = document.getElementById("exploreBtn");
const upgradeBtn = document.getElementById("upgradeBtn");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const resetBtn = document.getElementById("resetBtn");

// 日志区
const logEl = document.getElementById("log");

// =========================
// 2. 渲染函数
// =========================

/**
 * 把当前游戏状态渲染到页面上
 */
function render() {
  // 渲染数值
  goldEl.textContent = Math.floor(gameState.gold);
  gpsEl.textContent = gameState.goldPerSecond;
  relicEl.textContent = gameState.relic;
  upgradeLevelEl.textContent = gameState.upgradeLevel;
  upgradeCostEl.textContent = gameState.upgradeCost;

  // 渲染日志
  logEl.innerHTML = "";

  gameState.logs.forEach((item) => {
    const div = document.createElement("div");
    div.className = "log-item";
    div.textContent = item;
    logEl.appendChild(div);
  });
}

/**
 * 初始化日志
 */
function initLog() {
  if (gameState.logs.length === 0) {
    addLog("你来到一片荒原，决定靠探索与经营活下去。");
  }
}

// =========================
// 3. 游戏行为函数
// =========================

/**
 * 每秒自动获得金币
 */
function tick() {
  gameState.gold += gameState.goldPerSecond;
  render();
}

/**
 * 探索：随机触发一个事件
 */
function explore() {
  // 从事件数组里随机取一个
  const randomIndex = Math.floor(Math.random() * exploreEvents.length);
  const event = exploreEvents[randomIndex];

  // 执行事件效果
  event.effect(gameState);

  // 记录日志
  addLog(`【探索】${event.text}`);

  // 渲染页面
  render();
}

/**
 * 购买升级
 * 规则：
 * - 消耗金币
 * - 每秒收益 +1
 * - 升级等级 +1
 * - 下一次升级价格变贵
 */
function buyUpgrade() {
  if (gameState.gold < gameState.upgradeCost) {
    addLog("【系统】金币不足，无法购买升级。");
    render();
    return;
  }

  // 扣除金币
  gameState.gold -= gameState.upgradeCost;

  // 升级
  gameState.upgradeLevel += 1;
  gameState.goldPerSecond += 1;

  // 下次价格增长
  gameState.upgradeCost = Math.floor(gameState.upgradeCost * 1.8);

  addLog(`【升级】升级成功！现在每秒收益为 ${gameState.goldPerSecond}。`);
  render();
}

/**
 * 保存游戏
 */
function handleSave() {
  saveGame(gameState);
  addLog("【系统】游戏已保存。");
  render();
}

/**
 * 读取游戏
 */
function handleLoad() {
  const data = loadGame();

  if (!data) {
    addLog("【系统】没有找到存档。");
    render();
    return;
  }

  // 注意：这里不是直接 gameState = data
  // 因为 gameState 是导出的对象引用，直接替换不安全
  // 正确做法是逐个覆盖属性
  gameState.gold = data.gold ?? 0;
  gameState.goldPerSecond = data.goldPerSecond ?? 1;
  gameState.upgradeLevel = data.upgradeLevel ?? 0;
  gameState.upgradeCost = data.upgradeCost ?? 10;
  gameState.relic = data.relic ?? 0;
  gameState.logs = data.logs ?? [];

  addLog("【系统】已读取存档。");
  render();
}

/**
 * 重开游戏
 */
function handleReset() {
  const confirmed = confirm("确定要重开游戏吗？这会清空当前进度和存档。");

  if (!confirmed) {
    return;
  }

  // 重置内存状态
  resetState();

  // 删除浏览器存档
  clearSave();

  addLog("【系统】新的旅程开始了。");
  render();
}

// =========================
// 4. 绑定事件
// =========================

exploreBtn.addEventListener("click", explore);
upgradeBtn.addEventListener("click", buyUpgrade);
saveBtn.addEventListener("click", handleSave);
loadBtn.addEventListener("click", handleLoad);
resetBtn.addEventListener("click", handleReset);

// =========================
// 5. 初始化
// =========================

initLog();
render();

// 每 1000ms 执行一次 tick，也就是每秒自动加金币
setInterval(tick, 1000);
