// Automatically generated

export interface ChartValues {
  agentConfig?: any
  agentVersion?: any
  apiServerSkipVerify?: any
  clusterName?: any
  containerStatsIntervalSeconds?: any
  extraPodLabels?: any
  fullnameOverride?: any
  gatherClusterMetrics?: any
  gatherDockerMetrics?: any
  image?: {
    pullPolicy?: any
    pullSecret?: any
    repository?: any
    tag?: any
  }
  kubeletAPI?: any
  logLevel?: any
  metricIntervalSeconds?: any
  metricNamesToExclude?: any
  metricsToExclude?: any
  monitors?: any
  nameOverride?: any
  namespace?: any
  permitReadingSecrets?: any
  rbac?: {
    create?: any
    customRules?: any
  }
  readThreads?: any
  rollingUpdateMaxUnavailable?: any
  runOnMaster?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  signalFxAccessToken?: any
  timeout?: any
  tolerations?: any
  writeQueueLimitHigh?: any
  writeQueueLimitLow?: any
}

