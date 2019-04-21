// Automatically generated

export interface ChartValues {
  daemonset?: {
    enabled?: any
    nodeSelector?: any
    podAnnotations?: any
    tolerations?: any
    updateStrategy?: any
    useHostNetwork?: any
    useHostPort?: any
  }
  datadog?: {
    apiKey?: any
    apmEnabled?: any
    autoconf?: any
    checksd?: any
    collectEvents?: any
    confd?: any
    env?: any
    leaderElection?: any
    leaderLeaseDuration?: any
    logLevel?: any
    nonLocalTraffic?: any
    resources?: any
    tags?: any
    volumeMounts?: any
    volumes?: any
  }
  deployment?: {
    enabled?: any
    replicas?: any
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
  serviceType?: any
}

