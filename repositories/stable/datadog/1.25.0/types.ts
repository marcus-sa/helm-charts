// Automatically generated

export interface ChartValues {
  clusterAgent?: {
    affinity?: any
    clusterChecks?: {
      enabled?: any
    }
    confd?: any
    containerName?: any
    enabled?: any
    env?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      repository?: any
      tag?: any
    }
    livenessProbe?: any
    metricsProvider?: {
      enabled?: any
    }
    readinessProbe?: any
    replicas?: any
    resources?: any
    token?: any
    tolerations?: any
  }
  clusterchecksDeployment?: {
    affinity?: any
    enabled?: any
    env?: any
    livenessProbe?: any
    nodeSelector?: any
    replicas?: any
    resources?: any
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
    acExclude?: any
    acInclude?: any
    apiKey?: any
    apiKeyExistingSecret?: any
    apmEnabled?: any
    appKey?: any
    appKeyExistingSecret?: any
    autoconf?: any
    checksd?: any
    clusterName?: any
    collectEvents?: any
    confd?: any
    criSocketPath?: any
    dd_url?: any
    dogstatsdOriginDetection?: any
    env?: any
    hostname?: any
    leaderElection?: any
    leaderLeaseDuration?: any
    livenessProbe?: any
    logLevel?: any
    logsConfigContainerCollectAll?: any
    logsEnabled?: any
    logsPointerHostPath?: any
    name?: any
    nonLocalTraffic?: any
    podAnnotationsAsTags?: any
    podLabelsAsTags?: any
    processAgentEnabled?: any
    resources?: any
    securityContext?: any
    site?: any
    tags?: any
    useCriSocketVolume?: any
    useDogStatsDSocketVolume?: any
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
  fullnameOverride?: any
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

