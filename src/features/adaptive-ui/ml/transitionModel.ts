import { TelemetryEvent, TransitionMatrix } from '../types';

const STORAGE_PREFIX = 'adaptiveUi.ml.transitions.v1.';

export const getTransitionMatrix = (userId: string): TransitionMatrix => {
  const stored = localStorage.getItem(`${STORAGE_PREFIX}${userId}`);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
};

export const saveTransitionMatrix = (userId: string, matrix: TransitionMatrix) => {
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(matrix));
};

export const updateTransitionModel = (userId: string, events: TelemetryEvent[]) => {
  const matrix: TransitionMatrix = {};
  
  // Sort events by timestamp
  const sorted = [...events].sort((a, b) => a.ts - b.ts);
  
  for (let i = 0; i < sorted.length - 1; i++) {
    const from = sorted[i].uiId;
    const to = sorted[i + 1].uiId;
    
    // Ignore self-transitions for better prediction value
    if (from === to) continue;
    
    if (!matrix[from]) matrix[from] = {};
    matrix[from][to] = (matrix[from][to] || 0) + 1;
  }
  
  saveTransitionMatrix(userId, matrix);
};

export const predictNextUi = (userId: string, currentUiId: string | null): string | null => {
  if (!currentUiId) return null;
  const matrix = getTransitionMatrix(userId);
  const transitions = matrix[currentUiId];
  
  if (!transitions) return null;
  
  let bestNext: string | null = null;
  let maxCount = 0;
  
  for (const [nextUiId, count] of Object.entries(transitions)) {
    if (count > maxCount) {
      maxCount = count;
      bestNext = nextUiId;
    }
  }
  
  // Minimal confidence threshold (at least 2 occurrences)
  return maxCount >= 2 ? bestNext : null;
};

export const clearTransitionModel = (userId: string) => {
  localStorage.removeItem(`${STORAGE_PREFIX}${userId}`);
};
