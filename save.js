// save.js
// 这个文件专门负责保存和读取存档
// 你可以把它理解成：DAO / Repository

const SAVE_KEY = "idle_text_game_save";

/**
 * 保存游戏状态到 localStorage
 * @param {object} state 游戏状态对象
 */
export function saveGame(state) {
  // localStorage 只能保存字符串，所以要转成 JSON 字符串
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

/**
 * 从 localStorage 读取游戏状态
 * @returns {object|null} 读取到的对象，或者 null
 */
export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);

  // 如果没有存档，返回 null
  if (!raw) {
    return null;
  }

  // 把 JSON 字符串转回对象
  return JSON.parse(raw);
}

/**
 * 删除存档
 */
export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}
