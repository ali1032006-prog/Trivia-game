import AsyncStorage from "@react-native-async-storage/async-storage";

// Remembers every question the player has been shown so none is asked twice.
const KEY = "trivia-seen-v1";
let cache = null;

export async function getSeen() {
  if (!cache) {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      cache = new Set(raw ? JSON.parse(raw) : []);
    } catch {
      cache = new Set();
    }
  }
  return cache;
}

export async function markSeen(text) {
  const seen = await getSeen();
  if (seen.has(text)) return;
  seen.add(text);
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify([...seen]));
  } catch {}
}

export async function resetSeen() {
  cache = new Set();
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}
