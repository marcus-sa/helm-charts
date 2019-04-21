// Automatically generated

export interface ChartValues {
  affinity?: any
  asgInstanceDetacher?: {
    asgLabelName?: any
    enabled?: any
  }
  asgInstanceTermNotifier?: {
    drainWaitTimeoutSeconds?: any
    enabled?: any
    hookName?: any
    hookTimeoutSeconds?: any
    pollingIntervalSeconds?: any
  }
  drainer?: {
    drainWithTaint?: any
    enabled?: any
    gracePeriodSeconds?: any
    timeout?: any
  }
  extraAnnotations?: any
  hostPort?: any
  http?: {
    listenPort?: any
  }
  image?: {
    imagePullPolicy?: any
    repository?: any
    tag?: any
  }
  log?: {
    format?: any
    level?: any
  }
  metrics?: {
    enabled?: any
    endpoint?: any
  }
  nameOverride?: any
  nodeSelector?: any
  resources?: any
  termdetect?: {
    defaultSecondsUntilTermination?: any
  }
  termnotifier?: {
    triggerEnabled?: any
    triggerEndpoint?: any
  }
  tolerations?: any
}

