import { UserModel } from '../analytics/buildUserModel';
import { AdaptiveUiSettings } from '../types';

export type HintKind = 'tooltip' | 'highlight';

export interface Hint {
  hintId: string;
  targetUiId: string;
  message: string;
  kind: HintKind;
  priority: number; // 1-5
  debugInfo?: string;
}

export interface RuleContext {
  routePath: string;
  model: UserModel;
  nowTs: number;
  settings: AdaptiveUiSettings;
  dismissedHints: Record<string, number>;
}

export interface Rule {
  id: string;
  evaluate: (ctx: RuleContext) => Hint | null;
}
