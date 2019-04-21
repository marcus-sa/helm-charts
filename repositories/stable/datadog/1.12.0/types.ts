// Automatically generated

export interface ChartValues {
  clusterAgent?: {
    affinity?: any
    containerName?: any
    enabled?: any
    env?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      repository?: any
      tag?: any
    }
    metricsProvider?: {
      enabled?: any
    }
    replicas?: any
    resources?: any
    token?: any
    tolerations?: any
  }
  daemonset?: {
    affinity?: any
    enabled?: any
    nodeSelector?: any
    podAnnotations?: any
    priorityClassName?: any
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
    appKey?: any
    appKeyExistingSecret?: any
    autoconf?: any
    checksd?: any
    collectEvents?: any
    confd?: any
    criSocketPath?: any
    dd_url?: any
    env?: any
    leaderElection?: any
    leaderLeaseDuration?: any
    logLevel?: any
    logsConfigContainerCollectAll?: any
    logsEnabled?: any
    name?: any
    nonLocalTraffic?: any
    podAnnotationsAsTags?: any
    podLabelsAsTags?: any
    processAgentEnabled?: any
    resources?: any
    site?: any
    tags?: any
    useCriSocketVolume?: any
    volumeMounts?: any
    volumes?: any
  }
  deployment?: {
    affinity?: any
    dogstatsdNodePort?: any
    enabled?: any
    priorityClassName?: any
    replicas?: any
    service?: {
      annotations?: any
      type?: any
    }
    tolerations?: any
    traceNodePort?: any
  }
  image?: {
    pullPolicy?: any
    pullSecrets?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
}

