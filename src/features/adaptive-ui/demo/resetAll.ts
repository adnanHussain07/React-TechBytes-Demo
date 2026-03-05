import { clearEvents, getUserId } from '../storage/eventStore';
import { clearDismissed } from '../storage/dismissedStore';
import { clearHintEvents } from '../storage/evaluationStore';
import { clearTransitionModel } from '../ml/transitionModel';

export const resetAllAdaptiveUiData = () => {
  const userId = getUserId();
  clearEvents(userId);
  clearDismissed(userId);
  clearHintEvents(userId);
  clearTransitionModel(userId);
  window.dispatchEvent(new CustomEvent('adaptive-ui-refresh'));
};
