// Automatically generated

export interface ChartValues {
  daemonset?: {
    affinity?: any
    enabled?: any
    nodeSelector?: any
    podAnnotations?: any
    tolerations?: any
    updateStrategy?: any
    useHostNetwork?: any
    useHostPID?: any
    useHostPort?: any
  }
  datadog?: {
    apiKey?: any
    apiKeyExistingSecret?: any
    apmEnabled?: any
    autoconf?: any
    checksd?: any
    collectEvents?: any
    confd?: any
    env?: any
    leaderElection?: any
    leaderLeaseDuration?: any
    logLevel?: any
    logsConfigContainerCollectAll?: any
    logsEnabled?: any
    nonLocalTraffic?: any
    resources?: any
    tags?: any
    volumeMounts?: any
    volumes?: any
  }
  deployment?: {
    affinity?: any
    dogstatsdNodePort?: any
    enabled?: any
    replicas?: any
    tolerations?: any
    traceNodePort?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  service?: {
    annotations?: any
  }
  serviceType?: any
}

