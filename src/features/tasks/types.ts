export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type NetworkLatency = 0 | 300 | 800 | 1500;
export type NetworkFailureRate = 0 | 20 | 50;

export type NetworkSimulatorSettings = {
  latency: NetworkLatency;
  failureRate: NetworkFailureRate;
};
