// Automatically generated

export interface ChartValues {
  image?: {
    name?: any
    pullPolicy?: any
    tag?: any
  }
  nameOverride?: any
  persistence?: {
    enabled?: any
    hostPath?: any
  }
  rbac?: {
    serviceAccountName?: any
  }
  resources?: any
  sumologic?: {
    collectorUrl?: any
    excludeContainerRegex?: any
    excludeHostRegex?: any
    excludeNamespaceRegex?: any
    excludePath?: any
    excludePodRegex?: any
    fluentdOpt?: any
    flushInterval?: any
    kubernetesMeta?: any
    logFormat?: any
    numThreads?: any
    sourceCategory?: any
    sourceCategoryPrefix?: any
    sourceCategoryReplaceDash?: any
    sourceName?: any
    verifySsl?: any
  }
}

