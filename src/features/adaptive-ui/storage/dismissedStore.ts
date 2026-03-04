const STORAGE_PREFIX = 'adaptiveUi.dismissed.v1.';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface DismissedHint {
  hintId: string;
  ts: number;
}

export const listDismissed = (userId: string): Record<string, number> => {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
};

export const dismissHint = (userId: string, hintId: string) => {
  const dismissed = listDismissed(userId);
  dismissed[hintId] = Date.now();
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(dismissed));
};

export const isDismissed = (userId: string, hintId: string): boolean => {
  const dismissed = listDismissed(userId);
  const ts = dismissed[hintId];
  if (!ts) return false;
  return Date.now() - ts < DISMISS_COOLDOWN_MS;
};

export const clearDismissed = (userId: string) => {
  localStorage.removeItem(`${STORAGE_PREFIX}${userId}`);
};
