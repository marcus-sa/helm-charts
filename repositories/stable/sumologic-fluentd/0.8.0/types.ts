// Automatically generated

export interface ChartValues {
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    createPath?: any
    enabled?: any
    hostPath?: any
  }
  podAnnotations?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  resources?: any
  sumologic?: {
    addTimeStamp?: any
    auditLogPath?: any
    collectorUrl?: any
    concatSeparator?: any
    containerLogsPath?: any
    enableStatWatcher?: any
    excludeContainerRegex?: any
    excludeFacilityRegex?: any
    excludeHostRegex?: any
    excludeNamespaceRegex?: any
    excludePath?: any
    excludePodRegex?: any
    excludePriorityRegex?: any
    excludeUnitRegex?: any
    fluentdOpt?: any
    fluentdSource?: any
    fluentdUserConfig?: any
    fluentdUserConfigDir?: any
    flushInterval?: any
    kubernetesMeta?: any
    logFormat?: any
    multilineStartRegexp?: any
    numThreads?: any
    proxyUri?: any
    readFromHead?: any
    sourceCategory?: any
    sourceCategoryPrefix?: any
    sourceCategoryReplaceDash?: any
    sourceHost?: any
    sourceName?: any
    timeKey?: any
    verifySsl?: any
  }
  tolerations?: any
  updateStrategy?: any
}

