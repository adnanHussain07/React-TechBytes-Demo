import { RuleContext, Hint } from './ruleTypes';
import { ALL_RULES } from './rules';

export const evaluateRules = (ctx: RuleContext): Hint[] => {
  const hints: Hint[] = [];

  for (const rule of ALL_RULES) {
    const hint = rule.evaluate(ctx);
    if (hint) {
      hints.push(hint);
    }
  }

  // Sort by priority (higher first)
  return hints.sort((a, b) => b.priority - a.priority);
};
