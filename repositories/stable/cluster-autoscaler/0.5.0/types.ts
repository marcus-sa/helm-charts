// Automatically generated

export interface ChartValues {
  affinity?: any
  autoDiscovery?: {
    clusterName?: any
  }
  autoscalingGroups?: any
  awsRegion?: any
  cloudProvider?: any
  extraArgs?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  podAnnotations?: any
  podLabels?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  replicaCount?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    externalIPs?: any
    loadBalancerIP?: any
    loadBalancerSourceRanges?: any
    servicePort?: any
    type?: any
  }
  spotinst?: {
    account?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    token?: any
  }
  sslCertPath?: any
  tolerations?: any
}

