export type TelemetryEventType = 'click' | 'hover';
export type HintInteractionType = 'shown' | 'accepted' | 'dismissed';

export interface TelemetryEvent {
  eventId: string;
  ts: number;
  type: TelemetryEventType;
  routePath: string;
  uiId: string;
  tag: string;
  text?: string;
  meta?: {
    key?: string;
    x?: number;
    y?: number;
  };
}

export interface HintInteractionEvent {
  hintId: string;
  ts: number;
  type: HintInteractionType;
  targetUiId: string;
  userId: string;
}

export interface AdaptiveUiSettings {
  enabled: boolean;
  captureHover: boolean;
  sampleMode: boolean;
  userId: string;
  abVariant?: 'A' | 'B';
}

export interface EventStoreState {
  events: TelemetryEvent[];
}

export interface TransitionMatrix {
  [fromUiId: string]: {
    [toUiId: string]: number;
  };
}
