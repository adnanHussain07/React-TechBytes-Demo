export type TelemetryEventType = 'click' | 'hover';

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

export interface AdaptiveUiSettings {
  enabled: boolean;
  captureHover: boolean;
  sampleMode: boolean;
  userId: string;
}

export interface EventStoreState {
  events: TelemetryEvent[];
}
